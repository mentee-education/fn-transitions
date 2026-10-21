import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "./client";

export const studioConfig = defineConfig({
  name: "fn-transitions",
  title: "FN Transitions",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Course")
              .child(S.document().schemaType("course").documentId("course-transitions")),
            S.documentTypeListItem("courseModule").title("Modules"),
            S.documentTypeListItem("lesson").title("Lessons"),
            S.divider(),
            S.listItem().title("Home page").child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem().title("Program overview page").child(S.document().schemaType("overviewPage").documentId("overviewPage")),
            S.listItem().title("Modules & lessons page").child(S.document().schemaType("lessonsPage").documentId("lessonsPage")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
