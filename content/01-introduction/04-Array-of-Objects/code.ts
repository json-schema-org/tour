const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "number",
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
      level: {
        enum: ["beginner", "intermediate", "advanced"],
      },
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
    expected: false,
  },
];
module.exports = {
  code,
  solution,
  testCases,
};
