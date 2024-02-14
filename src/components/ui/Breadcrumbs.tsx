import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div className="flex gap-1 items-center">
      {items.map((item, i) => (
        <div key={i} className="flex gap-1 items-center">
          {!!i && <ChevronRight width={16} className="text-slate-500" />}
          {i === items.length - 1 ? (
            <div className="text-sm text-slate-500">{item.label}</div>
          ) : (
            <Link href={item.href} className="text-sm text-slate-500 underline">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
