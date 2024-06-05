const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    dateOfBirth: {
      type: "string",
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
solution.properties.dateOfBirth.format = "date";

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
    },
    expected: true,
  },
  {
    input: {
      name: null,
      age: 23,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      dateOfBirth: "1998-05-12",
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      dateOfBirth: "1st January 2025",
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      dateOfBirth: "1998-05-12",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
    },
    expected: false,
  },
];
module.exports = {
  code,
  solution,
  testCases,
};
