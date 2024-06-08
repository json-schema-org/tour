const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    performanceRating: {},
  },
};

const solution = structuredClone(code);
solution.properties.performanceRating = {
  type: "number",
  minimum: 0,
  maximum: 5,
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: 3,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: 0,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: 5,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: 3.5,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: 5.5,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: -1,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: "3",
    },
    expected: false,
  },
  {
    input: {
      name: null,
      age: 23,
      performanceRating: 3,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      performanceRating: null,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
