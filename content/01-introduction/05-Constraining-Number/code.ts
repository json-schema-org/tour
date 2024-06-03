const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {},
    dateOfBirth: {},
  },
};

const solution = structuredClone(code);
solution.properties.age = {
  type: "number",
  minimum: 18,
  maximum: 60,
};

solution.properties.dateOfBirth = {
  type: "object",
  properties: {
    year: {
      type: "number",
      minimum: 1964,
      maximum: 2024,
    },
    month: {
      type: "number",
      minimum: 1,
      maximum: 12,
    },
    day: {
      type: "number",
      minimum: 1,
      maximum: 31,
    },
  },
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: {
        year: 1998,
        month: 5,
        day: 12,
      },
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: {
        year: 2025,
        month: 5,
        day: 12,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: {
        year: 2024,
        month: 0,
        day: 12,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: {
        year: 2024,
        month: 13,
        day: 12,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: {
        year: 2024,
        month: 12,
        day: 0,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: {
        year: 2024,
        month: 12,
        day: 32,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: {
        year: 1963,
        month: 5,
        day: 12,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 17,
      dateOfBirth: {
        year: 1998,
        month: 5,
        day: 12,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 61,
      dateOfBirth: {
        year: 1998,
        month: 5,
        day: 12,
      },
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
