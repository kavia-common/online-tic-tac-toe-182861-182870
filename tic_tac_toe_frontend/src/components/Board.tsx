import { component$ } from "@builder.io/qwik";
import Cell from "./Cell";
import type { Board as BoardType } from "~/lib/game";
import type { PropFunction } from "@builder.io/qwik";

export interface BoardProps {
  board: BoardType;
  winningLine: number[] | null;
  disabled?: boolean;
  onCellClick$: PropFunction<(index: number) => void>;
}

// PUBLIC_INTERFACE
export default component$<BoardProps>(({ board, winningLine, disabled = false, onCellClick$ }) => {
  return (
    <div
      class="board"
      role="grid"
      aria-label="Tic Tac Toe game board"
      aria-readonly={disabled}
    >
      {board.map((value, idx) => (
        <Cell
          key={idx}
          index={idx}
          value={value}
          onClick$={onCellClick$}
          disabled={disabled || !!value}
          isWinning={!!winningLine?.includes(idx)}
        />
      ))}
    </div>
  );
});
