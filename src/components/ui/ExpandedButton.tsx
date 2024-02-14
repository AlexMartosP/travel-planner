"use client";

import { MouseEvent } from "react";

export function ExpandedButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className="flex gap-2 items-center max-w-[21px] p-1 hover:max-w-full transition-all duration-300 overflow-hidden bg-slate-800 rounded-full text-slate-100"
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="text-xs leading-3">{label}</div>
    </button>
  );
}
