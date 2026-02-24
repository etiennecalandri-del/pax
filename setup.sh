#!/usr/bin/env bash
# FlightRight Simulator — Script d'installation automatique
set -e

echo "=== FlightRight Simulator - Installation ==="
echo ""

# 1. Vérifier Node.js
if command -v node &>/dev/null; then
  echo "✓ Node.js trouvé : $(node --version)"
else
  echo "Node.js non trouvé. Installation via Homebrew..."
  if ! command -v brew &>/dev/null; then
    echo "Installation de Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # Add Homebrew to PATH for Apple Silicon
    if [[ -d "/opt/homebrew/bin" ]]; then
      export PATH="/opt/homebrew/bin:$PATH"
    fi
  fi
  brew install node
  echo "✓ Node.js installé : $(node --version)"
fi

# 2. Installer les dépendances
echo ""
echo "Installation des dépendances npm..."
cd "$(dirname "$0")"
npm install

echo ""
echo "✅ Installation terminée !"
echo ""
echo "Pour démarrer l'application :"
echo "  npm start"
echo ""
echo "Puis ouvrez dans votre navigateur :"
echo "  http://localhost:3000        (Simulateur)"
echo "  http://localhost:3000/admin  (Tableau de bord)"
