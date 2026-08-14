import { cp, mkdir, rm } from "node:fs/promises";

const staticEntries = [
  "_next",
  "about",
  "community",
  "contact",
  "events",
  "gallery",
  "images",
  "payments",
  "platform",
  "services",
  "tickets",
  "index.html",
  "recovery.js",
];

await rm("dist", { force: true, recursive: true });
await mkdir("dist", { recursive: true });
await Promise.all(staticEntries.map((entry) => cp(entry, `dist/${entry}`, { recursive: true })));
console.log("Recovered static site copied to dist.");
