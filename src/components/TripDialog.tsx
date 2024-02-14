"use client";

import { addTrip, updateTrip } from "@/app/api/trips/actions";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Radio } from "@/components/ui/Radio";
import { Textarea } from "@/components/ui/Textarea";
import { Tables } from "@/db/types";
import { formateDate } from "@/utils/formaters";
import { useState } from "react";

const FORM_ID = "trip_form";

export function TripDialog({
  trip,
  open,
  onClose,
}: {
  trip?: Tables<"trips">;
  open: boolean;
  onClose: () => void;
}) {
  const isEditing = !!trip;

  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const title = isEditing ? "Edit trip" : "Add trip";
  const buttonLabel = isEditing ? "Save" : "Add";

  const action = isEditing
    ? updateTrip.bind(null, trip.id)
    : addTrip.bind(null, "");

  return (
    <Dialog
      title={title}
      loading={isLoading}
      error={{
        title: error,
      }}
      buttonLabel={buttonLabel}
      open={open}
      onClose={onClose}
      formId={FORM_ID}
    >
      <form
        className="grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);

          const response = await action(
            new FormData(e.target as HTMLFormElement)
          );

          if (response.status === "error") {
            setError("Could not save trip");
          } else {
            setError("");
            onClose();
          }

          setIsLoading(false);
        }}
        id={FORM_ID}
      >
        <Input
          label="Destination"
          name="destination_name"
          defaultValue={trip?.destination_name}
        />
        <div className="flex gap-4 items-center">
          <Radio
            label="Round trip"
            name="round-type"
            checked={isRoundTrip}
            onChange={(e) => setIsRoundTrip(e.target.checked)}
          />
          <Radio
            label="One-way"
            name="round-type"
            checked={!isRoundTrip}
            onChange={(e) => setIsRoundTrip(!e.target.checked)}
          />
        </div>
        <div className="flex gap-2">
          <Input
            label="Depart"
            type="date"
            className="flex-1"
            name="start_date"
            defaultValue={
              isEditing
                ? formateDate({ date: trip.start_date, excludeTime: true })
                : undefined
            }
          />
          {isRoundTrip && (
            <Input
              label="Return"
              type="date"
              className="flex-1"
              name="end_date"
              defaultValue={
                trip?.end_date
                  ? formateDate({ date: trip.end_date, excludeTime: true })
                  : undefined
              }
            />
          )}
        </div>
        <Textarea
          label="Description"
          name="description"
          defaultValue={trip?.description ? trip.description : undefined}
        />
      </form>
    </Dialog>
  );
}
