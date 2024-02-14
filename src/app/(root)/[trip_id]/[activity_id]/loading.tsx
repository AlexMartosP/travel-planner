import { Skeleton } from "@/components/ui/Skeleton";

export default function ActivityLoading() {
  return (
    <div className="pt-32">
      <Skeleton className="w-full h-56" />
      <div className="mt-2">
        <Skeleton className="w-[12ch]" />
        <Skeleton className="w-[18ch] h-3 rounded-sm mt-2" />
        <div className="mt-2">
          <Skeleton className="w-full h-3 rounded-sm" />
          <Skeleton className="w-full h-3 rounded-sm mt-2" />
        </div>
      </div>
    </div>
  );
}
