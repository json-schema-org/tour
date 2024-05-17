"use server";

const code = {
  type: "object",
  properties: {
    name: {
      type: "string",
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
