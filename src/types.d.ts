export interface HassStateObj { state: string; attributes?: Record<string, any>; }
export interface HomeAssistant {
  user?: { name?: string };
  states: Record<string, HassStateObj>;
}

// types.d.ts
export type Bucket = "morning" | "day" | "evening" | "night";

export interface GreetingsData {
  settings?: {
    useBuiltIns?: boolean;          // default true
    weekdays?: string[];            // 7 Einträge, sonst Fallback
    addressFormat?: string;         // reserviert
  };
  common?: {
    emojis?: string[];
    greets?: Record<Bucket, string[]>;
    mottos?: Record<Bucket, string[]>;
  };
  personal?: Record<string, {
    name?: string;
    nicknames?: string[];
    emojis?: string[];
    location_entity?: string;
    geolocation_entity?: string;
    home_title?: string;
    weather_entity?: string | { temp?: string; alerts_count?: string; alerts_info?: string };
    weather_alarm_entity?: string;
    greets?: Record<Bucket, string[]>;
    mottos?: Record<Bucket, string[]>;
  }>;
}

// types.d.ts
export interface HeaderCardConfig {
  owner: string;
  home_title?: string;
  location_entity?: string;
  address_entity?: string;
  weather?: { temp?: string; alerts_count?: string; alerts_info?: string };
  data_url?: string;                    // (bestehend)
  data?: GreetingsData | string;        // << neu: Inline-Objekt ODER Pfad
  owner_key?: string;
}
