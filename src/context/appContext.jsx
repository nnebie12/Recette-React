import { createContext } from 'react';

export const AppContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
});
