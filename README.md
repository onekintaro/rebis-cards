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

### Verwendung
```yaml
type: custom:rebis-header-card
owner: Rebecca
home_title: Rebis Home
location_entity: device_tracker.rebi_mobile
address_entity: sensor.rebi_geocoded_location
weather:
  temp: sensor.wetter_alarm_zurich_stadtkreis_12_zh_weather_temperature
  alerts_count: sensor.wetter_alarm_zurich_stadtkreis_12_zh_meteo_alerts_alarm_count
  alerts_info: sensor.wetter_alarm_zurich_stadtkreis_12_zh_meteo_alerts_info
