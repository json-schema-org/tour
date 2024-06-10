const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {},
    salary: {},
  },
};

const solution = structuredClone(code);
solution.properties.age = {
  type: "integer",
  exclusiveMinimum: 18,
  exclusiveMaximum: 60,
};
solution.properties.salary = {
  type: "integer",
  exclusiveMinimum: 30000,
  exclusiveMaximum: 80000,
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      salary: 40000,
    },
    expected: true,
  },
  {
    input: {
      name: 0,
      age: 23,
      salary: 40000,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      salary: 30000,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      salary: 80000,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 18,
      salary: 50000,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 60,
      salary: 50000,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
