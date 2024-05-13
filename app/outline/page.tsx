import React from "react";

import { contentManager } from "@/lib/contentManager";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
export default function OutlinePage() {
  const outline = contentManager.getOutline();

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
                      href={step.fullPath.replace(".mdx", "")}
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
