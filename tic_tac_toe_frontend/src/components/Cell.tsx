import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { CellValue } from "~/lib/game";

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

  return (
    <div
      role="gridcell"
      aria-label={`Cell ${index + 1}${value ? `, ${value}` : ""}`}
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
      <span class="cell__content" aria-hidden="true">
        {value}
      </span>
    </div>
  );
});
