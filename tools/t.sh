#!/bin/sh
# Résumé des tests : erreurs hors "analogue inconnu", puis compteurs.
node --test 2>&1 | grep -E "✖|Error|^\+|^ℹ (tests|pass|fail)|^\s+[+-] " | grep -vE "analogue inconnu|at |test failed" | head -${1:-40}
node --test 2>&1 | grep -c "analogue inconnu" 
