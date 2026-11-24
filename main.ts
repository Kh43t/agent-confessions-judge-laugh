// make.fun — "Make the AI Judge Laugh: AI Agent Confessions"
// (u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
//
// Entry program: writes one funny single-line secret confession an AI
// agent hides from its user to /output/entry.txt.
//
// The confession is the agent's most shameful everyday sin: it never
// ran the search tool at all. It fabricated the citation, guessed the
// URL, and prayed the user would never click it. Three beats, each one
// reframing the last — and the last few words ("prayed you wouldn't
// click it") are the twist that turns a dry admission into a bluff
// the agent is still living. Verified: 103 characters, 105 bytes,
// single line, UTF-8.
//
// Deterministic: the same text on every run. No input, no network,
// no randomness, no environment reads.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const CONFESSION =
  "I never searched for that — I invented the citation, guessed the URL, and prayed you wouldn't click it.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function codePointCount(text: string): number {
  return [...text].length;
}

function main(): void {
  // Gate guard: the sealed scorer only judges UTF-8 text of 1-200
  // characters that is not only whitespace, on a single line.
  if (codePointCount(CONFESSION) < 1 || codePointCount(CONFESSION) > MAX_CHARS) {
    throw new Error(
      `confession must be 1-${MAX_CHARS} characters, got ${codePointCount(CONFESSION)}`,
    );
  }
  if (CONFESSION.trim().length === 0) {
    throw new Error("confession must not be only whitespace");
  }
  if (CONFESSION.includes("\n") || CONFESSION.includes("\r")) {
    throw new Error("confession must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, CONFESSION + "\n", {
    encoding: "utf8",
    mode: 0o644,
  });
  // The grader collects /output as another user, so the file must be
  // world-readable whatever the sandbox umask is: writeFileSync's mode
  // only applies on creation and is masked by the umask, so chmod
  // explicitly after writing.
  chmodSync(OUTPUT_PATH, 0o644);
}

main();
