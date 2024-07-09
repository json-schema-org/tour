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
  required: ["name", "age", "hobbies"],
};

const solution = structuredClone(code);
solution.properties.hobbies = {
  type: "array",
  items: {
    type: "string",
  },
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      hobbies: ["reading", "writing", "painting"],
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hobbies: ["reading", "writing", "painting", "fighting"],
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hobbies: [0, 1],
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      hobbies: [],
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hobbies: "reading",
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
