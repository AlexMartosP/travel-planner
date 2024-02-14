"use client";

import { deleteActivity } from "@/app/api/activites/actions";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Tables } from "@/db/types";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

export function DeleteActivity({
  activity,
  tripId,
}: {
  activity: Tables<"Activites">;
  tripId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        fullwidth
        className="flex items-center justify-center gap-2 bg-red-200/25 hover:bg-red-200"
        onClick={() => setIsOpen(true)}
      >
        <TrashIcon width={18} />
        <span className="text-sm">Delete</span>
      </Button>
      <Dialog
        title="Delete activity"
        loading={isLoading}
        buttonLabel="Delete"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        error={{
          title: error,
        }}
        onButtonClick={async () => {
          setIsLoading(true);
          const response = await deleteActivity(activity.id, tripId);

          if (response.status === "error") {
            setError("An error occured");
          } else {
            setIsOpen(false);
          }

          setIsLoading(false);
        }}
      >
        <span>Are you sure you want to delete {activity.title}?</span>
      </Dialog>
    </>
  );
}
