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
  // Initialize to server-safe default, then sync with actual DOM state
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Sync with actual theme from DOM after hydration
  useEffect(() => {
    setMounted(true);
    // Read the actual theme from the document class (set by blocking script)
    const hasLight = document.documentElement.classList.contains('light');
    const hasDark = document.documentElement.classList.contains('dark');
    
    if (hasLight) {
      setTheme('light');
    } else if (hasDark) {
      setTheme('dark');
    } else {
      // Fallback: check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = systemPrefersDark ? 'dark' : 'light';
      setTheme(defaultTheme);
      document.documentElement.classList.add(defaultTheme);
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