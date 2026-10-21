// Renders a lesson's Portable Text body with the exact same markup/classes the
// original hardcoded lessonContent.tsx produced. Changing these styles changes
// every lesson at once (design stays in code; words live in Sanity).
import React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-2xl font-bold text-[#2C2420] mt-6 sm:mt-8 mb-3 sm:mb-4 font-['DM_Sans']">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base sm:text-lg font-bold text-[#3d2e26] mt-4 sm:mt-6 mb-2 sm:mb-3 font-['DM_Sans']">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#4a3f35] mb-3 sm:mb-4 leading-relaxed text-[15px] sm:text-base">{children}</p>
);

const toneBorder: Record<string, string> = {
  green: "bg-green-50 border-green-200",
  blue: "bg-blue-50 border-blue-200",
  amber: "bg-amber-50 border-amber-200",
  purple: "bg-purple-50 border-purple-200",
  teal: "bg-teal-50 border-teal-200",
};
const toneTitle: Record<string, string> = {
  green: "text-green-800",
  blue: "text-blue-800",
  amber: "text-amber-800",
  purple: "text-purple-800",
  teal: "text-teal-800",
};

function VideoEmbed({ url, title }: { url: string; title?: string }) {
  return (
    <div className="my-4 sm:my-6">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded"
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {title ? <p className="text-sm text-gray-500 mt-2 italic">{title}</p> : null}
    </div>
  );
}

function ReflectionBox({ questions }: { questions: string[] }) {
  return (
    <div className="bg-[#FFF8F0] border-l-4 border-[#D4A853] p-3 sm:p-5 my-4 sm:my-6 rounded-r">
      <h3 className="font-bold text-[#2C2420] mb-3 font-['DM_Sans']">Reflection Questions</h3>
      <p className="text-[#6b5e52] text-sm mb-3">Take a moment to consider:</p>
      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} className="text-[#4a3f35] flex gap-2">
            <span className="text-[#D4A853] flex-shrink-0">&bull;</span>
            <span>{q}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-[#8a7e72] mt-3 italic">These questions are for reflection only — there are no right or wrong answers.</p>
    </div>
  );
}

function CalloutBox({ value }: { value: any }) {
  const tone = value.tone || "green";
  const spacing = value.spacing === "tight" ? "space-y-1" : value.spacing === "loose" ? "[&>*+*]:mt-2" : "";
  return (
    <div className={`${toneBorder[tone]} border rounded p-4 mb-6 ${value.centered ? "my-4 text-center" : ""} ${spacing}`}>
      {value.title ? <p className={`font-bold ${toneTitle[tone]} mb-2`}>{value.title}</p> : null}
      <PortableText value={value.body || []} components={calloutComponents(tone)} />
    </div>
  );
}

const marks = {
  strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
  em: ({ children }: any) => <em className="italic">{children}</em>,
  activityLink: ({ value, children }: any) => {
    const href: string = value?.href || "#";
    const isInternal = href.startsWith("/");
    return (
      <a
        href={href}
        target={isInternal ? undefined : href !== "#" ? "_blank" : undefined}
        rel={isInternal ? undefined : "noopener noreferrer"}
        className="inline-flex items-center gap-1 text-[#C2703E] hover:text-[#8B4513] font-semibold underline"
      >
        {children}
      </a>
    );
  },
};

const calloutComponents = (tone: string): PortableTextComponents => ({
  block: {
    normal: ({ children }) => <P>{children}</P>,
    quote: ({ children }) => <p className="text-gray-700 italic">{children}</p>,
    display: ({ children }) => <p className={`text-2xl font-bold ${toneTitle[tone]}`}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-1 text-[#4a3f35] text-[15px] sm:text-base">{children}</ul>
    ),
  },
  listItem: { bullet: ({ children }) => <li className="leading-relaxed">{children}</li> },
  marks,
});

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <P>{children}</P>,
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{children}</h1>
    ),
    h2: ({ children }) => <H2>{children}</H2>,
    h3: ({ children }) => <H3>{children}</H3>,
    quote: ({ children }) => <p className="text-gray-700 italic">{children}</p>,
    display: ({ children }) => <p className="text-2xl font-bold text-blue-800">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-1 text-[#4a3f35] text-[15px] sm:text-base">{children}</ul>
    ),
  },
  listItem: { bullet: ({ children }) => <li className="leading-relaxed">{children}</li> },
  marks,
  types: {
    videoEmbed: ({ value }) => <VideoEmbed url={value.url} title={value.title} />,
    reflectionBox: ({ value }) => <ReflectionBox questions={value.questions || []} />,
    calloutBox: ({ value }) => <CalloutBox value={value} />,
    rawHtml: ({ value }) => <div dangerouslySetInnerHTML={{ __html: value.html || "" }} />,
  },
};

export default function LessonBody({ value }: { value: any[] }) {
  return (
    <div>
      <PortableText value={value || []} components={components} />
    </div>
  );
}
