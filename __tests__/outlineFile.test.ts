import { expect, test } from "vitest";
import { hyperjumpValidate } from "@/lib/validators";
import outlineFile from "@/content/outline.json";

const outlineSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "array",
  minItems: 1,
  items: {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      folderName: {
        type: "string",
      },
      steps: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            fileName: {
              type: "string",
            },
            fullPath: {
              type: "string",
            },
          },
          required: ["title", "fileName", "fullPath"],
        },
      },
    },
    required: ["title", "folderName", "steps"],
  },
};

test("outlineFile", async () => {
  const { valid, errors } = await hyperjumpValidate(outlineFile, outlineSchema);
  expect(valid).toBe(true);
  expect(errors).toBe(undefined);
});
