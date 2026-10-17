import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import translations from "../i18n/translations";

export const AppContext = createContext(null);

const getInitialLang = () => {
  if (typeof window === "undefined") return "fr";
  const saved = window.localStorage.getItem("ptm-lang");
  if (saved === "fr" || saved === "en") return saved;
  return (navigator.language || "fr").toLowerCase().startsWith("en") ? "en" : "fr";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("ptm-theme");
  if (saved === "light" || saved === "dark") return saved;
  const host = document.documentElement.getAttribute("data-theme");
  if (host === "light" || host === "dark") return host;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteTour, setQuoteTour] = useState(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { window.localStorage.setItem("ptm-lang", lang); } catch (e) { /* ignore */ }
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try { window.localStorage.setItem("ptm-theme", theme); } catch (e) { /* ignore */ }
  }, [theme]);

  const t = useMemo(() => translations[lang], [lang]);

  const toggleTheme = useCallback(() => setTheme((v) => (v === "dark" ? "light" : "dark")), []);
  const toggleLang = useCallback(() => setLang((v) => (v === "fr" ? "en" : "fr")), []);

  const openQuote = useCallback((tour = null, people = null, date = null) => {
    setQuoteTour(tour ? { ...tour, people, date } : null);
    setQuoteOpen(true);
  }, []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, theme, toggleTheme, t, quoteOpen, quoteTour, openQuote, closeQuote }),
    [lang, toggleLang, theme, toggleTheme, t, quoteOpen, quoteTour, openQuote, closeQuote]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
