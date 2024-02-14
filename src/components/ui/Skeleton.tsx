import { twMerge } from "tailwind-merge";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "animate-pulse bg-slate-300 w-16 h-6 rounded-md",
        className
      )}
    />
  );
}
