import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { HomeAssistant, HeaderCardConfig } from "./types";

class RebisHeaderCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { attribute: false }
  };

  declare hass: HomeAssistant;
  private _config!: HeaderCardConfig;

  static styles = css`
    ha-card { padding: 12px 16px; border-radius: 14px; }
    h1 { margin: 0; line-height: 1.15; font-weight: 800; }
    h2 { margin: .2rem 0 0; line-height: 1.2; font-weight: 800; font-style: italic; }
    .login { margin: .05rem 0 .35rem; opacity: .9; }
    p { margin: .18rem 0; }
    em { opacity: .95; }
  `;

  setConfig(cfg: HeaderCardConfig) {
    if (!cfg?.owner || !cfg?.home_title) {
      throw new Error("rebis-header-card: 'owner' und 'home_title' sind Pflicht.");
    }
    this._config = cfg;
  }
  getCardSize() { return 3; }

  // ---- Utils ----
  private dayOfYear(d: Date) {
    const s = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d.getTime() - s.getTime() + ((s.getTimezoneOffset() - d.getTimezoneOffset()) * 60000)) / 86400000);
  }
  private bucket(h: number) { return h < 5 ? "night" : (h < 12 ? "morning" : (h < 18 ? "day" : "evening")); }
  private weekdayDe(d: Date) { return ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"][d.getDay()]; }
  private pick<T>(arr: T[], seed: number) { return arr[(seed % arr.length + arr.length) % arr.length]; }
  private emojis() { return ["✨","🌟","💜","🚀","🦔","🎮","☕","🌈","🧃","🍇","🍀"]; }
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

  // Listen
  private listsFor(owner: string) {
    const baseGreets = {
      morning: ['Guten Morgen','Morn','Sali zäme','Hello Sunshine','Hejho','Rise & Shine','Moin Moin','Buenos días','Buongiorno'],
      day:     ['Hallo','Hey','Hoi','Servus','Was geht','Yo','Hiya','Hallöchen','Grüezi','Na du'],
      evening: ['Guten Abend','N’Abend','Hiya','Yo','Hallöchen','Bonsoir','Buonasera','Abend zusammen','Evening vibes','Howdy'],
      night:   ['Gute Nacht? Noch wach!','Spätschicht!','Night Owl Mode','Nachtgruss','Leise, die Meeris schlafen 💤','Midnight coder','Noch ein Level? 🎮','Moonlight mode','Bett ruft'],
    };
    const baseMottos = {
      morning: [
        `Kaffee-Level: ${(this.hass?.states?.["sensor.coffee_level"]?.state) || "hoch"} ☕`,
        'Neuer Tag, neues Quest!','Heute wird’s cosy & produktiv ✨','Deep Work an – Störer aus.',
        'Hyperfocus bootet…','Stretch & breathe 🧘','Kurzer Plan, dann Go!','Hydrate first 💧'
      ],
      day: [
        'Ein Schritt nach dem anderen. You got this!','Code, Kamera, Action 🎬','Bleib hydriert 💧',
        'Level up – weiter geht’s!','Commit, push, deploy 🚀','5-Minuten-Tidy: lohnt sich.',
        'Snack & Fokus – perfect combo','Traefik grün? Dann ship it.','Docker läuft sauber – nice.'
      ],
      evening: [
        'Cool down & Review – kleiner Tagesabschluss?','Streams & Snacks? 🎮','Save & Commit – dann chillen.',
        'Bisschen Ordnung, grosser Effekt.','Stretch-Break nicht vergessen 🧘','Golden Hour Vibes ✨',
        'Kerzen + LoFi = Zen','Plan für morgen in 2 Bullet Points','Screens off, Kopf frei'
      ],
      night: [
        'Late Night Zen – langsam runterfahren.','Backup läuft? Dann ab ins Bett 😴','Tomorrow-You dankt dir.',
        'Nur noch EINE Sache… (wirklich!)','Schlaf ist auch ein Upgrade.','Bildschirm dunkel, Gedanken leise.',
        'Dream big, rest well ✨','Wasser ans Bett? 💧'
      ],
    };

    let extraGreets = { morning: [] as string[], day: [] as string[], evening: [] as string[], night: [] as string[] };
    let extraMottos = { morning: [] as string[], day: [] as string[], evening: [] as string[], night: [] as string[] };
    const low = owner.toLowerCase();

    if (low === "ezgi") {
      extraGreets = {
        morning: ['Günaydın','Merhaba ☀️'],
        day:     ['Selam','Nasılsın?','Ayliva vibes on 🎶','Stitch hug incoming 🩵'],
        evening: ['İyi akşamlar','Film saati? 🎬'],
        night:   ['İyi geceler','Tatlı rüyalar','Ohana time 🩵'],
      };
      extraMottos = {
        morning: ['Çay molası? ☕','Stitch mode: Ohana 🩵'],
        day:     ['Ayliva on repeat 🎶','Bir nefes al, devam et','Küçük adımlar, büyük fark'],
        evening: ['Playlist aç, vibe et 🎧','Bir çay mehr?','Tiny tidy – big peace'],
        night:   ['İyi geceler, güzel rüyalar','Telefonu bırak, dinlen 📵'],
      };
    } else if (["mary","marie therese","marie-thérèse","marie therese"].includes(low)) {
      extraGreets = {
        morning: ['Bun di','Allegra 🌞'],
        day:     ['Allegra','Co vai?'],
        evening: ['Buna saira'],
        night:   ['Buna notg'],
      };
      extraMottos = {
        morning: ['Buna jada cun buna energia ✨'],
        day:     ['Fai ina curta pausa 🧃','Respira profund – ina calma'],
        evening: ['Passa ina buna saira ✨','Musica dolza & relax 🎶'],
        night:   ['Durma bain 😴','Buna notg e fin di'],
      };
    } else {
      extraGreets = {
        morning: ['Morn, Rebi 💜'],
        day:     ['Yo, Aurora!','Grüezi mitenand'],
        evening: ['Stream-Time? 🎮'],
        night:   ['Backup fertig? 😴'],
      };
      extraMottos = {
        morning: ['Aurora-Rebecca online 🌅','Zelda: Mut · Kraft · Weisheit ✨'],
        day:     ['Meeris happy? Dann ich auch 🐹','Node-RED tickt – nice'],
        evening: ['OBS ready – Stream los 🎥','Git pull & chill'],
        night:   ['Frigate scharf? Dann zzz','SSD SMART ok? ✅'],
      };
    }

    const greets = {
      morning: [...baseGreets.morning, ...extraGreets.morning],
      day:     [...baseGreets.day,     ...extraGreets.day],
      evening: [...baseGreets.evening, ...extraGreets.evening],
      night:   [...baseGreets.night,   ...extraGreets.night],
    };
    const mottos = {
      morning: [...baseMottos.morning, ...extraMottos.morning],
      day:     [...baseMottos.day,     ...extraMottos.day],
      evening: [...baseMottos.evening, ...extraMottos.evening],
      night:   [...baseMottos.night,   ...extraMottos.night],
    };
    return { greets, mottos };
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

    const locState = c.location_entity ? hass.states?.[c.location_entity]?.state : undefined;
    const addr = c.address_entity ? hass.states?.[c.address_entity]?.state : undefined;
    const addrShort = this.addrShort(addr);

    const wTemp  = c.weather?.temp ? hass.states?.[c.weather.temp]?.state : "";
    const wCount = c.weather?.alerts_count ? parseInt(hass.states?.[c.weather.alerts_count]?.state || "0", 10) : 0;
    const wInfo  = c.weather?.alerts_info ? hass.states?.[c.weather.alerts_info]?.state : "";
    const wLine  = (wTemp ? `${wTemp}°C` : "") + (wCount > 0 && wInfo ? ` · ⚠️ ${wInfo}` : "");

    const { greets, mottos } = this.listsFor(c.owner);
    const greet  = this.pick(greets[bucket], seed);
    const motto  = this.pick(mottos[bucket], (doy + h) * 3 + m);
    const emojiA = this.pick(this.emojis(), seed*5 + 1);
    const emojiB = this.pick(this.emojis(), seed*7 + 3);

    let locFriendly = "";
    if (locState === "home") locFriendly = "Willkommen <b>Zuhause</b>";
    else if (locState === "not_home") locFriendly = "Gerade <b>Unterwegs</b>?";
    else if (typeof locState === "string" && locState) locFriendly = `Aktuell in <b>${locState.replace(/^zone\./,"").replace(/_/g," ")}</b>`;

    const currentUser = hass.user?.name || "User";
    const isOwner = currentUser.toLowerCase() === c.owner.toLowerCase();
    const lineDashboard = isOwner ? `Dein Zuhause: ${c.home_title}` : `Zu Gast bei <b>${c.owner}</b> – ${c.home_title}`;
    const lineLogin = `Eingeloggt als: <b>${currentUser}</b>`;

    const weekday = this.weekdayDe(now);
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
        ${wLine ? html`<br><strong>Wetter:</strong> ${wLine}` : ""}</p>
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
