"use client";

import { addTrip } from "@/app/api/trips/actions";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Radio } from "@/components/ui/Radio";
import { Textarea } from "@/components/ui/Textarea";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";

export function AddTrip() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  const [state, action] = useFormState(addTrip, null);

  const hasError = state?.status === "error";

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="mt-2 flex justify-center items-center gap-2"
        fullwidth
      >
        <PlusIcon width={18} />
        <span className="text-sm">Add new trip</span>
      </Button>
      <Dialog
        title="Add trip"
        loading={false}
        formId="form"
        error={hasError ? { title: "Could not add trip" } : undefined}
        buttonLabel="Add"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form className="grid gap-4" action={action} id="form">
          <Input label="Destination" name="destination_name" />
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
            />
            {isRoundTrip && (
              <Input
                label="Return"
                type="date"
                className="flex-1"
                name="end_date"
              />
            )}
          </div>
          <Textarea label="Description" name="description" />
        </form>
      </Dialog>
    </>
  );
}
