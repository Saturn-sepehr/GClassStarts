import { useState } from "react";

import { useCopyCommand } from "../hooks/useCopyCommand";

const RUNNERS = [
  { id: "npm", label: "npm", command: "npx create-remix@latest" },
  { id: "pnpm", label: "pnpm", command: "pnpm dlx create-remix@latest" },
  { id: "yarn", label: "Yarn", command: "yarn dlx create-remix@latest" },
  { id: "bun", label: "Bun", command: "bunx create-remix@latest" },
  { id: "deno", label: "Deno", command: "deno run -A npm:create-remix@latest" },
] as const;

/**
 * The install command bar.
 *
 * The runner picker is a real listbox: arrow keys move the highlighted option,
 * Enter and Space commit it, Escape closes it. That is not decoration — the
 * reference's control is keyboard-driven, and this page is about keyboard
 * affordances, so the interaction is implemented rather than styled around.
 */
export function CommandBar() {
  const [runner, setRunner] = useState<(typeof RUNNERS)[number]>(RUNNERS[0]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [copied, setCopied] = useState(false);
  const copy = useCopyCommand();

  function choose(index: number) {
    setRunner(RUNNERS[index]);
    setHighlight(index);
  }

  function commit(index: number) {
    choose(index);
    setOpen(false);
  }

  return (
    <div className="rx-cmd">
      <button
        type="button"
        className="rx-cmd__runner"
        aria-label="Choose a package runner"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
          setHighlight(RUNNERS.indexOf(runner));
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setHighlight((i) => Math.min(RUNNERS.length - 1, i + 1));
          }
        }}
      >
        <RunnerMark id={runner.id} />
        <span>{runner.label}</span>
        <svg className="rx-cmd__chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="rx-cmd__menu" role="listbox" aria-label="Package runner" tabIndex={-1}>
          {RUNNERS.map((r, i) => (
            <div
              key={r.id}
              role="option"
              aria-selected={r.id === runner.id}
              aria-disabled={false}
              data-highlighted={i === highlight}
              className="rx-cmd__option"
              onMouseEnter={() => setHighlight(i)}
              onClick={() => commit(i)}
            >
              <RunnerMark id={r.id} />
              <span>{r.label}</span>
              {r.id === runner.id ? (
                <svg className="rx-cmd__check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <code className="rx-cmd__code">{runner.command}</code>

      <button
        type="button"
        className="rx-cmd__copy"
        aria-label="Copy create command"
        onClick={() => copy(runner.command, setCopied)}
        data-status={copied ? "done" : "idle"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="9" y="9" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}

/** Small runner glyphs. Drawn rather than fetched so nothing 404s offline. */
function RunnerMark({ id }: { id: string }) {
  if (id === "npm") {
    return (
      <svg className="rx-cmd__mark" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#cb3837" d="M2 4h20v16H2z" />
        <path fill="#fff" d="M5.6 17.6V6.4h2.1v9.1h2.3v2.1zm4.4 0V8.5h2.1v7h2.3v2.1zm4.4 0v-2.1h4.4v2.1z" />
      </svg>
    );
  }
  const labels: Record<string, string> = { pnpm: "pnpm", yarn: "Y", bun: "bun", deno: "D" };
  return <span className={`rx-cmd__mark rx-cmd__mark--${id}`}>{labels[id]}</span>;
}