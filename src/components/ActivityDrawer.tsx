"use client";

import { addActivity, updateActivity } from "@/app/[trip_id]/actions";
import { Drawer } from "@/components/ui/Drawer";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Tables } from "@/db/types";
import { formateDate } from "@/utils/formaters";
import { useRef, useState } from "react";

export function ActivityDrawer({
  tripId,
  activity,
  activityImageUrl,
  open,
  onClose,
}: {
  tripId: number;
  activity?: Tables<"Activites">;
  activityImageUrl?: string;
  open: boolean;
  onClose: () => void;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useRef<HTMLFormElement>(null);

  function uploadImage(file: File) {
    const dataUrl = URL.createObjectURL(file);

    setImageUrl(dataUrl);
  }

  const title = activity ? `Edit activity` : "Add activity";
  const buttonLabel = activity ? `Save` : "Add";

  return (
    <Drawer
      title={title}
      loading={isLoading}
      buttonLabel={buttonLabel}
      formId="form"
      error={{
        title: error,
      }}
      open={open}
      onClose={() => {
        if (form.current) {
          form.current.reset();
        }
        onClose();
      }}
    >
      <form
        id="form"
        ref={form}
        className="grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);

          const response = !activity
            ? await addActivity(
                tripId,
                new FormData(e.target as HTMLFormElement)
              )
            : await updateActivity(
                activity.id,
                tripId,
                new FormData(e.target as HTMLFormElement)
              );

          if (response.status === "error") {
            if (response.error.key === "MUTATION_ERROR") {
              setError(response.error.message);
            } else if (response.error.key === "VALIDATION_ERROR") {
              setError("Validation error");
            }
          }

          if (response.status === "success") {
            setError("");
            if (form.current) {
              form.current.reset();
            }
            onClose();
          }

          setIsLoading(false);
        }}
      >
        <FileUpload
          name="image"
          imageSrc={imageUrl || activityImageUrl}
          onChange={uploadImage}
          width={600}
          height={300}
          alt="preview"
        />
        <Input
          label="Title*"
          type="text"
          name="title"
          defaultValue={activity?.title}
          required
        />
        <Input
          label="Date and time"
          type="datetime-local"
          name="doDate"
          defaultValue={
            activity?.do_date
              ? formateDate({ date: activity?.do_date })
              : undefined
          }
        />
        <Input
          label="Address"
          type="text"
          name="address"
          id="address"
          defaultValue={activity?.address || undefined}
        />
        <Textarea
          label="Description*"
          name="description"
          defaultValue={activity?.description}
        />
      </form>
    </Drawer>
  );
}
