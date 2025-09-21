// scripts/gen-version.js  (ESM, funktioniert mit "type": "module")
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// package.json lesen (ohne import-assertions)
const pkgPath = resolve(__dirname, "..", "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

// Datei schreiben
const outPath = resolve(__dirname, "..", "src", "version.ts");
const out = `// ⚠️ auto-generated – nicht editieren
export const REBIS_CARDS_VERSION = '${pkg.version}';
`;
writeFileSync(outPath, out, "utf8");
console.log("version.ts geschrieben:", pkg.version);
