const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    phoneNumber: {},
    postalCode: {},
  },
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "1234567",
      phoneNumber: "1234567890",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "12345",
      phoneNumber: "1234567890",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "123456",
      phoneNumber: "123456789",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: "30",
      postalCode: "123456",
      phoneNumber: "1234567890",
    },
    expected: false,
  },
  {
    input: {
      name: 0,
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
    },
    expected: false,
  },
];

const solution = structuredClone(code);
solution.properties.phoneNumber = {
  type: "string",
  minLength: 10,
};

solution.properties.postalCode = {
  type: "string",
  minLength: 6,
  maxLength: 6,
};

module.exports = {
  code,
  solution,
  testCases,
};
