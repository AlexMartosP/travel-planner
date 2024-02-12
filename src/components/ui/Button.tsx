"use client";

import { LoaderIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const variantStyles = {
  success:
    "bg-green-100 text-sm text-green-900 font-medium hover:bg-green-200 disabled:hover:bg-green-100 transition",
  outlined:
    "bg-white border border-slate-300 hover:bg-slate-50 disabled:hover:bg-white",
  ghost: "bg-slate-200/25 hover:bg-slate-200",
  text: "underline",
} as const;

const sizeStyles = {
  sm: "py-1 px-3",
  md: "px-10 py-2",
};

export function Button({
  onClick,
  children,
  variant = "outlined",
  size = "md",
  loading,
  fullwidth,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  fullwidth?: boolean;
}) {
  return (
    <button
      {...props}
      className={twMerge(
        "rounded-md transition",
        variantStyles[variant],
        variant !== "text" && sizeStyles[size],
        fullwidth && "w-full",
        props.className
      )}
      onClick={onClick}
      disabled={loading}
    >
      {!loading ? (
        children
      ) : (
        <div className="animate-spin">
          <LoaderIcon width={18} height={18} />
        </div>
      )}
    </button>
  );
}
