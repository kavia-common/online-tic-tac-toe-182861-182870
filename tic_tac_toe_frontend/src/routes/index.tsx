import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Board from "~/components/Board";
import StatusBar from "~/components/StatusBar";
import {
  initialGameState,
  makeMove,
  serializeState,
  deserializeState,
  createEmptyBoard,
  type GameState,
} from "~/lib/game";

const STORAGE_KEY = "ttt_qwik_state_v1";

// PUBLIC_INTERFACE
export default component$(() => {
  const stateSig = useSignal<GameState>(initialGameState());
  const announceSig = useSignal<string>("Welcome to Tic Tac Toe. Player X starts.");

  // Load from localStorage in browser
  useVisibleTask$(() => {
    const persisted = deserializeState(localStorage.getItem(STORAGE_KEY));
    if (persisted) {
      stateSig.value = persisted;
      announceSig.value = persisted.winner
        ? `Resumed game. Player ${persisted.winner} had already won.`
        : persisted.isDraw
        ? "Resumed game. It was a draw."
        : `Resumed game. Player ${persisted.currentPlayer}'s turn.`;
    }
  });

  // Persist on changes
  useVisibleTask$(({ track }) => {
    const s = track(() => stateSig.value);
    try {
      localStorage.setItem(STORAGE_KEY, serializeState(s));
    } catch {
      // ignore storage errors
    }
  });

  const handleCellClick$ = $((index: number) => {
    const next = makeMove(stateSig.value, index);
    if (next !== stateSig.value) {
      stateSig.value = next;
      announceSig.value = next.winner
        ? `Player ${next.winner} wins!`
        : next.isDraw
        ? "It's a draw!"
        : `Player ${next.currentPlayer}'s turn.`;
    }
  });

  const handleReset$ = $(() => {
    // Reset board but keep the same starting player as current
    const starting = stateSig.value.currentPlayer;
    stateSig.value = {
      board: createEmptyBoard(),
      currentPlayer: starting,
      winner: null,
      winningLine: null,
      isDraw: false,
      moves: 0,
    };
    announceSig.value = `Board reset. Player ${starting}'s turn.`;
  });

  const handleNewGame$ = $(() => {
    // Start a brand new game with X starting
    stateSig.value = initialGameState();
    announceSig.value = "New game started. Player X's turn.";
  });

  const disabled = !!stateSig.value.winner || stateSig.value.isDraw;

  return (
    <div class="app">
      <header class="app__header">
        <h1 class="title">Tic Tac Toe</h1>
        <p class="subtitle">Modern, clean, two-player game</p>
      </header>

      <main class="app__main">
        <div class="announce" aria-live="polite">{announceSig.value}</div>

        <StatusBar state={stateSig.value} />

        <div class="board__wrapper">
          <Board
            board={stateSig.value.board}
            winningLine={stateSig.value.winningLine}
            disabled={disabled}
            onCellClick$={handleCellClick$}
          />
        </div>

        <div class="actions" role="group" aria-label="Game actions">
          <button class="btn btn--secondary" onClick$={handleReset$}>
            Reset
          </button>
          <button class="btn btn--primary" onClick$={handleNewGame$}>
            New Game
          </button>
        </div>

        <section class="help">
          <h2 class="help__title">How to play</h2>
          <p class="help__text">
            Two players take turns. Player X starts. Click or press Enter/Space on an empty cell to place your mark.
            Get three in a row horizontally, vertically, or diagonally to win.
          </p>
        </section>
      </main>

      <footer class="app__footer">
        <a class="footer__link" href="#" onClick$={(e) => { e.preventDefault(); handleNewGame$(); }}>
          Restart game
        </a>
        <span class="footer__sep">•</span>
        <span class="footer__note">Built with Qwik</span>
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Tic Tac Toe - Ocean Professional",
  meta: [
    {
      name: "description",
      content: "Two-player Tic Tac Toe built with Qwik and a modern Ocean Professional theme.",
    },
    {
      name: "theme-color",
      content: "#2563EB",
    },
  ],
};
