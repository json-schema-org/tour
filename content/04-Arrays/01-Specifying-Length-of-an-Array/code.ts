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
};

const solution = structuredClone(code);
solution.properties.phones = {
  type: "array",
  items: {
    type: "string",
    pattern: "^\\d{3}-\\d{3}-\\d{4}$",
  },
  minItems: 1,
  maxItems: 3,
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: [],
    },
    expected: false,
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
      phones: ["123-456-78900"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["1a3-456-7g90"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["1234567890"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: [213],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["797-147-7454", "123-456-7890"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["797-147-7454", "123-456-7890", "123-006-7890"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      phones: ["797-147-7454", "123-456-7890", "123-006-7890", "745-746-5584"],
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
