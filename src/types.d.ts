export interface HassStateObj { state: string; attributes?: Record<string, any>; }
export interface HomeAssistant {
  user?: { name?: string };
  states: Record<string, HassStateObj>;
}
export interface HeaderCardConfig {
  owner: string;
  home_title: string;
  location_entity?: string;
  address_entity?: string;
  weather?: {
    temp?: string;
    alerts_count?: string;
    alerts_info?: string;
  };
}
