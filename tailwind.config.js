// tailwind.config.js (Utilisation de la syntaxe de module ES)

// Ancienne ligne : module.exports = {
export default { // Nouvelle ligne : export default
  // 1. Activer la stratégie 'class' pour le mode sombre
  darkMode: 'class', 
  content: [
    // ... vos chemins de fichiers
  ],
  theme: {
    extend: {
      // ... vos extensions de thème
    },
  },
  plugins: [
    // ... vos plugins
  ],
}