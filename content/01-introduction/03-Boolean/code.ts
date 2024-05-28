const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "number",
    },
  },
};

const validationSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "object",
    },
    properties: {
      type: "object",
      properties: {
        name: {
          type: "object",
          properties: {
            type: {
              type: "string",
              const: "string",
            },
          },
          required: ["type"],
        },
        age: {
          type: "object",
          properties: {
            type: {
              type: "string",
              const: "number",
            },
          },
          required: ["type"],
        },
        isFullTime: {
          type: "object",
          properties: {
            type: {
              type: "string",
              const: "boolean",
            },
          },
          required: ["type"],
        },
      },
      required: ["name", "age", "isFullTime"],
    },
  },
  required: ["type", "properties"],
};

const solution = structuredClone(code);
solution.properties.isFullTime = {
  type: "boolean",
};
module.exports = {
  code,
  solution,
  validationSchema,
};
