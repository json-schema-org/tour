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
export default function Test() {
  const cm = new ContentManager();
  const outline = cm.outline;
  console.log(outline);
  return (
    <div>
      <OrderedList>
        {outline.map((item) => {
          return (
            <ListItem key={item.folderName}>
              {item.title}
              <UnorderedList>
                {item.steps.map((step) => (
                  <ListItem key={step.fileName}>{step.title}</ListItem>
                ))}
              </UnorderedList>
            </ListItem>
          );
        })}
      </OrderedList>
    </div>
  );
}
