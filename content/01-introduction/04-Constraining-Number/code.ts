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
        role: {
          type: "object",
          properties: {
            const: {
              const: "employee",
            },
          },
          required: ["const"],
        },
      },
      required: ["name", "age", "role"],
    },
  },
  required: ["type", "properties"],
};

const solution = structuredClone(code);
solution.properties.role = {
  const: "employee",
};
module.exports = {
  code,
  solution,
  validationSchema,
};
