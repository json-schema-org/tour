const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    phones: {
      type: "array",
      items: {
        type: "string",
        pattern: "^\\d{3}-\\d{3}-\\d{4}$",
      },
    },
  },
};

const solution = structuredClone(code);
solution.properties.phones = {
  ...solution.properties.phones,
  uniqueItems: true,
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: [],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["123-456-7890"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["123-456-7890", "123-456-7890"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["123-456-78x0"],
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
