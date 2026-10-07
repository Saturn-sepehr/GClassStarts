import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Clipboard write with a reset timer that is cleaned up on unmount.
 *
 * The naive version of this leaves a setTimeout running after the component
 * goes away, and on a route change in Remix that timer fires against a dead
 * component. The ref holds the handle so the effect can cancel it.
 */
export function useCopyCommand(resetAfter = 1600) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(typeof navigator !== "undefined" && !!navigator.clipboard?.writeText);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string, onCopied: (value: boolean) => void) => {
      if (!ready) return;
      try {
        await navigator.clipboard.writeText(text);
        onCopied(true);
      } catch {
        onCopied(false);
        return;
      }
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => onCopied(false), resetAfter);
    },
    [ready, resetAfter],
  );

  return copy;
}