import { Skeleton } from "@/components/ui/Skeleton";

export default function TripLoading() {
  return (
    <div className="pt-32">
      <Skeleton className="w-[12ch]" />
      <Skeleton className="w-[18ch] h-3 rounded-sm mt-2" />
      <div className="grid gap-4 mt-12">
        {Object.keys(new Array(4).fill(null)).map((i) => (
          <Skeleton key={i} className="w-full h-16" />
        ))}
      </div>
    </div>
  );
}
