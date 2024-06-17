const code: any = {
  type: "object",
  required: ["name", "age", "skills"],
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    skills: {
      type: "array",
    },
  },
};

const solution = structuredClone(code);

solution.properties.skills = {
  ...solution.properties.skills,
  contains: {
    const: "JavaScript",
  },
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["JavaScript", "Python"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["Python", "Java"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["JavaScript"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: [],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: null,
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
