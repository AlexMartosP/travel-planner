"use client";

import { ActivityDrawer } from "@/components/ActivityDrawer";
import { Button } from "@/components/ui/Button";
import { Tables } from "@/db/types";
import { EditIcon } from "lucide-react";
import { useState } from "react";

export function EditActivity({
  activity,
  activityImageUrl,
  tripId,
}: {
  activity: Tables<"activites">;
  activityImageUrl: string;
  tripId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        fullwidth
        className="flex items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <EditIcon width={18} />
        <span className="text-sm">Edit</span>
      </Button>
      <ActivityDrawer
        activity={activity}
        tripId={tripId}
        activityImageUrl={activityImageUrl}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
