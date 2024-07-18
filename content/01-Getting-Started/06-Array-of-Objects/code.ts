const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    skills: {},
  },
};

const solution = structuredClone(code);
solution.properties.skills = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      level: { type: "string" },
    },
  },
};

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      skills: [
        {
          name: "JavaScript",
          level: "beginner",
        },
        {
          name: "TypeScript",
          level: "intermediate",
        },
        {
          name: "React",
          level: "advanced",
        },
      ],
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      skills: [
        {
          name: "JavaScript",
          level: "beginner",
        },
        {
          name: "TypeScript",
          level: "expert",
        },
      ],
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      skills: [
        {
          name: "JavaScript",
          level: "beginner",
        },
        {
          name: "TypeScript",
          level: 0,
        },
      ],
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      skills: [
        {
          name: "JavaScript",
          level: "beginner",
        },
        {
          name: 0,
          level: "intermediate",
        },
      ],
    },
    expected: false,
  },
];
module.exports = {
  code,
  solution,
  testCases,
};
