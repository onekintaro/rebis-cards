# Rebis Header Card – Quickstart

The card shows a personal greeting header with emoji, location (incl. short form "City, Country"), date/time, and optional weather/alerts. Texts can be personalized via YAML/inline data (including `{{oneOf:…}}` and placeholders).

---

## Prerequisites
To update every minute, enable the `sensor.time`:

```yaml
# configuration.yaml
sensor:
  - platform: time_date
    display_options: [time]
```
Or via UI:
Settings → Devices & Services → Integrations → + → Time & Date


## Placeholders & Syntax
- Placeholders:
`{{name}}`, `{{nick}}`, `{{user}}`, `{{city}}`, `{{country}}`, `{{emoji}}`, `{{temp}}`, `{{alerts}}`

- Random selection:
`{{oneOf:Hello|Hey|name|nick|emoji}}` deterministically (time-seeded) picks one option.

- Owner key:
Keys under `personal` are case-insensitive (lowercase recommended).
`owner` in the card determines which profile is used.

## Use in Lovelace
1) Minimal (loads the default file `/config/rebis-cards/greetings.yaml`)
```yaml
type: custom:rebis-header-card
owner: Rebecca
```

2) Reference an external file explicitly
```yaml
type: custom:rebis-header-card
owner: Rebecca
data: /config/rebis-cards/greetings.yaml   # alternatively: data_url:
```
Note: `/config` is automatically mapped to `/local`; `/hacsfiles` is also recognized.

3) Inline data instead of a file
```yaml
type: custom:rebis-header-card
owner: Rebecca
data:
  settings:
    useBuiltIns: true
  common:
    greets:
      morning:
        - "{{oneOf:Good morning|Heyho}} {{oneOf:name|nick}} {{emoji}}"
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
          - "Stream time, {{nick}} {{emoji}}"
      mottos: ...
```

Example: **[examples/greetings.yaml](examples/greetings.yaml)**
(Alternatively, use the same content directly under `data:` in the card.)


## Card options (props)
| Option | Type | Required | Description |
| :------------------- | :---------- | :----------: | :---------- |
| `owner` | `string` | ✓ | Owner profile (matches `personal.<key>`; case-insensitive). |
| `owner_key` | `string` |  | Overrides the match key (if different from `owner`). |
| `home_title` | `string` |  | Title in the subheader; otherwise from profile (`personal.*.home_title`). |
| `location_entity` | `string` (state: `home`/`not_home`/zone) |  | Location source; otherwise from profile. |
| `address_entity` | `string` (lines/CSV address) |  | Source for the short address "City, Country". |
| `weather` | `{ temp, alerts_count, alerts_info }` |  | Direct sensors; alternatively `weather_entity` + `weather_alarm_entity` in the profile. |
| `data` | `string` or object |  | Path to YAML/JSON or inline data (same schema as `greetings.yaml`). |
| `data_url` | `string` |  | Alias for `data` for an external URL/path. |

## Data schema (props)
| Key | Type | Description |
| :------------------- | :---------- | :---------- |
| `settings` | `object` | Global settings for the card. |
| `common` | `object` | Shared data for all users. |
| `personal` | `object` | User-specific data for each user. |

### settings
| Key | Type | Description |
| :------------------- | :---------- | :---------- |
| `useBuiltIns` | `boolean` | Enables the use of built-in defaults. |
| `weekdays` | `array` | List of weekdays used by the card. Starts at 0 (Sunday). |
| `addressFormat` | `string` | Planned. (WIP 🚧) |

### common
| Key | Type | Description |
| :------------------- | :---------- | :---------- |
| `emojis` | `array` | List of emojis to use in the card. |
| `greets` | `object` | Greetings for different times of day (`morning`, `afternoon`, `evening`, `night`). |
| `mottos` | `object` | Mottos for different times of day (`morning`, `afternoon`, `evening`, `night`). |

### personal
User-specific data. Key is case-insensitive (lowercase recommended).
| Key | Type | Description |
| :------------------- | :---------- | :---------- |
| `person_entity` | `string` | Entity ID for the person (e.g., `person.*`) (WIP 🚧). |
| `person_tags` | `array` | List of tags for the person (WIP 🚧). |
| `useBuiltIns` | `boolean` | Overrides `settings.useBuiltIns` for this person. (WIP 🚧) |
| `useCommon` | `boolean` | Ignores `common` data for this person. (WIP 🚧) |
| `name` | `string` | Full name/first name or other name of the person. |
| `nicknames` | `array` | List of nicknames/names for the person. |
| `home_title` | `string` | Title in the subheader (e.g., "Name Home", "At Home"). |
| `emojis` | `array` | List of emojis that can be used for this person. |
| `location_entity` | `string` | Entity ID for the location (e.g., `device_tracker.*`). |
| `geolocation_entity` | `string` | Entity ID that provides an address string (e.g., `sensor.*_geocoded_location`). |
| `weather_entity` | `string` | Entity ID for the weather source (e.g., `weather.*`). |
| `weather_alarm_entity` | `string` | Entity ID for weather alerts (e.g., `sensor.*_alert`). |
| `greets` | `object` | Greetings for different times of day (`morning`, `afternoon`, `evening`, `night`). |
| `mottos` | `object` | Mottos for different times of day (`morning`, `afternoon`, `evening`, `night`). |


> The card consolidates data like this: **Inline data** → `data_url`/file → built-ins (fallback).
> Emojis come from `common.emojis` + `personal.*.emojis` + a fallback emoji set.

## Tips & troubleshooting
- No location? `geolocation_entity` must provide an address string (e.g., iOS Geocoded Location).
- No minute updates? Check `sensor.time`; the card uses it as a "tick".
- Reload resources: Settings → Dashboards → Resources "Reload" + clear the browser cache.

## Info
- Settings marked (WIP 🚧) are in progress and not implemented yet.
- Feel free to open issues/PRs for questions, corrections, feedback & feature requests.
- The idea came from the fact that the standard header card (markdown) was too inflexible, and because I needed it multiple times in my dashboards, I wanted a reusable component. (1 Home Assistant, 2 friends, 3 apartments (as floors), 4 guinea pigs, 5 dogs, 6 rabbits, 7 fish, 8 cats, 9 lives ... okay okay, up to the piggies that's roughly true. But I digress.)

