import { Studio } from "sanity";
import { studioConfig } from "@/sanity/config";

export default function StudioPage() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#fff" }}>
      <Studio config={studioConfig} />
    </div>
  );
}
