// FNT Program Data - Supporting First Nations Learner Transitions
// Program structure with foundations + 5 modules

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  type: 'intro' | 'overview' | 'chapter' | 'activities' | 'foundation';
  moduleId: string | null;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface FoundationTopic {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: 'foundation';
  moduleId: null;
}

export interface CourseData {
  title: string;
  slug: string;
  intro: Lesson;
  foundations: FoundationTopic[];
  modules: Module[];
}

// Content now lives in Sanity (project gti1ywqi). This file keeps only the types.
// The original hardcoded data is in git history and in scripts/dataset.ndjson.
