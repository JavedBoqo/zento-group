"use client";

import { ArrowDown, ArrowUp, Copy, Trash2 } from "lucide-react";

export function BuilderActions({
  label,
  index,
  count,
  move,
  duplicate,
  remove,
}: {
  label: string;
  index: number;
  count: number;
  move: (to: number) => void;
  duplicate?: () => void;
  remove: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        aria-label={`Move ${label} up`}
        disabled={index === 0}
        onClick={() => move(index - 1)}
        className="admin-builder-icon"
      >
        <ArrowUp size={15} />
      </button>
      <button
        type="button"
        aria-label={`Move ${label} down`}
        disabled={index === count - 1}
        onClick={() => move(index + 1)}
        className="admin-builder-icon"
      >
        <ArrowDown size={15} />
      </button>
      {duplicate && (
        <button
          type="button"
          aria-label={`Duplicate ${label}`}
          onClick={duplicate}
          className="admin-builder-icon"
        >
          <Copy size={15} />
        </button>
      )}
      <button
        type="button"
        aria-label={`Delete ${label}`}
        onClick={remove}
        className="admin-builder-icon text-red-700"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
