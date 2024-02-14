import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Radio } from "@/components/ui/Radio";
import { Textarea } from "@/components/ui/Textarea";
import { Tables } from "@/db/types";
import { formateDate } from "@/utils/formaters";
import { FormHTMLAttributes, useState } from "react";

const FORM_ID = "trip_form";

export function TripDialog({
  trip,
  error,
  action,
  loading,
  open,
  onClose,
}: {
  trip?: Tables<"Trips">;
  error?: {
    title?: string;
    description?: string;
  };
  action: FormHTMLAttributes<HTMLFormElement>["action"];
  loading: boolean;
  open: boolean;
  onClose: () => void;
}) {
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  const isEditing = !!trip;

  const title = isEditing ? "Edit trip" : "Add trip";
  const buttonLabel = isEditing ? "Save" : "Add";

  return (
    <Dialog
      title={title}
      loading={loading}
      formId={FORM_ID}
      useFormStatus
      error={error}
      buttonLabel={buttonLabel}
      open={open}
      onClose={onClose}
    >
      <form className="grid gap-4" action={action} id={FORM_ID}>
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
              isEditing ? formateDate({ date: trip.start_date }) : undefined
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
                  ? formateDate({ date: trip.end_date })
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
