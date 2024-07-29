import {
  validate,
  registerSchema,
  setMetaSchemaOutputFormat,
  unregisterSchema,
  SchemaObject,
  OutputUnit,
} from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";

import { annotate } from "@hyperjump/json-schema/annotations/experimental";
import * as AnnotatedInstance from "@hyperjump/json-schema/annotated-instance/experimental";

setMetaSchemaOutputFormat(BASIC);
export const schemaUrl = "http://tour.json-schema.org/";

export async function hyperjumpValidate(data: any, schema: any) {
  if (!("$schema" in schema)) {
    schema["$schema"] = "https://json-schema.org/draft/2020-12/schema";
  }
  try {
    registerSchema(schema as SchemaObject, schemaUrl);
    const output = await validate(schemaUrl, data as SchemaObject, BASIC);
    return output;
  } catch (e) {
    throw e;
  } finally {
    unregisterSchema(schemaUrl);
  }
}

export async function hyperjumpCheckAnnotations(
  data: any,
  schema: any,
  requiredAnnotations: string[]
): Promise<OutputUnit> {
  console.log(data, schema, requiredAnnotations);
  const annotationSchemaUrl = "http://tour2.json-schemad.org/";
  const dialectId = "https://json-schema.org/draft/2020-12/schema";
  if (!("$schema" in schema)) {
    schema["$schema"] = dialectId;
  }
  try {
    // registerSchema(schema as SchemaObject, annotationSchemaUrl);
    // const instance = await annotate(annotationSchemaUrl, data as SchemaObject);
    const missingAnnotations: string[] = [];
    for (const annotation of requiredAnnotations) {
      let values = Object.keys(schema).filter((key) => key === annotation);
      console.log(values);
      if (values.length === 0) {
        missingAnnotations.push(annotation);
      }
    }
    if (missingAnnotations.length > 0) {
      throw new Error(
        `Schema does not contain the following annotations: ${missingAnnotations.join(
          ", "
        )}`
      );
    }
    return {
      valid: true,
      keyword: "",
      instanceLocation: "",
      absoluteKeywordLocation: "",
    };
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    // unregisterSchema(annotationSchemaUrl);
  }
}
