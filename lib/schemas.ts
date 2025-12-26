export const DRAFT_2020_12_METASCHEMA_FLAT = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/schema",
  title: "Core vocabulary meta-schema (Flattened for Monaco)",
  type: ["object", "boolean"],
  properties: {
    $id: { type: "string", format: "uri-reference" },
    $schema: { type: "string", format: "uri" },
    $ref: { type: "string", format: "uri-reference" },
    $anchor: { type: "string", pattern: "^[A-Za-z_][-A-Za-z0-0_:]*$" },
    $defs: {
      type: "object",
      additionalProperties: { type: ["object", "boolean"] },
    },
    $vocabulary: {
      type: "object",
      additionalProperties: { type: "boolean" },
    },
    type: {
      anyOf: [
        { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] },
        {
          type: "array",
          items: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] },
          uniqueItems: true,
        },
      ],
    },
  },
};