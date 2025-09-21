// scripts/gen-version.js
const fs = require("fs");
const pkg = require("../package.json");

const out = `// ⚠️ auto-generated – nicht editieren
export const REBIS_CARDS_VERSION = '${pkg.version}';
`;
fs.writeFileSync("src/version.d.ts", out);
console.log("version.d.ts geschrieben:", pkg.version);
