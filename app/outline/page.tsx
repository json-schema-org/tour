import React from "react";
// import Page1, {
//   metadata,
// } from "@/content/01-introduction/01-why-json-schema.mdx";
import ContentManager from "@/lib/contentManager";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
export default function Test() {
  const cm = new ContentManager();
  const outline = cm.outline;
  return (
    <div>
      <OrderedList>
        {outline.map((item) => {
          return (
            <ListItem key={item.folderName}>
              {item.title}
              <UnorderedList>
                {item.steps.map((step) => (
                  <ListItem key={step.fileName}>
                    <Link
                      href={"content/" + step.fullPath.replace(".mdx", "")}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {step.title}
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </ListItem>
          );
        })}
      </OrderedList>
    </div>
  );
}
