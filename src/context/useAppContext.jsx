import { useState, useEffect } from 'react';
import { AppContext } from './appContext';

// Provider du contexte
export function AppProvider({ children }) {
  // Thème (clair/sombre)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // Sauvegarder le thème dans localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Appliquer le thème au body
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Valeurs du contexte
  const value = {
    // Thème
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}