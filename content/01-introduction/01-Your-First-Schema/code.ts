const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: "30z",
    },
    expected: false,
  },
  {
    input: {
      name: 30,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      location: "New York",
    },
    expected: true,
  },
];

const solution = structuredClone(code);
solution.properties.age = {
  type: "number",
};

module.exports = {
  code,
  solution,
  testCases,
};
