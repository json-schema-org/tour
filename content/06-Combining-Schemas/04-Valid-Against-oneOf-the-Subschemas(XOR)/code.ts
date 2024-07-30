const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
      oneOf: [{}],
    },
  },
};

const solution = structuredClone(code);
solution.properties.age.oneOf = [
  {
    minimum: 18,
    maximum: 60,
  },
  {
    minimum: 65,
  },
];

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
    },
    expected: true,
  },
  {
    input: {
      name: null,
      age: 23,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 2,
    },
    expected: false,
  },

  {
    input: {
      name: "person",
      age: 17,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 61,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 64,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 65,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 99,
    },
    expected: true,
  },
];
module.exports = {
  code,
  solution,
  testCases,
};
