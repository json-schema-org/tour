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
  patternProperties: {},
  additionalProperties: false,
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      "DEPT-001": "HR",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      "DEPT-01": "HR",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      "DEPT-001": "hr",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      "DEPT-00a": "HR",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      "dpt-001": "HR",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: null,
      "DEPT-001": "HR",
    },
    expected: false,
  },
  {
    input: {
      name: null,
      age: 16,
      "DEPT-001": "HR",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 16,
      "EMP-001": "HR",
    },
    expected: false,
  },
];

const solution = structuredClone(code);
solution.patternProperties = {
  "^DEPT-[0-9]{3}$": {
    pattern: "^[A-Z]+$",
  },
};

module.exports = {
  code,
  solution,
  testCases,
};
