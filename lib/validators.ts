import {
  validate,
  registerSchema,
  setMetaSchemaOutputFormat,
  unregisterSchema,
  SchemaObject,
  OutputUnit,
} from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";

import { hasNestedProperty } from "./client-functions";

setMetaSchemaOutputFormat(BASIC);
export const schemaUrl = "http://tour.json-schema.org/";

export async function hyperjumpValidate(
  data: any,
  schema: any,
  externalSchema?: any,
) {
  if (!("$schema" in schema)) {
    schema["$schema"] = "https://json-schema.org/draft/2020-12/schema";
  }
  try {
    registerSchema(schema as SchemaObject, schemaUrl);
    if (externalSchema) {
      registerSchema(externalSchema as SchemaObject, externalSchema.$id);
    }
    const output = await validate(schemaUrl, data as SchemaObject, BASIC);
    return output;
  } catch (e) {
    throw e;
  } finally {
    unregisterSchema(schemaUrl);
    if (externalSchema) {
      unregisterSchema(externalSchema.$id);
    }
  }
}

export async function hyperjumpCheckAnnotations(
  schema: any,
  requiredAnnotations: string[],
): Promise<OutputUnit> {
  // const annotationSchemaUrl = "http://tour2.json-schemad.org/";
  const dialectId = "https://json-schema.org/draft/2020-12/schema";
  if (!("$schema" in schema)) {
    schema["$schema"] = dialectId;
  }
  try {
    // registerSchema(schema as SchemaObject, annotationSchemaUrl);
    // const instance = await annotate(annotationSchemaUrl, data as SchemaObject);
    const missingAnnotations: string[] = [];
    for (const annotation of requiredAnnotations) {
      if (!hasNestedProperty(schema, annotation)) {
        missingAnnotations.push(annotation);
      }
    }
    if (missingAnnotations.length > 0) {
      throw new Error(
        `Schema does not contain the following annotations: ${missingAnnotations.join(
          ", ",
        )}`,
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
