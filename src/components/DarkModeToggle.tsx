import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleDarkMode = (checked: boolean) => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(checked);
  };

  useEffect(() => {
    // Apply saved theme on load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <DarkModeSwitch
    style={{ marginBottom: '2rem' }}
    checked={isDark}
    onChange={toggleDarkMode}
    size={30}
  />
  );
};
