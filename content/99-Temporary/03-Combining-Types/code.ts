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
      required: ["firstName", "lastName"],
    },
    age: {
      type: "integer",
    },
  },
};

const solution = structuredClone(code);
solution.properties.name.properties.middleName = { type: ["string", "null"] };

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
        middleName: null,
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
        middleName: 0,
      },
      age: 23,
    },
    expected: false,
  },
  {
    input: {
      name: {
        firstName: "John",
        lastName: "Smith",
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
