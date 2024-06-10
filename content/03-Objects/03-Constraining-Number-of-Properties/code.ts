const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    contactMethods: {
      type: "object",
    },
  },
};

const solution = structuredClone(code);
solution.properties.contactMethods = {
  additionalProperties: {
    type: "string",
  },
  minProperties: 2,
  maxProperties: 5,
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {
        email: "jhon.doe@postman.com",
        phone: "1234567890",
        phone2: "1234567890",
      },
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {
        email: "jhon.doe@postman.com",
        phone: "1234567890",
      },
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {},
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {
        email: "jhon.doe@postman.com",
      },
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {
        email: "jhon.doe@postman.com",
        phone: "1234567890",
        phone2: "1234567890",
        email2: "jhondoe@gmail.com",
      },
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {
        email: 0,
        phone: null,
      },
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {
        email: "jhon.doe@postman.com",
        phone: "1234567890",
        phone2: "1234567890",
        email2: "jhondoe@gmail.com",
        phone3: "1234567890",
      },
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      contactMethods: {
        email: "jhon.doe@postman.com",
        phone: "1234567890",
        phone2: "1234567890",
        email2: "jhondoe@gmail.com",
        phone3: "1234567890",
        fax: "1234567890",
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
