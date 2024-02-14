"use client";

import { TextareaHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

export function Textarea({
  label,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  const id = useId();

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="text-sm text-slate-800">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={twMerge("px-2 w-full py-1 border rounded-md")}
        {...props}
      />
    </div>
  );
}
