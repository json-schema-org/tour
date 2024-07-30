const code: any = {
  $defs: {
    next: {},
  },
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    next: {
      $ref: "#/$defs/next",
    },
  },
};

const solution = structuredClone(code);
solution.$defs.next = {
  type: "object",
  properties: {
    value: {
      type: ["string"],
    },
    next: {
      oneOf: [{ $ref: "#/$defs/next" }, { type: "null" }],
    },
  },
  required: ["next", "value"],
};
const testCases: any[] = [
  {
    input: {
      name: "person",
      next: {
        value: "first",
        next: {
          value: "second",
          next: {
            value: "third",
            next: {
              value: "fourth",
              next: {
                value: "fifth",
                next: null,
              },
            },
          },
        },
      },
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      next: {
        value: "first",
        next: {
          value: "second",
          nedxt: {
            value: "third",
            next: {
              value: "fourth",
              next: {
                value: "fifth",
                next: null,
              },
            },
          },
        },
      },
    },
    expected: false,
  },
  {
    input: {
      name: "person",
      next: { value: "first", next: null },
    },
    expected: true,
  },
  {
    input: {
      name: "person",
      next: "test",
    },
    expected: false,
  },
];
module.exports = {
  code,
  solution,
  testCases,
};
