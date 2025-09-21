import { REBIS_CARDS_VERSION } from "./version.d";
const V = REBIS_CARDS_VERSION;
console.info(
  "%c 🌸 Rebis Cards 🌸 %c v" + V + " ",
  "color:#fff;background:#7c3aed;padding:2px 6px;border-radius:4px 0 0 4px",
  "color:#fff;background:#111827;padding:2px 6px;border-radius:0 4px 4px 0"
);

// Alle Karten hier importieren
import "./header-card.ts";
