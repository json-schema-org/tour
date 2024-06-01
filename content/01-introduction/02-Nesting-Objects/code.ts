const code: any = {
  type: "object",
  properties: {
    name: {},
    age: {
      type: "number",
    },
  },
};

const solution = structuredClone(code);
solution.properties.name = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    middleName: {
      type: "string",
    },
  },
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
    },
    expected: false,
  },
  {
    input: {
      name: {
        firstName: "John",
        lastName: "Doe",
        middleName: "Smith",
      },
      age: 23,
    },
    expected: true,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
