import { twMerge } from "tailwind-merge";

const variantStyles = {
  emergency: "bg-red-300",
  success: "bg-green-200",
};

export function Alert({
  variant,
  title,
  className,
  children,
}: {
  title: string;
  variant: keyof typeof variantStyles;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge("p-2 rounded-md", variantStyles[variant], className)}
    >
      <div className="font-medium ">{title}</div>
      {children}
    </div>
  );
}
