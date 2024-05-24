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

const validationSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
    },
  },
};

module.exports = {
  code,
  validationLogicFunction,
};
