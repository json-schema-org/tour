const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    hobbies: {},
  },
};

const solution = structuredClone(code);
solution.properties.hobbies = {
  type: "string",
  enum: ["reading", "writing", "painting"],
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      hobbies: "reading",
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hobbies: "writing",
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hobbies: "painting",
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hobbies: "dancing",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: null,
      hobbies: "painting",
    },
    expected: false,
  },
  {
    input: {
      name: null,
      age: 5,
      hobbies: "painting",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 5,
      hobbies: null,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
