# Rebis Cards

[Deutsch](#deutsch) | [English](#english)

---

## Deutsch

Schlanke, persönliche Lovelace-Karten für Home Assistant (mit Lit/TS gebaut).  
Aktuell: **Rebis Header Card** – dynamischer Begrüßungs-Header mit Standort, Wetter & Platzhaltern.

---

### Installation (HACS – Custom Repository)

1. In **HACS** oben rechts auf **⋮ → Custom repositories**.
2. Repo-URL eintragen:  
   `https://github.com/onekintaro/rebis-cards`
3. Typ **Dashboard** wählen und **ADD**.
4. Dann in **HACS → Frontend** die **Rebis Cards** installieren.
5. (HACS legt die Ressource i. d. R. automatisch an. Falls nicht:)  
   **Einstellungen → Dashboards → Ressourcen → Hinzufügen**  
   **URL:** `/hacsfiles/rebis-cards/rebis-cards.js` · **Typ:** *JavaScript-Modul*

---

### Manuelle Installation

1. `dist/rebis-cards.js` nach `/config/www/` kopieren.  
2. In **Einstellungen → Dashboards → Ressourcen**:
   - **URL:** `/local/rebis-cards.js`  
   - **Typ:** *JavaScript Module*

---

### Verwendung

👉 Details & Beispiele findest du hier:  
**[docs/de/header-card.md](docs/de/header-card.md)**

Weitere Karten: WIP 🚧

---

## English

Lightweight, personal Lovelace cards for Home Assistant (built with Lit/TS).  
Current: **Rebis Header Card** – dynamic greeting header with location, weather & placeholders.

---

### Installation (HACS – Custom Repository)

1. In **HACS**, click **⋮ → Custom repositories** in the top right.
2. Enter repo URL:  
   `https://github.com/onekintaro/rebis-cards`
3. Choose type **Dashboard** and click **ADD**.
4. Then install **Rebis Cards** under **HACS → Frontend**.
5. (HACS usually adds the resource automatically. If not:)  
   **Settings → Dashboards → Resources → Add**  
   **URL:** `/hacsfiles/rebis-cards/rebis-cards.js` · **Type:** *JavaScript module*

---

### Manual installation

1. Copy `dist/rebis-cards.js` to `/config/www/`.  
2. In **Settings → Dashboards → Resources**:
   - **URL:** `/local/rebis-cards.js`  
   - **Type:** *JavaScript module*

---

### Usage

👉 Find details & examples here:  
**[docs/en/header-card.md](docs/en/header-card.md)**

More cards: WIP 🚧

---
