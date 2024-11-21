import React, { useState } from "react";

interface JsonEditorProps {
  value: object;
  onChange: (value: object) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(value, null, 2));

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newJson = JSON.parse(event.target.value);
      setJsonText(event.target.value); // Update the JSON text
      onChange(newJson); // Notify parent of the change
    } catch (err) {
      console.error("Invalid JSON", err);
    }
  };

  return (
    <textarea
      value={jsonText}
      onChange={handleChange}
      className="w-full h-full border p-4  bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-green-500"
    />
  );
};
