// src/contexts/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const saved = localStorage.getItem("ravehouse-theme");
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
      }
    } catch (error) {
      console.warn("Failed to read theme from localStorage:", error);
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    try {
      localStorage.setItem("ravehouse-theme", theme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}