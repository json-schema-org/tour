const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    employeeType: {
      enum: ["full-time", "part-time"],
    },
  }
};

const solution = structuredClone(code);
solution.anyOf = [
  {
    required:["salary"],
  },
  {
    required:["hourlyRate"],
  },
  
];

const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      employeeType: "full-time",
      salary: 1000,
    },
    expected: true,
  },
  
  {
    input: {
      name: "person",
      age: 23,
      employeeType: "full-time",
      salary: 1000,
      hourlyRate: 10,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      employeeType: "full-time",
      hourlyRate: 10,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      employeeType: "full-time",
    },
    expected: false,
  },
  
  
];
module.exports = {
  code,
  solution,
  testCases,
};
