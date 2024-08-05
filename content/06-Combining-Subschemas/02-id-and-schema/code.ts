const code: any = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    name: {},
    age: { type: "integer" },
  },
};

let externalSchema = {
  $id: "https://example.com/string",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "string",
};

let solution = structuredClone(code);
solution.properties.name = {
  $ref: "https://example.com/string",
};

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

module.exports = {
  code,
  solution,
  testCases,
  externalSchema,
};
