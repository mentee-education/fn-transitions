// Course structure + lesson content, loaded from Sanity.
// Exposes the exact same shapes the old hardcoded courseData.ts exported, so
// pages keep working identically — but every word is editable in /studio.
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { sanityClient } from "@/sanity/client";
import type { CourseData, Lesson, FoundationTopic, Module } from "./courseData";

const COURSE_QUERY = `*[_type == "course" && _id == "course-transitions"][0]{
  title,
  "slug": slug.current,
  intro->{ "id": _id, "slug": slug.current, title, "type": lessonType },
  modules[]->{ "id": moduleId, title,
    lessons[]->{ "id": _id, "slug": slug.current, title, "type": lessonType, "moduleId": ^.moduleId }
  },
  foundations[]->{ "id": _id, "slug": slug.current, title, subtitle, "type": lessonType }
}`;

function normalizeLesson(l: any, moduleId: string | null): Lesson {
  return {
    id: String(l.id).replace(/^lesson-/, ""),
    slug: l.slug,
    title: l.title,
    type: l.type,
    moduleId,
  };
}

export interface CourseStore {
  COURSE: CourseData;
  ALL_LESSONS: Lesson[];
  FOUNDATION_LESSONS: Lesson[];
  ALL_NAVIGABLE: Lesson[];
  getLessonBySlug(slug: string): Lesson | undefined;
  getLessonIndex(slug: string): number;
  getPrevLesson(slug: string): Lesson | undefined;
  getNextLesson(slug: string): Lesson | undefined;
}

function buildStore(raw: any): CourseStore {
  const intro = normalizeLesson(raw.intro, null);
  const modules: Module[] = (raw.modules || []).map((m: any) => ({
    id: m.id,
    title: m.title,
    lessons: (m.lessons || []).map((l: any) => normalizeLesson(l, m.id)),
  }));
  const foundations: FoundationTopic[] = (raw.foundations || []).map((f: any) => ({
    id: String(f.id).replace(/^lesson-/, ""),
    slug: f.slug,
    title: f.title,
    subtitle: f.subtitle || "",
    type: "foundation" as const,
    moduleId: null,
  }));
  const COURSE: CourseData = { title: raw.title, slug: raw.slug, intro, foundations, modules };
  const ALL_LESSONS: Lesson[] = [intro, ...modules.flatMap((m) => m.lessons)];
  const FOUNDATION_LESSONS: Lesson[] = foundations.map((f) => ({
    id: f.id, slug: f.slug, title: f.title, type: "foundation" as const, moduleId: null,
  }));
  const ALL_NAVIGABLE: Lesson[] = [intro, ...FOUNDATION_LESSONS, ...modules.flatMap((m) => m.lessons)];
  return {
    COURSE, ALL_LESSONS, FOUNDATION_LESSONS, ALL_NAVIGABLE,
    getLessonBySlug: (slug) => ALL_NAVIGABLE.find((l) => l.slug === slug),
    getLessonIndex: (slug) => ALL_LESSONS.findIndex((l) => l.slug === slug),
    getPrevLesson: (slug) => {
      const i = ALL_NAVIGABLE.findIndex((l) => l.slug === slug);
      return i > 0 ? ALL_NAVIGABLE[i - 1] : undefined;
    },
    getNextLesson: (slug) => {
      const i = ALL_NAVIGABLE.findIndex((l) => l.slug === slug);
      return i >= 0 && i < ALL_NAVIGABLE.length - 1 ? ALL_NAVIGABLE[i + 1] : undefined;
    },
  };
}

const CourseContext = createContext<CourseStore | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    sanityClient.fetch(COURSE_QUERY).then(setRaw).catch((e) => setError(String(e)));
  }, []);
  const store = useMemo(() => (raw ? buildStore(raw) : null), [raw]);
  if (error)
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-[#8B2332]">
        Unable to load the course right now. Please refresh the page.
      </div>
    );
  if (!store)
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="animate-pulse text-[#8B2332] font-semibold">Loading…</div>
      </div>
    );
  return <CourseContext.Provider value={store}>{children}</CourseContext.Provider>;
}

export function useCourse(): CourseStore {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used inside CourseProvider");
  return ctx;
}

// ── lesson body fetch (per lesson, cached) ─────────────────────────────────────
const bodyCache = new Map<string, any[]>();
export function useLessonBody(slug: string): { body: any[] | null; loading: boolean } {
  const [body, setBody] = useState<any[] | null>(bodyCache.get(slug) ?? null);
  useEffect(() => {
    if (bodyCache.has(slug)) { setBody(bodyCache.get(slug)!); return; }
    setBody(null);
    sanityClient
      .fetch(`*[_type == "lesson" && slug.current == $slug][0].body`, { slug })
      .then((b) => { bodyCache.set(slug, b || []); setBody(b || []); })
      .catch(() => setBody([]));
  }, [slug]);
  return { body, loading: body === null };
}

// ── page singletons (home, overview, …) ───────────────────────────────────────
const pageCache = new Map<string, any>();
export function usePageContent<T extends object>(docId: string, defaults: T): T {
  const [doc, setDoc] = useState<any>(pageCache.get(docId));
  useEffect(() => {
    if (pageCache.has(docId)) return;
    sanityClient
      .fetch(`*[_id == $id][0]`, { id: docId })
      .then((d) => { pageCache.set(docId, d); setDoc(d); })
      .catch(() => { pageCache.set(docId, null); setDoc(null); });
  }, [docId]);
  return useMemo(() => {
    if (!doc) return defaults;
    const merged: any = { ...defaults };
    for (const [key, val] of Object.entries(doc)) {
      if (key.startsWith("_") || val == null) continue;
      merged[key] = val;
    }
    return merged as T;
  }, [doc, defaults]);
}
