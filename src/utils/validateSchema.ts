export interface FormField {
    id: string;
    type: string;
    label: string;
    required: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    validation?: { pattern: string; message: string };
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: FormField[];
  }
  
  export function validateSchema(schema: any): asserts schema is FormSchema {
    // Ensure schema is an object
    if (typeof schema !== "object" || schema === null) {
      throw new Error("The schema must be a valid object.");
    }
  
    // Check required top-level properties
    const { formTitle, formDescription, fields } = schema;
    if (!formTitle || typeof formTitle !== "string") {
      throw new Error("`formTitle` is required and must be a string.");
    }
    if (!formDescription || typeof formDescription !== "string") {
      throw new Error("`formDescription` is required and must be a string.");
    }
    if (!Array.isArray(fields)) {
      throw new Error("`fields` is required and must be an array.");
    }
  
    // Validate each field
    fields.forEach((field, index) => {
      const prefix = `Field #${index + 1}`;
  
      if (typeof field !== "object" || field === null) {
        throw new Error(`${prefix}: Each field must be an object.`);
      }
  
      const { id, type, label, required, options, validation } = field;
  
      // Required field properties
      if (!id || typeof id !== "string") {
        throw new Error(`${prefix}: \`id\` is required and must be a string.`);
      }
      if (!type || typeof type !== "string") {
        throw new Error(`${prefix}: \`type\` is required and must be a string.`);
      }
      if (!label || typeof label !== "string") {
        throw new Error(`${prefix}: \`label\` is required and must be a string.`);
      }
      if (typeof required !== "boolean") {
        throw new Error(`${prefix}: \`required\` is required and must be a boolean.`);
      }
  
      // Type-specific validations
      if (type === "select" || type === "radio") {
        if (!Array.isArray(options) || options.length === 0) {
          throw new Error(`${prefix}: \`options\` is required and must be a non-empty array for \`${type}\` fields.`);
        }
        options.forEach((option, optIndex) => {
          if (!option.value || !option.label) {
            throw new Error(`${prefix} -> Option #${optIndex + 1}: Each option must have \`value\` and \`label\`.`);
          }
        });
      }
  
      // Validation rules
      if (validation) {
        if (typeof validation.pattern !== "string") {
          throw new Error(`${prefix}: \`validation.pattern\` must be a string.`);
        }
        if (typeof validation.message !== "string") {
          throw new Error(`${prefix}: \`validation.message\` must be a string.`);
        }
      }
    });
  }
  