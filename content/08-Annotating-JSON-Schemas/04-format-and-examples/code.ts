const code: any = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
  },
};

let solution = structuredClone(code);

solution.properties.email.format = "email";
solution.properties.email.examples = [
  "John.Doe@example.com",
  "Jane.Doe@example.com",
];

const testCases = [
  {
    input: {
      name: "John Doe",
      email: "John.Doe@example.com",
    },
    expected: true,
  },

  {
    input: {
      name: "John Doe",
      email: "John.Doe@example",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      email: "John.Doe@example.",
    },
    expected: false,
  },
];
const expectedAnnotations = [
  "properties.email.examples",
  "properties.email.format",
];
module.exports = {
  code,
  solution,
  testCases,
  expectedAnnotations,
};
