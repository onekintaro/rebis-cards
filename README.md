# Rebis Cards

Schlanke, persönliche Lovelace-Karten für Home Assistant (mit Lit/TS gebaut).  
Aktuell: **Rebis Header Card** – dynamischer Begrüßungs-Header mit Standort, Wetter & Platzhaltern.

---

## Installation (HACS – Custom Repository)

1. In **HACS** oben rechts auf **⋮ → Custom repositories**.
2. Repo-URL eintragen:  
   `https://github.com/<DEIN-USER>/rebis-cards`
3. Typ **Dashboard** wählen und **ADD**.
4. Dann in **HACS → Frontend** die **Rebis Cards** installieren.
5. (HACS legt die Ressource i. d. R. automatisch an. Falls nicht:)
   **Einstellungen → Dashboards → Ressourcen → Hinzufügen**  
   **URL:** `/hacsfiles/rebis-cards/rebis-cards.js` · **Typ:** *JavaScript-Modul*

---

## Manuelle Installation

1. `dist/rebis-cards.js` nach `/config/www/` kopieren.  
2. In **Einstellungen → Dashboards → Ressourcen**:
   - **URL:** `/local/rebis-cards.js`  
   - **Typ:** *JavaScript Module*

---

## Verwendung

👉 Details & Beispiele findest du hier:  
**[docs/de/header-card.md](docs/de/header-card.md)**

Weitere Karten: WIP 🚧

---
