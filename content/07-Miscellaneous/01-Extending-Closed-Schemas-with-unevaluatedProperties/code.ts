const code: any = {
  $ref: "https://example.com/address",
  properties: {
    street_address: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    type: { enum: ["residential", "business"] },
  },
  required: ["street_address", "city", "state", "type"],
  additionalProperties: false
};

let solution = structuredClone(code);


solution.unevaluatedProperties = {
  type: "number",
};

const testCases = [
  {
    input: {
      street_address: "1600 Pennsylvania Avenue NW",
      city: "Washington",
      state: "DC",
      type: "business",
    },
    expected: true,
  },
  {
    input: {
      street_address: "1600 Pennsylvania Avenue NW",
      city: "Washington",
      state: "DC",
      type: "business",
      zip: 20500,
    },
    expected: true, 
  },
  {
    input: {
      street_address: "1600 Pennsylvania Avenue NW",
      city: "Washington",
      state: "DC",
      type: "business",
      zip: "20500", 
    },
    expected: false, 
  },
  {
    input: {
      street_address: "1600 Pennsylvania Avenue NW",
      city: "Washington",
      state: "DC",
      type: "business",
      zip: null, 
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
