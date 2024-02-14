"use client";

import { updateDone } from "@/app/api/activites/actions";
import { Button } from "@/components/ui/Button";
import { CheckIcon, XIcon } from "lucide-react";
import { useOptimistic } from "react";

export function DoneIconButton({
  tripId,
  activityId,
  initialDone,
}: {
  tripId: string;
  activityId: string;
  initialDone: boolean;
}) {
  const [done, setDone] = useOptimistic(
    initialDone,
    (prev, newValue: boolean) => newValue
  );

  return (
    <div className="opacity-0 group-hover:opacity-100 transition-all">
      <Button
        variant="ghost"
        size="icon"
        className="bg-slate-300 hover:bg-slate-300/75"
        onClick={async () => {
          setDone(!done);
          await updateDone(tripId, activityId, !done);
        }}
      >
        {done ? (
          <CheckIcon width={18} height={18} />
        ) : (
          <XIcon width={18} height={18} />
        )}
      </Button>
    </div>
  );
}
