const code: any = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "integer",
    },
    status: {
    },
  }
};

const solution = structuredClone(code);
solution.properties.status = {
  "not":{
    type: "null",
  }
}
const testCases: any[] = [
  {
    input: {
      name: "person",
      age: 23,
      status: "active",
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      status: true,
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      age: 23,
      status:[]
    },
    expected: true,
  },
  {
    input: {
      name: null,
      age: 23,
      status: "active",
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: 23,
      status: null,
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      age: "0",
      status: "active",
    },
    expected: false,
  },
    
];
module.exports = {
  code,
  solution,
  testCases,
};
