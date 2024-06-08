const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {},
    companyName: {},
  },
};

const solution = structuredClone(code);
solution.properties.companyName = {
  const: "Postman",
};

solution.properties.age = {
  const: 25,
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 25,
      companyName: "Postman",
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 25,
      companyName: "Google",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 26,
      companyName: "Postman",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 26,
      companyName: "Google",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 24,
      companyName: "Postman",
    },
    expected: false,
  },
  {
    input: {
      name: 0,
      age: 25,
      companyName: "Postman",
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
