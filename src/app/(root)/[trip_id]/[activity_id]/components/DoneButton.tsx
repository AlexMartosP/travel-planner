"use client";

import { updateDone } from "@/app/api/activites/actions";
import { CheckIcon, XIcon } from "lucide-react";
import { useOptimistic } from "react";

export function DoneButton({
  tripId,
  activityId,
  initialDone,
}: {
  tripId: number;
  activityId: string;
  initialDone: boolean;
}) {
  const [done, setDone] = useOptimistic(
    initialDone,
    (prev, newValue: boolean) => newValue
  );

  return (
    <button
      onClick={async () => {
        setDone(!done);
        await updateDone(tripId, activityId, !done);
      }}
      className="flex gap-1 items-center px-2 py-1 bg-slate-300/50 rounded-full"
    >
      <div>
        {done ? (
          <CheckIcon width={13} height={13} />
        ) : (
          <XIcon width={13} height={13} />
        )}
      </div>
      <div className="text-xs">{done ? "Done" : "Not done"}</div>
    </button>
  );
}
