const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    isStudent: {
      type: "boolean",
    },
  },

  required: ["name"],
};

let solution = structuredClone(code);
solution = {
  ...solution,
  if: {
    properties: {
      isStudent: {
        const: true,
      },
    },
  },
  then: {
    required: ["age"],
  },
};
const testCases = [
  {
    input: {
      name: "John Doe",
      isStudent: true,
      age: 20,
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      isStudent: true,
      grade: 8,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      isStudent: false,
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      isStudent: true,
      grade: 4,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      isStudent: false,
      age: 40,
    },
    expected: true,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
