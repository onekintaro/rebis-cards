# rebis-cards
Rebis HA Cards

## Installation (HACS – Custom Repository)
1. HACS → Drei Punkte → **Custom repositories**.
2. Repo-URL eintragen: `https://github.com/<DEIN-USER>/rebis-cards`
3. Typ: **Dashboard** auswählen und **ADD**.  
4. Dann in HACS → Frontend → **Rebis Cards** installieren.
5. (HACS legt die Ressource normalerweise selbst an. Falls nicht:)
   Einstellungen → Dashboards → Ressourcen → Hinzufügen  
   **URL:** `/hacsfiles/rebis-cards/rebis-cards.js` · **Typ:** *JavaScript-Modul*. :contentReference[oaicite:6]{index=6}

## Manuell
1. dist/rebis-cards.js nach /config/www/ kopieren.
2. In Einstellungen → Dashboards → Ressourcen:
   - URL: /local/rebis-cards.js
   - Typ: JavaScript Module

### Verwendung

### Header-Card: docs/de/header-card.md

Weitere Karten in Arbeit (WIP)
