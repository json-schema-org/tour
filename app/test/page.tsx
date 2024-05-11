import React from "react";
import Page1, {
  metadata,
} from "@/content/01-introduction/01-why-json-schema.mdx";

export default function Test() {
  console.log(metadata);
  return (
    <div>
      <Page1 />
    </div>
  );
}
