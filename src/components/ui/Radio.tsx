"use client";

import { InputHTMLAttributes, useId } from "react";

export function Radio({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const id = useId();

  return (
    <div className="flex gap-2 items-center">
      <input id={id} type="radio" className="bg-red" {...props} />
      {label && (
        <label htmlFor={id} className="text-sm text-slate-800">
          {label}
        </label>
      )}
    </div>
  );
}
