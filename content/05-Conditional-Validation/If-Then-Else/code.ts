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
    grade: {
      type: "number",
      minimum: 0,
      maximum: 10,
    },
  },

  required: ["name", "isStudent"],
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
  else: {
    required: ["grade"],
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
      isStudent: false,
      grade: 8,
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
    expected: false,
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
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
