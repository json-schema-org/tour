const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
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
      },
      required: ["name", "age"],
    },
  },
  required: ["type", "properties"],
};

const solution = structuredClone(code);
solution.properties.age = {
  type: "number",
};

module.exports = {
  code,
  validationSchema,
  solution,
};
