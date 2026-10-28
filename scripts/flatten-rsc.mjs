// Next 16's static export writes route prefetch data into nested folders
// (e.g. __next.projects/$d$id/__PAGE__.txt), while the browser requests one flat,
// dot-joined file name (__next.projects.$d$id.__PAGE__.txt). Plain static hosts can't
// map one to the other, so this writes a flat copy next to each nested file.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "out";
let made = 0;

function flatten(base, dir, parts) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) flatten(base, p, [...parts, name]);
    else { copyFileSync(p, join(base, [...parts, name].join("."))); made++; }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, p, [name]);
    else if (name !== "_next") walk(p);
  }
}

walk(root);
console.log(`flatten-rsc: wrote ${made} flat prefetch files`);
