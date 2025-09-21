# Rebis Header Card – Quickstart

Die Card zeigt einen persönlichen Begrüßungs-Header mit Emoji, Standort (inkl. Kurzform „Stadt, Land“), Datum/Uhrzeit sowie optional Wetter/Warnungen. Texte können über YAML/Inline-Daten personalisiert werden (inkl. `{{oneOf:…}}` & Platzhaltern).
---
## Voraussetzungen
Für minütliche Aktualisierung den `sensor.time` aktivieren:

```yaml
# configuration.yaml
sensor:
  - platform: time_date
    display_options: [time]
```
oder über UI:
Einstellungen → Geräte & Dienste → Integrationen → + → Zeit & Datum


## Platzhalter & Syntax
- **Platzhalter:**
`{{name}}`, `{{nick}}`, `{{user}}`, `{{city}}`, `{{country}}`, `{{emoji}}`, `{{temp}}`, `{{alerts}}`

- **Zufallsauswahl:**
`{{oneOf:Hallo|Hey|name|nick|emoji}}` wählt deterministisch (zeitbasiertes Seed) eine Option.

- **Owner-Key:**
Keys unter `personal` sind *case-insensitive* (am besten lowercase).
`owner` in der Card bestimmt, welches Profil gezogen wird.

## Verwendung in Lovelace
1) **Minimal** (lädt Default-Datei `/config/rebis-cards/greetings.yaml`)
   ```yaml
   type: custom:rebis-header-card
   owner: Rebecca
    ```

2) **Externe Datei explizit angeben**
```yaml
   type: custom:rebis-header-card
   owner: Rebecca
   data: /config/rebis-cards/greetings.yaml   # alternativ: data_url:
```
Hinweis: `/config` wird automatisch zu `/local` gemappt; `/hacsfiles` wird ebenfalls erkannt.

3) **Daten inline statt Datei**
```yaml
type: custom:rebis-header-card
owner: Rebecca
data:
  settings:
    useBuiltIns: true
  common:
    greets:
      morning:
        - "{{oneOf:Guten Morgen|Hejho}} {{oneOf:name|nick}} {{emoji}}"
  personal:
    rebecca:
      name: "Rebecca"
      nicknames: ["Rebi","Aurora"]
      emojis: ["💜","🌈","🎮"]
      location_entity: device_tracker.rebi_mobile
      geolocation_entity: sensor.rebi_geocoded_location
      weather_entity: weather.home
      weather_alarm_entity: binary_sensor.meteo_alert_home
      greets:
        evening:
          - "Stream-Time, {{nick}} {{emoji}}"
      mottos: ...
```

Beispiel: **[examples/greetings.yaml](examples/greetings.yaml)**
(Alternativ denselben Inhalt direkt als `data:` in der Karte verwenden.)


## Card-Optionen (Props)
| Option | Typ | Pflicht | Beschreibung |
| :------------------- | :---------- | :----------: |  :---------- |
| `owner` | `string` | ✓ | Owner-Profil (matcht `personal.<key>`; case-insensitive). |
| `owner_key` | `string` |  | Überschreibt den Match-Key (falls abweichend von `owner`). |
| `home_title` | `string` |  | Titel im Subheader; ansonsten aus Profil (`personal.*.home_title`). |
| `location_entity` | `string` (state: `home`/`not_home`/Zone) |  | Standortquelle; ansonsten aus Profil. |
| `address_entity` | `string` (Zeilen/CSV-Adresse) |  | Quelle für Kurzadresse „Stadt, Land“. |
| `weather` | `{ temp, alerts_count, alerts_info }` |  | Direkte Sensoren; alternativ `weather_entity` + `weather_alarm_entity` im Profil. |
| `data` | `string` oder Objekt |  | Pfad zu YAML/JSON oder Inline-Daten (gleiches Schema wie `greetings.yaml`). |
| `data_url` | `string` |  | Alias zu `data` für externe URL/Pfad. |

## Data-Schema (Props)
| Key | Typ | Beschreibung |
| :------------------- | :---------- |  :---------- |
| `settings` | `object` | Globale Einstellungen für die Card. |
| `common` | `object` | Gemeinsame Daten für alle Benutzer. |
| `personal` | `object` | Benutzerdefinierte Daten für jeden Benutzer. |

### settings
| Key | Typ | Beschreibung |
| :------------------- | :---------- |  :---------- |
| `useBuiltIns` | `boolean` | Aktiviert die Verwendung von integrierten Standardwerten. |
| `weekdays` | `array` | Liste der Wochentage für die Verwendung in der Card. Beginnt bei 0 (Sonntag). |
| `addressFormat` | `string` | In Planung. **_(WIP 🚧)_** |

### common
| Key | Typ | Beschreibung |
| :------------------- | :---------- |  :---------- |
| `emojis` | `array` | Liste von Emojis für die Verwendung in der Card. |
| `greets` | `object` | Begrüßungen für verschiedene Tageszeiten (`morning`, `afternoon`, `evening`, `night`). |
| `mottos` | `object` | Mottos für verschiedene Tageszeiten (`morning`, `afternoon`, `evening`, `night`). |

### personal
Nutzerspezifische Daten. Key ist case-insensitive (am besten lowercase). 
| Key | Typ | Beschreibung |
| :------------------- | :---------- |  :---------- |
| `person_entity` | `string` | Entity-ID für die Person (z. B. `person.*`) **_(WIP 🚧)_**. |
| `person_tags` | `array` | Liste von Tags für die Person **_(WIP 🚧)_**. |
| `useBuiltIns` | `boolean` | Überschreibt `settings.useBuiltIns` für diese Person. **_(WIP 🚧)_** |
| `useCommon` | `boolean` | Ignoriert `common`-Daten für diese Person. **_(WIP 🚧)_** |
| `name` | `string` | Vollständiger Name / Vorname oder anderer Name der Person. |
| `nicknames` | `array` | Liste von Spitznamen/Namen für die Person. |
| `home_title` | `string` | Titel im Subheader (z. B. „Name-Zuhause“, „Daheim“). |
| `emojis` | `array` | Liste von Emojis, die für diese Person verwendet werden können. |
| `location_entity` | `string` | Entity-ID für den Standort (z. B. `device_tracker.*`). |
| `geolocation_entity` | `string` | Entity-ID, die einen Adress-String liefert (z. B. `sensor.*_geocoded_location`). |
| `weather_entity` | `string` | Entity-ID für die Wetterquelle (z. B. `weather.*`). |
| `weather_alarm_entity` | `string` | Entity-ID für Wetterwarnungen (z. B. `sensor.*_alert`). |
| `greets` | `object` | Begrüßungen für verschiedene Tageszeiten (`morning`, `afternoon`, `evening`, `night`). |
| `mottos` | `object` | Mottos für verschiedene Tageszeiten (`morning`, `afternoon`, `evening`, `night`). |


> Die Card konsolidiert Daten so: **Inline data** → `data_url`/Datei → Built-ins (Fallback).
> Emojis kommen aus `common.emojis` + `personal.*.emojis` + Fallback-Emoji-Set.

## Tipps & Troubleshooting
- Kein Ort? `geolocation_entity` muss einen Adress-String liefern (z. B. iOS *Geocoded Location*).
- Keine Minute-Updates? `sensor.time` prüfen; die Card nutzt ihn als „Tick“.
- Ressourcen neu laden: *Einstellungen → Dashboards → Ressourcen „Neu laden“* + Browser-Cache leeren.

## Infos
- Einstellungen mit **_(WIP 🚧)_** sind in Arbeit und noch nicht implementiert.
- Feel free to open *issues/PRs* für *Fragen, Korrekturen, Feedback & Wünsche*.
- Die Idee stammt daher das die Standard-Header-Card (markdown) zu unflexibel war und weil ich sie in meinen Dashboards mehrmals brauchte, wollte ich eine wiederverwendbare Komponente bauen. (1 Home Assistant, 2 Freunde, 3 Wohnungen (als Etagen), 4 Meerschweinchen, 5 Hunde, 6 Kaninchen, 7 Fische, 8 Katzen, 9 Leben ... ok ok bis zu den Meeris stimmt das so ungefähr. Aber ich schweife ab.)

