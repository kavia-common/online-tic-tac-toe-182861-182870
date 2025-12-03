import { component$ } from "@builder.io/qwik";
import type { GameState } from "~/lib/game";

export interface StatusBarProps {
  state: GameState;
}

// PUBLIC_INTERFACE
export default component$<StatusBarProps>(({ state }) => {
  const human = (p: "X" | "O") => (p === "X" ? "Knight" : "Queen");

  let message = "";
  if (state.winner) {
    message = `${human(state.winner)} wins!`;
  } else if (state.isDraw) {
    message = "It's a draw!";
  } else {
    message = `${human(state.currentPlayer)}'s turn`;
  }

  const statusType: "info" | "success" | "error" = state.winner
    ? "success"
    : state.isDraw
    ? "error"
    : "info";

  return (
    <div class={`status status--${statusType}`} role="status" aria-live="polite">
      <span class="status__dot" aria-hidden="true" />
      <span class="status__text">{message}</span>
    </div>
  );
});
