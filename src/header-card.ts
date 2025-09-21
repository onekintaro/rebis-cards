import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { parse as parseYAML } from "yaml";
import type { HomeAssistant, HeaderCardConfig, GreetingsData } from "./types";

class RebisHeaderCard extends LitElement {
    static properties = {
        hass: { attribute: false },
        _config: { attribute: false }
    };

    declare hass: HomeAssistant;
    private _config!: HeaderCardConfig;
    private _data?: GreetingsData;

    static styles = css`
    ha-card { padding: 12px 16px; border-radius: 14px; }
    h1 { margin: 0; line-height: 1.15; font-weight: 800; }
    h2 { margin: .2rem 0 0; line-height: 1.2; font-weight: 800; font-style: italic; }
    .login { margin: .05rem 0 .35rem; opacity: .9; }
    p { margin: .18rem 0; }
    em { opacity: .95; }
  `;

    async firstUpdated() {
        await this._maybeLoadData();
    }

    async updated(changed: Map<string, unknown>) {
        if (changed.has("_config")) await this._maybeLoadData();
    }

    private async _maybeLoadData() {
        const cfg = this._config;
        if (!cfg) return;

        // 1) data hat Vorrang
        if (Object.prototype.hasOwnProperty.call(cfg, "data") && cfg.data != null) {
            const d = cfg.data as any;
            if (typeof d === "string") {
                // data ist ein Pfad → laden
                await this._fetchAndSet(d);
            } else {
                // data ist direkt das Objekt im gleichen Schema wie YAML
                this._data = d as GreetingsData;
                this.requestUpdate();
            }
            return;
        }

        // 2) Fallback: data_url ODER Default
        const raw = cfg.data_url || "/config/rebis-cards/greetings.yaml";
        await this._fetchAndSet(raw);
    }

    private async _fetchAndSet(raw: string) {
        const primary = this._resolve(raw);

        // Kandidaten: /local <-> /hacsfiles durchprobieren
        const candidates = [primary];
        if (primary.startsWith("/local/")) {
            candidates.push(primary.replace("/local/", "/hacsfiles/"));
        } else if (primary.startsWith("/hacsfiles/")) {
            candidates.push(primary.replace("/hacsfiles/", "/local/"));
        }

        for (const url of candidates) {
            try {
                const res = await fetch(url, { cache: "no-store" });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const txt = await res.text();
                this._data = url.match(/\.(yml|yaml)(\?|$)/i) ? parseYAML(txt) : JSON.parse(txt);
                console.info("[rebis-header-card] data loaded:", url);
                this.requestUpdate();
                return;
            } catch (e) {
                console.warn("[rebis-header-card] data try failed:", url, e);
            }
        }

        console.warn("[rebis-header-card] data load failed on all candidates – using built-ins");
        this._data = undefined;
    }

    private _resolve(u: string) {
        let url = (u || "").trim();
        if (url.startsWith("@config/")) url = "/local/" + url.slice(8);
        if (url.startsWith("@hacs/")) url = "/hacsfiles/" + url.slice(6);
        if (url.startsWith("/config/")) url = "/local/" + url.slice(8);
        if (!url.includes("?")) url += `?v=${Date.now()}`;
        return url;
    }


    setConfig(cfg: HeaderCardConfig) {
        if (!cfg?.owner) {
            throw new Error("rebis-header-card: 'owner' ist Pflicht.");
        }
        this._config = cfg;
        this._data = undefined;              // sicherheitshalber reset bei neuer Config
    }

    getCardSize() { return 3; }

    // ---- Utils ----
    private dayOfYear(d: Date) {
        const s = new Date(d.getFullYear(), 0, 0);
        return Math.floor((d.getTime() - s.getTime() + ((s.getTimezoneOffset() - d.getTimezoneOffset()) * 60000)) / 86400000);
    }
    private weekdays(): string[] {
        const wd = this._data?.settings?.weekdays;
        if (Array.isArray(wd) && wd.length === 7) return wd as string[];
        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    }

    private bucket(h: number) { return h < 5 ? "night" : (h < 12 ? "morning" : (h < 18 ? "day" : "evening")); }

    private addrShort(locRaw?: string) {
        if (!locRaw || locRaw === "unknown" || locRaw === "unavailable") return "";
        const lines = String(locRaw).split("\n");
        let city = "", country = "";
        if (locRaw.includes(",") && lines.length === 1) {
            const parts = locRaw.split(",").map(s => s.trim());
            city = (parts.at(-2) || "").replace(/^\d+\s*/, "").trim();
            country = (parts.at(-1) || "").replace(/\.$/, "").trim();
        } else {
            const cityLine = (lines.at(-2) || "").trim();
            city = cityLine.replace(/^\d+\s*/, "").trim();
            country = (lines.at(-1) || "").replace(/\.$/, "").trim();
        }
        return city && country ? `${city}, ${country}` : "";
    }

    private resolvePersonal(owner: string) {
        const key = (this._config.owner_key || owner).toLowerCase();
        const p = this._data?.personal?.[key];
        const ownerName = p?.name || owner;
        const nicknames = (p?.nicknames || []).filter(Boolean);
        const emojis = [
            ...(this._data?.common?.emojis || []),
            ...(p?.emojis || []),
            "✨", "🌟", "💜", "🚀", "🦔", "🎮", "☕", "🌈", "🧃", "🍇", "🍀" // Fallbacks
        ];
        const homeTitle = this._config.home_title ?? p?.home_title ?? "Home";
        const locationEntity = this._config.location_entity ?? p?.location_entity;
        const addressEntity = this._config.address_entity ?? p?.geolocation_entity;
        // Weather aus Card-Props ODER Profil
        let weather = this._config.weather;
        if (!weather && p?.weather_entity && typeof p.weather_entity === "string") {
            // wir ziehen später temperature aus attributes
            weather = {};
        } else if (!weather && typeof p?.weather_entity === "object") {
            weather = p.weather_entity as any;
        }
        const weatherAlarm = p?.weather_alarm_entity;

        return { key, ownerName, nicknames, emojis, homeTitle, locationEntity, addressEntity, weather, weatherAlarm, rawWeatherEntity: p?.weather_entity };
    }

    private applyOneOf(s: string, seed: number, ctx: Record<string, string>) {
        return s.replace(/\{\{\s*oneOf:([^}]+)\}\}/gi, (_m, inner) => {
            const opts = String(inner)
                .split("|")
                .map(x => x.trim())
                .filter(Boolean)
                .map(o => {
                    // Tokens erlauben
                    if (["name", "nick", "user", "city", "country", "emoji"].includes(o)) return ctx[o] ?? "";
                    return o;
                });
            if (!opts.length) return "";
            const i = ((seed % opts.length) + opts.length) % opts.length;
            return opts[i];
        });
    }

    private parseAddress(locRaw?: string): { city: string; country: string } {
        let city = "", country = "";
        if (!locRaw || locRaw === "unknown" || locRaw === "unavailable") return { city, country };

        const text = String(locRaw);
        const lines = text.split("\n");

        if (text.includes(",") && lines.length === 1) {
            const parts = text.split(",").map(s => s.trim());
            city = (parts.at(-2) || "").replace(/^\d+\s*/, "").trim();
            country = (parts.at(-1) || "").replace(/\.$/, "").trim();
        } else {
            const cityLine = (lines.at(-2) || "").trim();
            city = cityLine.replace(/^\d+\s*/, "").trim();
            country = (lines.at(-1) || "").replace(/\.$/, "").trim();
        }
        return { city, country };
    }

    private applyPlaceholders(s: string, ctx: Record<string, string>) {
        return s.replace(/\{\{\s*(name|nick|user|city|country|emoji)\s*\}\}/g, (_m, k) => ctx[k] ?? "");
    }


    private pick<T>(arr: T[], seed: number) {
        if (!arr || !arr.length) return "" as unknown as T;
        const i = ((seed % arr.length) + arr.length) % arr.length;
        return arr[i];
    }

    private listsFor(owner: string) {
        // Built-ins
        const builtins = {
            greets: {
                morning: ["Guten Morgen", "Sali zäme", "Hello Sunshine", "Hejho", "Rise & Shine", "Moin Moin"],
                day: ["Hallo", "Hey", "Hoi", "Servus", "Yo", "Hallöchen", "Grüezi"],
                evening: ["Guten Abend", "N’Abend", "Hiya", "Yo", "Bonsoir", "Abend zusammen"],
                night: ["Noch wach?", "Spätschicht!", "Night Owl Mode", "Nachtgruss", "Moonlight mode", "Bett ruft"],
            },
            mottos: {
                morning: ["Neuer Tag, neues Quest!", "Deep Work an – Störer aus.", "Stretch & breathe 🧘", "Hydrate first 💧"],
                day: ["You got this!", "Commit, push, deploy 🚀", "5-Minuten-Tidy lohnt sich", "Snack & Fokus – nice"],
                evening: ["Cool down & Review?", "Save & Commit – dann chillen.", "Golden Hour ✨", "Plan für morgen (2 Bullets)"],
                night: ["Backup läuft? Dann Bett 😴", "Tomorrow-You dankt dir.", "Schlaf = Upgrade", "Wasser ans Bett 💧"],
            },
        };

        type Bucket = "morning" | "day" | "evening" | "night";
        const buckets: Bucket[] = ["morning", "day", "evening", "night"];

        // Kein externes File? → Built-ins
        if (!this._data) return builtins;

        const useBuiltIns = this._data.settings?.useBuiltIns !== false; // default = true
        const low = (this._config.owner_key || owner).toLowerCase();

        const commonGreets = this._data.common?.greets ?? {};
        const commonMottos = this._data.common?.mottos ?? {};
        const personalGreets = this._data.personal?.[low]?.greets ?? {};
        const personalMottos = this._data.personal?.[low]?.mottos ?? {};

        const mergeBucket = (a: Record<string, string[]>, b: Record<string, string[]>) =>
            Object.fromEntries(buckets.map(k => [k, [...(a[k] ?? []), ...(b[k] ?? [])]])) as Record<Bucket, string[]>;

        // Daten aus Datei: common + personal
        const fileGreets = mergeBucket(commonGreets, personalGreets);
        const fileMottos = mergeBucket(commonMottos, personalMottos);

        // Fallback, falls Datei etwas leer lässt
        const ensureBuckets = (src: Record<Bucket, string[]>, fallback: Record<Bucket, string[]>) =>
            Object.fromEntries(buckets.map(k => [k, (src[k]?.length ? src[k] : fallback[k])])) as Record<Bucket, string[]>;

        if (useBuiltIns) {
            // Built-ins + Datei
            const mergedGreets = Object.fromEntries(
                buckets.map(k => [k, [...builtins.greets[k], ...fileGreets[k]]])
            ) as Record<Bucket, string[]>;
            const mergedMottos = Object.fromEntries(
                buckets.map(k => [k, [...builtins.mottos[k], ...fileMottos[k]]])
            ) as Record<Bucket, string[]>;
            return { greets: mergedGreets, mottos: mergedMottos };
        } else {
            // Nur Datei – aber wenn ein Bucket leer ist, nimm Built-in als Fallback
            const onlyGreets = ensureBuckets(fileGreets, builtins.greets);
            const onlyMottos = ensureBuckets(fileMottos, builtins.mottos);
            return { greets: onlyGreets, mottos: onlyMottos };
        }
    }

    render() {
        const c = this._config;
        const hass = this.hass;
        const now = new Date();
        const doy = this.dayOfYear(now);
        const h = now.getHours();
        const bucket = this.bucket(h);
        const t = hass.states?.["sensor.time"]?.state || "00:00";
        const m = parseInt((t.split(":")[1] || "0"), 10);
        const seed = (doy * 31 + h * 17 + m * 7);

        const currentUser = hass.user?.name || "User";

        // ↓↓↓ Profil & Settings aus YAML
        const prof = this.resolvePersonal(c.owner);
        const locationEntity = prof.locationEntity;
        const addressEntity = prof.addressEntity || c.address_entity;
        const homeTitle = prof.homeTitle;

        // Entities lesen
        const locState = locationEntity ? hass.states?.[locationEntity]?.state : undefined;
        const addr = addressEntity ? hass.states?.[addressEntity]?.state : undefined;
        const addrShort = this.addrShort(addr);
        const { city, country } = this.parseAddress(addr);

        // Wetter: entweder sensors aus c.weather ODER weather_entity-Attribute
        let wTemp = "", wCount = 0, wInfo = "";
        if (c.weather?.temp) {
            wTemp = hass.states?.[c.weather.temp]?.state || "";
            if (c.weather.alerts_count) wCount = parseInt(hass.states?.[c.weather.alerts_count]?.state || "0", 10);
            if (c.weather.alerts_info) wInfo = hass.states?.[c.weather.alerts_info]?.state || "";
        } else if (typeof prof.rawWeatherEntity === "string") {
            const w = hass.states?.[prof.rawWeatherEntity];
            if (w?.attributes?.temperature != null) wTemp = String(w.attributes.temperature);
            // Alerts via weather_alarm_entity (binary_sensor)
            if (prof.weatherAlarm) {
                const wal = hass.states?.[prof.weatherAlarm];
                if (wal?.state === "on") { wCount = 1; wInfo = wal.attributes?.friendly_name || "Wetterwarnung"; }
            }
        }

        const { greets, mottos } = this.listsFor(c.owner);
        const greetRaw = this.pick(greets[bucket], seed);
        const mottoRaw = this.pick(mottos[bucket], (doy + h) * 3 + m);

        const nick = prof.nicknames.length ? this.pick(prof.nicknames, seed * 11 + 3) : prof.ownerName;

        // Emojis: common+personal+fallback
        const emojiTpl = this.pick(prof.emojis, seed * 9 + 2);
        const emojiA = this.pick(prof.emojis, seed * 5 + 1);
        const emojiB = this.pick(prof.emojis, seed * 7 + 3);

        const ctx = { name: prof.ownerName, nick, user: currentUser, city, country, emoji: emojiTpl };
        const greet = this.applyPlaceholders(this.applyOneOf(greetRaw, seed, ctx), ctx);
        const motto = this.applyPlaceholders(this.applyOneOf(mottoRaw, (doy + h) * 13 + m, ctx), ctx);

        let locFriendly = "";
        if (locState === "home") locFriendly = "Willkommen <b>Zuhause</b>";
        else if (locState === "not_home") locFriendly = "Gerade <b>Unterwegs</b>?";
        else if (typeof locState === "string" && locState) locFriendly = `Aktuell in <b>${city}, ${country}</b>`;

        const isOwner = currentUser.toLowerCase() === c.owner.toLowerCase();
        const lineDashboard = isOwner ? `Dein Zuhause: ${homeTitle}` : `Zu Gast bei <b>${prof.ownerName}</b> – ${homeTitle}`;
        const lineLogin = `Eingeloggt als: <b>${currentUser}</b>`;

        const weekday = this.weekdays()[now.getDay()];
        const dateStr = now.toLocaleDateString("de-CH");
        const timeStr = now.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" });

        return html`
    <ha-card>
      <h1>${greet} ${emojiA}</h1>
      <h2>${unsafeHTML(lineDashboard)}</h2>
      <div class="login">${unsafeHTML(lineLogin)}</div>

      <p>${unsafeHTML(locFriendly)}${addrShort ? html` · 📍 ${addrShort}` : ""} ${emojiB}</p>
      <p><em>${motto}</em></p>
      <p><strong>Heute:</strong> ${weekday}, ${dateStr} – ${timeStr}.
      ${wTemp || wCount ? html`<br><strong>Wetter:</strong> ${wTemp ? `${wTemp}°C` : ""}${wCount > 0 && wInfo ? ` · ⚠️ ${wInfo}` : ""}` : ""}</p>
    </ha-card>
  `;
    }
}

if (!customElements.get("rebis-header-card")) {
    customElements.define("rebis-header-card", RebisHeaderCard);
    // Für die Kartenliste
    (window as any).customCards = (window as any).customCards || [];
    (window as any).customCards.push({
        type: "rebis-header-card",
        name: "Rebis Header Card",
        description: "Header mit Gruss, Standort & Wetter",
        preview: true
    });
}
