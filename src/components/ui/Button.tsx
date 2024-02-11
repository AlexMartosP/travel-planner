"use client";

const colors = {
  primary: "px"
}

export function Button({
  onClick,
  children,
  fullwidth,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  fullwidth: boolean;
}) {
  return (
    <button
      className="bg-white px-10 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition focus:outline-dashed focus:outline-offset-2 focus:outline-slate-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
