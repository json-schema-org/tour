import Ajv from "ajv/dist/2020.js";
// @ts-ignore
import betterAjvErrors from "better-ajv-errors";
export function ajv(data: any, schema: any) {
  const ajv = new Ajv({ allErrors: true, verbose: true }); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(schema);
  const valid = validate(data);
  const errors = betterAjvErrors(schema, data, validate.errors, {
    indent: 2,
  });
  return { valid, errors };

  //   {
  //     instancePath: '/1',
  //     schemaPath: '#/items/type',
  //     keyword: 'type',
  //     params: { type: 'string' },
  //     message: 'must be string'
  //   },
}

import {
  validate,
  registerSchema,
  setMetaSchemaOutputFormat,
  unregisterSchema,
} from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";

setMetaSchemaOutputFormat(BASIC);

export async function hyperjumpValidate(data: any, schema: any) {
  registerSchema(schema, "http://example.com/schemas/string");
  try {
    const output = await validate("http://example.com/schemas/string", data);
    return output;
  } catch (e) {
    // throw e;
  } finally {
    unregisterSchema("http://example.com/schemas/string");
  }
  // console.log(BASIC);
}
