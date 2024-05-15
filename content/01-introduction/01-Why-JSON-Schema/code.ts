const code = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "number",
    },
  },
};

function validationLogicFunction() {
  console.log("Doing some validation logic here");
}

module.exports = {
  code,
  validationLogicFunction,
};
