const code: any = {
  type: "object",
  properties: {
    name: {
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
    },
    age: {
      type: "integer",
    },
  },
};

const solution = structuredClone(code);
solution.properties.name.required = ["firstName", "lastName"];

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
  {
    input: {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      age: 23,
    },
    expected: true,
  },
  {
    input: {
      name: {
        lastName: "Doe",
      },
      age: 23,
    },
    expected: false,
  },
  {
    input: {
      name: {
        firstName: "John",
      },
      age: 23,
    },
    expected: false,
  },
  {
    input: {
      name: {
        firstName: "John",
        lastName: "Doe",
        middleName: null,
      },
      age: 23,
    },
    expected: false,
  },
  {
    input: {
      name: {
        firstName: 0,
        lastName: "Smith",
      },
      age: 23,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
