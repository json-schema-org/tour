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
      age: 30.5,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: "30",
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
      age: 30.0,
      location: "New York",
    },
    expected: true,
  },
];

const solution = structuredClone(code);
solution.properties.age = {
  type: "integer",
};

module.exports = {
  code,
  solution,
  testCases,
};
