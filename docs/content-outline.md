> This file contains rough outline of the content that should be included in the tour. This is a starting point and will be updated as the tour is developed. After the tour is developed, this file will be removed.


# Content Outline

Chapter 1: Introduction 
1. Why JSON Schema? Understanding JSON and Its Need for Schema
2. JSON Schema Syntax and Structure 
3. Understanding the $schema Keyword
4. Understanding the $id Keyword
5. Understanding title and description Keywords
6. Defining Types with type Keyword

Chapter 2: Overview of Basic Types 
1. Boolean and Null
2. Numeric Type 
3. String
4. Object
5. Array
6. Specifying Constant Values 

Chapter 3: Generic Keywords 
1. Defining Enumerated Values with enum Keyword 
2. Adding Comments with $comment Keyword 
3. Using the default Keyword
4. Using the examples Keyword
5. Using the deprecated Keyword
 
Chapter 4: Strings
1. Constraining the Length with minLength and maxLength
2. Restricting String Values with enum
3. Regular Expressions 
4. Formats in Strings
5. Built-in Format: Dates and Times 
6. Built-in Format: Email addresses 
7. Built-in Format: Resource identifiers
8. Other Built-in Formats - Hostnames, IP Addresses, URI templates, and Regular Expressions

Chapter 5: Numeric Types
1. Integer 
2. Number
3. Using enum with Integers and Numbers
4. Restricting a Number to be Multiples of a Given Number - multipleOf keyword 
5. Specifying Ranges

Chapter 6: Arrays 
1. Specifying types for array Items
2. Tuple Validation
3. Unique Items 
4. Additional Items
5. Unevaluated Items
6. Using contains keyword
7. Specifying Valid Array Items with enum
8. minContains and maxContains
9. Specifying the Length of an Array

Chapter 7: Objects 
1. Creating Properties in Object
2. Defining Pattern Properties 
3. Defining Required Properties 
4. Defining Optional Properties
5. minProperties and maxProperties
6. readOnly and writeOnly Properties 
7. Using The propertyNames Keyword 
8. Handling the Extra Stuff with additionalProperties 
9. Creating a Nested Data Structure

Chapter 8: Combining Schemas 
1. Defining Subschemas with $defs Keyword
2. Add External References - $ref Keyword
3. Check for Valid Against All Subschemas (AND) - allOf
4. Check for Valid Against Any Subschemas (OR) - anyOf
5. Check for Valid Against Exactly One Subschemas (XOR) - oneOf
6. Check for Not Valid Against The Given Schemas (NOT) - not

Chapter 9: Conditional Validation 
1. Conditionally Requiring Certain Properties to be Present - dependentRequired
2. Creating Dependent Schemas 
3. Specifying Dependent Schema 
4. If-Then-Else 
5. Defining implications (A → B)

Chapter 10: Best Practices for Designing and Maintaining Schemas
1. Documenting JSON Schemas
2. Testing JSON Schemas
3. Organizing and Modularizing JSON Schemas
4. JSON Schema Governance

Chapter 11: JSON Schema Tools and Libraries

1. Online JSON Schema Validators
2. Language-specific JSON Schema Libraries
3. JSON Schema Integration with APIs and Frameworks
4. JSON Schema Development Tools
5. JSON Schema Community Resources
