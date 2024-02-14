"use client";

import { InputHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

export function Input({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const id = useId();

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="text-sm text-slate-800">
          {label}
        </label>
      )}
      <input
        id={id}
        className={twMerge("px-2 w-full py-1 border rounded-md")}
        {...props}
      />
    </div>
  );
}
