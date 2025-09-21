Rebis Header Card – Quickstart

Voraussetzungen

Für per-Minute-Updates sensor.time aktivieren:

# configuration.yaml
sensor:
  - platform: time_date
    display_options: [time]

Platzhalter & Syntax

Platzhalter: {{name}}, {{nick}}, {{user}}, {{city}}, {{country}}, {{emoji}}, {{temp}}, {{alerts}}

Zufallsauswahl: {{oneOf:Hallo|Hey|name|nick|emoji}}

Owner-Schlüssel unter personal ist case-insensitive (am besten lowercase).

Verwendung in Lovelace
1) Minimal (lädt Default-Datei /config/rebis-cards/greetings.yaml)
type: custom:rebis-header-card
owner: Rebecca

2) Externe Datei explizit angeben
type: custom:rebis-header-card
owner: Rebecca
data: /config/rebis-cards/greetings.yaml   # alternativ: data_url:


Hinweis: /config wird automatisch zu /local gemappt; /hacsfiles wird ebenfalls erkannt.

3) Daten inline statt Datei
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

Beispiel-greetings.yaml (Ablage: /config/rebis-cards/greetings.yaml)
# greetings.yaml – Daten für rebis-header-card
# Alternativ kannst du denselben Inhalt direkt als `data:` in der Karte verwenden.

settings:
  useBuiltIns: true
  weekdays: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]

common:
  emojis: ["✨","🌟","💜","🚀","🦊","🎮","☕","🌈","🧃","🍀","🌙","🎧"]
  greets:
    morning:
      - "{{oneOf:Guten Morgen|Hejho|Morn}} {{oneOf:name|nick}} {{emoji}}"
      - "Rise & Shine, {{oneOf:nick|user}}!"
    day:
      - "{{oneOf:Hallo|Hey|Hoi|Servus}} {{oneOf:name|nick}}"
  mottos:
    evening:
      - "Save & Commit – dann chillen."
      - "Golden Hour ✨"
    night:
      - "Backup läuft? Dann Bett 😴"
      - "Schlaf = Upgrade {{emoji}} {{alerts}}"

personal:
  rebecca:
    name: "Rebecca"
    nicknames: ["Rebi","Aurora","Becca"]
    emojis: ["💜","🌈","🎮"]
    home_title: "Rebis Home"
    location_entity: device_tracker.rebi_mobile
    geolocation_entity: sensor.rebi_geocoded_location
    weather_entity: weather.home
    weather_alarm_entity: binary_sensor.meteo_alert_home
    greets:
      evening:
        - "Stream-Time, {{nick}} {{emoji}}"
    mottos:
      day:
        - "Meeris happy? 🐹"
        - "Commit, push, deploy 🚀"

Tipps & Troubleshooting

Kein Ort? Sorge dafür, dass geolocation_entity ein Address-String liefert (z. B. iOS Geocoded Location).

Keine Minute-Updates? sensor.time prüfen; die Card nutzt ihn als „Tick“.

Caches: HA → Einstellungen → Dashboards → Ressourcen „Neu laden“, plus Browser-Cache leeren, wenn du neue Assets veröffentlichst.

Releases vs. dist/: HACS bevorzugt Releases. dist/ kann in .gitignore bleiben.