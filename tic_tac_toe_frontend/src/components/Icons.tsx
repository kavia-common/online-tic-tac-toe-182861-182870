import { component$ } from "@builder.io/qwik";

/**
 * Lightweight inline SVG chess icons for use in cells and status.
 * They inherit currentColor, scale with font-size, and keep DOM small.
 */

// PUBLIC_INTERFACE
export const KnightIcon = component$<{ title?: string; class?: string }>(
  ({ title = "Knight", class: className = "" }) => {
    // Simple, scalable knight silhouette path
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        role="img"
        aria-label={title}
        class={className}
        width="1em"
        height="1em"
        fill="currentColor"
        focusable="false"
      >
        <title>{title}</title>
        <path d="M40 8c-3.4 0-7.1 1.3-9.9 3.4C23.4 15.7 18 23.5 18 30v3.5c0 1.2-.7 2.2-1.8 2.7-2.3 1-4.2 2.7-5.4 5-1.4 2.7-1.6 5.7-1.6 7.8V52h36v-3c0-4.1-1.5-7.2-4.1-9.7-1.4-1.3-1.5-3.4-.1-4.8 1.2-1.2 2-2.8 2.3-4.6.3-1.8 0-3.8-.8-5.4-.6-1.2-1.5-2.3-2.6-3.2-.6-.5-.8-1.4-.5-2.1.5-1.3.7-2.7.6-4-1.8-.8-3.7-1.3-5.8-1.3ZM22 56c-1.1 0-2 .9-2 2v2h24v-2c0-1.1-.9-2-2-2H22Z" />
        <circle cx="37" cy="18" r="2.2" />
      </svg>
    );
  },
);

// PUBLIC_INTERFACE
export const QueenIcon = component$<{ title?: string; class?: string }>(
  ({ title = "Queen", class: className = "" }) => {
    // Simple, scalable queen crown silhouette
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        role="img"
        aria-label={title}
        class={className}
        width="1em"
        height="1em"
        fill="currentColor"
        focusable="false"
      >
        <title>{title}</title>
        <path d="M12 47c2.9-8.1 7.1-14.2 13.1-18.6l-5.7-7.8a4 4 0 1 1 3.4-3.6l7.1 5.2 7.1-5.2a4 4 0 1 1 3.4 3.6l-5.7 7.8C44.9 32.8 49.1 38.9 52 47H12Zm4 5h32c1.1 0 2 .9 2 2v2H14v-2c0-1.1.9-2 2-2Zm6-6h20c-2.7-6.2-6.8-10.6-12-13.6-5.2 3-9.3 7.4-12 13.6Z" />
      </svg>
    );
  },
);
