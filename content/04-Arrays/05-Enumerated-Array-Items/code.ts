const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    relevantDepartments: {
      type: "array",
    },
  },
};

const solution = structuredClone(code);

solution.properties.relevantDepartments = {
  ...solution.properties.relevantDepartments,
  items: {
    enum: ["HR", "IT", "Finance", "Admin"],
  },
  uniqueItems: true,
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      relevantDepartments: ["HR", "IT"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      relevantDepartments: ["HR", "IT", "HR"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      relevantDepartments: ["HR", "IT", "Finance", "Admin"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      relevantDepartments: ["HR", "IT", "Finance", "Admin", "HR"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      relevantDepartments: ["HR", "IT", "Finance", "Admin", "HR", "IT"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      relevantDepartments: null,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      relevantDepartments: ["Engineering"],
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
