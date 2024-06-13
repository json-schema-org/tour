const code: any = {
  type: "object",
};

const solution = {
  ...code,
  minProperties: 2,
  propertyNames: {
    pattern: "^[A-Z]+$",
    minimumLength: 3,
  },
  additionalProperties: {
    type: ["string", "integer"],
  },
};

const testCases = [
  {
    input: {
      NAME: "JOhN DOE",
      AGE: 16,
    },
    expected: true,
  },
  {
    input: {
      NAME: "JOhN DOE",
      AGE: 16,
      ph: "123",
    },
    expected: false,
  },
  {
    input: {
      NAME: "John Doe",
      age: 16,
    },
    expected: false,
  },
  {
    input: {
      NAME: "John Doe",
      AGE: null,
    },
    expected: false,
  },
  {
    input: {
      NAME: "John Doe",
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
