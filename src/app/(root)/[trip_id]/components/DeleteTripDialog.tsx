"use client";

import { deleteTrip } from "@/app/api/trips/actions";
import { Dialog } from "@/components/ui/Dialog";
import { Tables } from "@/db/types";
import { useState } from "react";

export function DeleteTripDialog({
  trip,
  open,
  onClose,
}: {
  trip: Tables<"trips">;
  open: boolean;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Dialog
      title="Delete trip"
      open={open}
      buttonLabel="Delete"
      onClose={onClose}
      loading={isLoading}
      onButtonClick={async () => {
        setIsLoading(true);

        const response = await deleteTrip(trip.id);

        if (response.status === "error") {
          setError("Could not delete trip");
        }

        setIsLoading(false);
      }}
    >
      <span>Are you sure you want to delete {trip.destination_name}?</span>
    </Dialog>
  );
}
