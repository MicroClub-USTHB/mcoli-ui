import { flushSync } from 'react-dom';

/**
 * Runs a DOM-changing update inside a View Transition so palette and light/dark swaps
 * crossfade instead of snapping. The update must change the DOM synchronously; React state
 * set inside it is flushed with flushSync so the "after" snapshot is complete.
 * Falls back to an instant update when unsupported or when the user prefers reduced motion.
 */
export function withViewTransition(update: () => void) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduceMotion) {
    update();
    return;
  }
  const transition = document.startViewTransition(() => flushSync(update));
  // The browser skips the animation (but still runs the update) if, say, the tab is hidden.
  // That rejects these promises; nothing is wrong, so keep it out of the console.
  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
}
