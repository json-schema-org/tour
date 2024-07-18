const code: any = {
  type: "object",
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
  prefixItems: [
    { enum: ["HTML", "CSS", "JavaScript"] },
    { enum: ["HTML", "CSS", "JavaScript"] },
    { enum: ["HTML", "CSS", "JavaScript"] },
  ],
  unevaluatedItems: {
    type: "string",
  },
};

const testCases = [
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["HTML", "CSS", "JavaScript", "TypeScript"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["JavaScript", "CSS", "HTML", "TypeScript"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["JavaScript", "HTML", "CSS", "TypeScript"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["HTML", "CSS", "JavaScript", 123],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
    },
    expected: true,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["React", "Java", "Vue.js"],
    },
    expected: false,
  },
  {
    input: {
      name: "John Doe",
      age: 30,
      skills: ["HTML", "JavaScript", "TypeScript", "React", "Vue"],
    },
    expected: false,
  },
];

module.exports = {
  code,
  solution,
  testCases,
};
