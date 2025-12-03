import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { CellValue } from "~/lib/game";
import { KnightIcon, QueenIcon } from "./Icons";

export interface CellProps {
  index: number;
  value: CellValue;
  onClick$: PropFunction<(index: number) => void>;
  isWinning?: boolean;
  disabled?: boolean;
}

// PUBLIC_INTERFACE
export default component$<CellProps>((props) => {
  const { index, value, onClick$, isWinning = false, disabled = false } = props;

  const ariaPlayer =
    value === "X" ? "Knight" : value === "O" ? "Queen" : "Empty";

  return (
    <div
      role="gridcell"
      aria-label={`Cell ${index + 1}${value ? `, ${ariaPlayer}` : ""}`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick$={() => !disabled && onClick$(index)}
      onKeyDown$={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick$(index);
        }
      }}
      class={{
        cell: true,
        "cell--win": isWinning,
        "cell--occupied": !!value,
        "cell--disabled": disabled,
      }}
    >
      <span class="cell__content" aria-hidden={value ? "true" : "false"}>
        {value === "X" && <KnightIcon class="icon" title="Knight" />}
        {value === "O" && <QueenIcon class="icon" title="Queen" />}
        {value === "" && ""}
      </span>
    </div>
  );
});
