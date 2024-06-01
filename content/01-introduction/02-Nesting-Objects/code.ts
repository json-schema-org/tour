const code: any = {
  type: "object",
  properties: {
    name: {},
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
        skills: {
          type: "object",
          properties: {
            type: {
              type: "string",
              const: "array",
            },
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  const: "string",
                },
              },
              required: ["type"],
            },
          },
        },
      },
      required: ["name", "age", "skills"],
    },
  },
  required: ["type", "properties"],
};

const solution = structuredClone(code);
solution.properties.name = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    middleName: {
      type: "string",
    },
  },
};
module.exports = {
  code,
  solution,
  validationSchema,
};