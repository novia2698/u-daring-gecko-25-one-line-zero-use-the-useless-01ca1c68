// main.ts — entrypoint for "One Line, Zero Use: The Useless Superpower Sprint".
// Node 22, standard library only. No network, no dependencies, deterministic:
// the same bytes out on every run.
//
// The entry is a single original line (54 characters, well under the 200
// character cap) naming a hilariously useless superpower. The program writes
// it to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt when the variable
// is unset), which is the artifact the sealed scorer gates and the judge
// compares pairwise.
//
// The line: mind-reading turned useless by a language barrier. The joke pays
// off in the last few words, the flaw is specific and easy to picture, and no
// word explains the joke — the reader gets it or doesn't.
//
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line. 54 characters, one sentence, no trailing newline in the
// counted text itself (the file is written with a single trailing newline;
// the scorer counts the text, and a trailing newline is harmless either way).
const LINE = "I can read minds, but only in languages I don't speak.";

function main(): void {
  // Hard guard matching the sealed scorer's gate: 1–200 characters, not only
  // whitespace. Fail loudly here rather than shipping an invalid entry.
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(`entry line is ${LINE.length} chars; must be 1-200`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE + "\n", "utf8");
  console.log(`wrote ${target} (${LINE.length} chars)`);
}

main();
