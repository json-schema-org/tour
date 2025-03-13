const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    grade: {
      type: "number",
      minimum: 0,
      maximum: 10,
    },
    recommendationLetter: {
      type: "string",
    },
    personalStatement: {
      type: "string",
    },
  },
  required: ["name", "grade"],
};

let solution = structuredClone(code);
solution = {
  ...solution,
  if: {
    properties: {
      grade: {
        minimum: 8,
      },
    },
  },
  then: {
    required: ["recommendationLetter"],
    not: { required: ["personalStatement"] },
  },
  else: {
    required: ["personalStatement"],
    not: { required: ["recommendationLetter"] },
  },
};
const testCases = [
  {
    input: {
      name: "John Doe",
      age: 20,
      grade: 8,
      recommendationLetter: "Dr. Smith's letter",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 20,
      grade: 5,
      personalStatement: "I love engineering..",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      grade: 5,
      personalStatement: "",
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 20,
      grade: 9,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 20,
      grade: 5,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 20,
      grade: 5,
      recommendationLetter: "",
      personalStatement: "",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 20,
      grade: 8,
      recommendationLetter: "",
      personalStatement: "",
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 20,
      recommendationLetter: "",
    },
    expected: false,
  },
  {
    input: {
      age: 20,
      grade: 8,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
