const code: any = {
  $ref: "#/$defs/coordinate",
  $defs: {
    coordinate: {
      type: "array",
      prefixItems: [
        { type: "number", description: "latitude" },
        { type: "number", description: "longitude" },
      ],
    },
  },
};

const solution = structuredClone(code);
solution.unevaluatedItems = false;

const testCases = [
  // Valid: exactly two numbers (lat, long)
  {
    input: [40.7128, -74.006],
    expected: true,
  },
  // Valid: different coordinates
  {
    input: [51.5074, -0.1278],
    expected: true,
  },
  // Valid: negative coordinates
  {
    input: [-33.8688, 151.2093],
    expected: true,
  },
  // Valid: zero coordinates (null island)
  {
    input: [0, 0],
    expected: true,
  },
  // Invalid: extra item (altitude) - this is what unevaluatedItems: false prevents
  {
    input: [40.7128, -74.006, 10],
    expected: false,
  },
  // Invalid: extra string item
  {
    input: [40.7128, -74.006, "NYC"],
    expected: false,
  },
  // Invalid: multiple extra items
  {
    input: [40.7128, -74.006, 10, "NYC", true],
    expected: false,
  },
  // Invalid: wrong type for latitude
  {
    input: ["forty", -74.006],
    expected: false,
  },
  // Invalid: wrong type for longitude
  {
    input: [40.7128, "west"],
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
