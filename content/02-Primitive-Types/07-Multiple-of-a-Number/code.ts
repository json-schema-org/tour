const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: { type: "integer" },
    hourlyWage: {},
  },
};

const solution = structuredClone(code);
solution.properties.hourlyWage = {
  type: "number",
  minimum: 0,
  maximum: 100,
  multipleOf: 0.25,
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: 10,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: 10.25,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: 10.26,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: -10.26,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: -10,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: 100,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: 0,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: -1,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      hourlyWage: 101,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
