const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
  },
};

const solution = structuredClone(code);
solution.additionalProperties = {
  type: "integer",
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      property1: 1,
    },
    expected: true,
  },
  {
    input: {
      name: null,
      age: 30,
      property1: 1,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: null,
      property1: 1,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 51,
      property1: null,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      property1: 1.5,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      property2: "1",
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
