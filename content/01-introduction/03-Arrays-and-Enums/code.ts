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
  type: "array",
  items: {
    type: "string",
    enum: ["reading", "writing", "painting"],
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
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
