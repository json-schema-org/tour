const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    address: {
      type: "array",
      prefixItems: [
        {
          type: "number",
        },
        {
          type: "string",
        },
        {
          enum: ["Street", "Avenue", "Boulevard"],
        },
        {
          enum: ["NW", "NE", "SW", "SE"],
        },
      ],
    },
  },
};

const solution = structuredClone(code);

solution.properties.address.items = {
  type: "string",
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [1600, "Pennsylvania", "Avenue", "NW"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [1600, "Pennsylvania", "Avenue", "NW", "W"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [1600, "Pennsylvania", "Avenue", "NW", null],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [1600, "Pennsylvania", "Avenue"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [1600, "Pennsylvania", "Avenue", "N"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [1600, "Pennsylvania", "A", "NW"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [1600, null, "Avenue", "NW"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      address: [null, "Pennsylvania", "Avenue", "NW"],
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
