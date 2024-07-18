const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    hasAgreedToTerms: {},
  },
};

const solution = structuredClone(code);
solution.properties.hasAgreedToTerms = {
  type: ["boolean", "null"],
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      hasAgreedToTerms: true,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hasAgreedToTerms: 0,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      hasAgreedToTerms: null,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      hasAgreedToTerms: "yes",
    },
    expected: false,
  },
  {
    input: {
      name: null,
      age: 23,
      hasAgreedToTerms: null,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: "23",
      hasAgreedToTerms: null,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
