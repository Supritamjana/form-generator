import React from "react";
import { useForm, SubmitHandler, ValidationRule } from "react-hook-form";

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  value? : string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern?: string; message: string };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

const getValidation = (pattern?: string, message?: string): ValidationRule<RegExp> | undefined => {
    return pattern && message
      ? { value: new RegExp(pattern), message }
      : undefined;
  };

const GeneratedForm: React.FC<{ schema: FormSchema }> = ({ schema }) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Data",data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="p-4 rounded-lg shadow-md  bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-bold">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label className="mb-1 font-medium">{field.label}</label>
            {field.type === "text" || field.type === "email" ? (
              <input
                {...register(field.id, {
                  required: field.required,
                  pattern: getValidation(field.validation?.pattern, field.validation?.message),
                })}
                placeholder={field.placeholder}
                type={field.type}
                value={field.value}
                className="p-2 border rounded dark:text-black"
              />
            ) : field.type === "select" ? (
              <select
                {...register(field.id, { required: field.required })}
                className="p-2 border rounded  dark:text-black"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                {...register(field.id, { required: field.required })}
                placeholder={field.placeholder}
                className="p-2 border rounded  dark:text-black"
                value={field.value}
              />
            ) : null}
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{(errors[field.id]?.message as string) || "This field is required"}</p>
            )}
          </div>
        ))}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded  dark:bg-yellow-500 dark:text-black">Submit</button>
      </form>
    </div>
  );
};

export default GeneratedForm;
