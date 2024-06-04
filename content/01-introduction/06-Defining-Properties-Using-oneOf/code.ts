const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
      minimum: 18,
      maximum: 60,
    },
    dateOfBirth: {
      type: "object",
      properties: {
        year: {
          type: "integer",
          minimum: 1964,
          maximum: 2024,
        },
        month: {
          type: "integer",
          minimum: 1,
          maximum: 12,
        },
        day: {
          type: "integer",
          minimum: 1,
          maximum: 31,
        },
      },
    },
  },
};

const solution = structuredClone(code);
solution.oneOf = [
  {
    required: ["age"],
  },
  {
    required: ["dateOfBirth"],
  },
];

const testCases: any[] = [
  {
    input: {
      name: "John Doe",
      age: 25,
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
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
      name: "John Doe",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 25,
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
