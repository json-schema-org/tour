const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    workedHours: {
      type: "array",
    },
  },
};

const solution = structuredClone(code);

solution.properties.workedHours = {
  ...solution.properties.workedHours,
  contains: {
    type: "integer",
    minimum: 8,
    maximum: 12,
  },
  minContains: 2,
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      workedHours: [8, 9, 10, 11, 12],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      workedHours: [8, 9],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      workedHours: [8, 12],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      workedHours: [7, 13],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      workedHours: [8, 13],
    },
    expected: false,
  },

  {
    input: {
      name: "John Doe",
      age: 30,
      workedHours: [7, 12],
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
