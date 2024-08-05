const code: any = {
  $defs: {},
  type: "object",
  properties: {
    name: {
      type: "object",
      properties: {
        firstName: {},
        middleName: {},
        lastName: {},
      },
    },
  },

  required: ["name"],
};

let solution = structuredClone(code);
solution.$defs = {
  stringType: {
    type: "string",
  },
};

solution.properties.name.properties.firstName = {
  $ref: "#/$defs/stringType",
};
solution.properties.name.properties.middleName = {
  $ref: "#/$defs/stringType",
};
solution.properties.name.properties.lastName = {
  $ref: "#/$defs/stringType",
};
const testCases = [
  {
    input: {
      name: {
        firstName: "John",
        middleName: "Smith",
        lastName: "Doe",
      },
    },
    expected: true,
  },
  {
    input: {
      name: {
        firstName: null,
        middleName: "Smith",
        lastName: "Doe",
      },
    },
    expected: false,
  },
  {
    input: {
      name: {
        firstName: "John",
        middleName: null,
        lastName: "Doe",
      },
    },
    expected: false,
  },
  {
    input: {
      name: {
        firstName: "John",
        middleName: "Smith",
        lastName: null,
      },
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
