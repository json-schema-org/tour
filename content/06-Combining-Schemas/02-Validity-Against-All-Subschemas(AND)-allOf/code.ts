const code: any = {
  $defs: {
    ageLimit: {
      minimum: 18,
      maximum: 60,
    },
  },
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {},
  },

  required: ["name"],
};

let solution = structuredClone(code);
solution.properties.age.allOf = [];
solution.properties.age.allOf.push({ type: "integer" });
solution.properties.age.allOf.push({ $ref: "#/$defs/ageLimit" });

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 23,
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 17,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 61,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 41.5,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: "23",
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
