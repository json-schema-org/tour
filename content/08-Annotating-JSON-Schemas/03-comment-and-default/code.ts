const code: any = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
  },
};

let solution = structuredClone(code);

solution.properties.age.default = 18;
solution.properties.name.$comment = "This is the name of the employee";

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
  "properties.age.default",
  "properties.name.$comment",
];
module.exports = {
  code,
  solution,
  testCases,
  expectedAnnotations,
};
