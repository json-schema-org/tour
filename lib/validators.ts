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
  FLAG,
} from "@hyperjump/json-schema/draft-2020-12";

setMetaSchemaOutputFormat("FLAG");

export async function hyperjumpValidate(data: any, schema: any) {
  if (!("$schema" in schema)) {
    schema["$schema"] = "https://json-schema.org/draft/2020-12/schema";
  }
  try {
    registerSchema(schema as SchemaObject, "http://example.com/schemas/string");
    const output = await validate(
      "http://example.com/schemas/string",
      data as SchemaObject,
      "FLAG"
    );
    console.log(output);
    return output;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    unregisterSchema("http://example.com/schemas/string");
  }
}

import { validator as schemaSafeValidator } from "@exodus/schemasafe";

export function schemaSafeValidate(data: any, schema: any) {
  console.log(data, schema);
  const validate = schemaSafeValidator(schema, { includeErrors: true });
  const valid = validate(data);

  return { valid, errors: validate.errors };
}
