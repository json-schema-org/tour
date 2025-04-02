const code: any = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
  },
};

let solution = structuredClone(code);
solution.deprecated = true;
solution.properties.age.writeOnly = true;
solution.properties.name.readOnly = true;

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30.5,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: "30",
    },
    expected: false,
  },
  {
    input: {
      name: 30,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30.0,
      location: "New York",
    },
    expected: true,
  },
];
const expectedAnnotations = [
  "deprecated",
  "properties.age.writeOnly",
  "properties.name.readOnly",
];
module.exports = {
  code,
  solution,
  testCases,
  expectedAnnotations,
};
