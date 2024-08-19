const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    postalCode: {},
    phoneNumber: {},
    countryCode: {},
  },
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
      countryCode: "IN",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "1234567",
      phoneNumber: "1234567890",
      countryCode: "IN",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "12345",
      phoneNumber: "1234567890",
      countryCode: "IN",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      postalCode: "123456",
      phoneNumber: "123456789",
      countryCode: "IN",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: "30",
      postalCode: "123456",
      phoneNumber: "1234567890",
      countryCode: "IN",
    },
    expected: false,
  },
  {
    input: {
      name: 0,
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
      countryCode: "IN",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 30,
      postalCode: "12345a",
      phoneNumber: "1234567890",
      countryCode: "IN",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 30,
      postalCode: "123456",
      phoneNumber: "123456789a",
      countryCode: "IN",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
      countryCode: "INA",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
      countryCode: "in",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
      countryCode: "I",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 30,
      postalCode: "123456",
      phoneNumber: "1234567890",
      countryCode: "IND",
    },
    expected: false,
  },
];

const solution = structuredClone(code);
solution.properties.phoneNumber = {
  type: "string",
  pattern: "^[0-9]{10}$",
};

solution.properties.postalCode = {
  type: "string",
  pattern: "^[0-9]{6}$",
};

solution.properties.countryCode = {
  type: "string",
  pattern: "^[A-Z]{2}$",
};

module.exports = {
  code,
  solution,
  testCases,
};
