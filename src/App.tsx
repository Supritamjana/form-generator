import React, { useState } from "react";
import {JsonEditor} from "./components/JsonEditor";
import GeneratedForm from "./components/GeneratedForm";
import { defaultSchema } from "./utils/constants";
import { DarkModeToggle } from "./components/DarkModeToggle";

const App: React.FC = () => {
  const [schema, setSchema] = useState(defaultSchema);
  
  const handleJsonChange = (newJson: any) => {
    try {
      // Safely update the schema
      setSchema(newJson);
    } catch (err) {
      console.error("Invalid JSON", err);
    }
  };

  return (
    <>
      <header className="w-full h-16 p-4 pr-14 border-b flex justify-between bg-blue-600 dark:bg-blue-900 dark:text-gray-100 shadow-2xl">
        <h2 className="text-xl font-semibold">Dynamic Form Generator</h2>
        <DarkModeToggle />
      </header>
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold">JSON Editor</h2>
          <JsonEditor value={schema} onChange={handleJsonChange} />
        </div>
        <div className="w-full md:w-1/2">
          <GeneratedForm schema={schema} />
        </div>
      </div>
    </>
  );
};

export default App;
