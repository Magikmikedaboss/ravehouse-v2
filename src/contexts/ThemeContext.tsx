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
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme immediately on client
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ravehouse-theme");
        const initialTheme = (saved === "dark" || saved === "light") ? saved : "dark";
        // Apply immediately to prevent FOUC
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(initialTheme);
        return initialTheme;
      } catch (error) {
        console.warn("Failed to read theme from localStorage:", error);
        document.documentElement.classList.add("dark");
        return "dark";
      }
    }
    return "dark";
  });
  const [mounted, setMounted] = useState(false);

  // Mark as mounted
  useEffect(() => {
    setMounted(true);
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