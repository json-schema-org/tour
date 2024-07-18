const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    creditCardNumber: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },

  dependentRequired: {
    creditCardNumber: [],
  },
  required: ["name"],
};

const solution = structuredClone(code);
solution.dependentRequired = {
  creditCardNumber: ["address"],
};
const testCases = [
  {
    input: {
      name: "John Doe",
      creditCardNumber: "1234 5678 9012 3456",
      address: "123 Main St",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      creditCardNumber: 1234,
      address: "123 Main St",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      creditCardNumber: "1234 5678 9012 3456",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",

      address: "123 Main St",
    },
    expected: true,
  },
  {
    input: {
      address: "123 Main St",
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
