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
  SchemaObject,
} from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";

setMetaSchemaOutputFormat(BASIC);
export const schemaUrl = "http://tour.json-schema.org/";

export async function hyperjumpValidate(data: any, schema: any) {
  if (!("$schema" in schema)) {
    schema["$schema"] = "https://json-schema.org/draft/2020-12/schema";
  }
  try {
    registerSchema(schema as SchemaObject, schemaUrl);
    const output = await validate(schemaUrl, data as SchemaObject, BASIC);
    console.log(output);
    return output;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    unregisterSchema(schemaUrl);
  }
}

import { validator as schemaSafeValidator } from "@exodus/schemasafe";

export function schemaSafeValidate(data: any, schema: any) {
  console.log(data, schema);
  const validate = schemaSafeValidator(schema, { includeErrors: true });
  const valid = validate(data);

  return { valid, errors: validate.errors };
}
