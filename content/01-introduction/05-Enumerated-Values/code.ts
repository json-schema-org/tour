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

const solution = structuredClone(code);
solution.properties.role = {
  enum: ["employee", "manager", "admin"],
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
            enum: {
              type: "array",
              items: {
                allOf: [
                  {
                    anyOf: [
                      {
                        const: "employee",
                      },
                      {
                        const: "manager",
                      },
                      {
                        const: "admin",
                      },
                    ],
                  },
                  {
                    type: "string",
                  },
                ],
              },
            },
          },
          required: ["enum"],
        },
      },
      required: ["name", "age", "role"],
    },
  },
  required: ["type", "properties"],
};

module.exports = {
  code,
  solution,
  validationSchema,
};
