import { addActivity } from "@/app/[trip_id]/actions";
import { Drawer } from "@/components/ui/Drawer";
import { Tables } from "@/db/types";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export function ActivityDrawer({
  tripId,
  activity,
  open,
  onClose,
}: {
  tripId: number;
  activity?: Tables<"Activites">;
  open: boolean;
  onClose: () => void;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const dataUrl = URL.createObjectURL(file);

      setImageUrl(dataUrl);
    }
  }

  const title = activity ? `Edit activity` : "Add activity";
  const buttonLabel = activity ? `Save` : "Add";

  return (
    <Drawer
      title={title}
      loading={isLoading}
      buttonLabel={buttonLabel}
      formId="form"
      open={open}
      onClose={onClose}
    >
      <form
        id="form"
        className="grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);

          const response = await addActivity(
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
          }

          setIsLoading(false);
        }}
      >
        <div className="relative w-full aspect-video border-2 border-dashed rounded-md overflow-clip p-2 grid items-center">
          <input
            type="file"
            name="image"
            className="opacity-0 absolute top-0 left-0 w-full h-full"
            onChange={uploadImage}
          />
          {imageUrl ? (
            <Image
              className="rounded-md w-full h-full object-cover"
              src={imageUrl}
              width={350}
              height={200}
              alt="Preview"
            />
          ) : (
            <div className="grid gap-2 justify-items-center text-center">
              <UploadIcon />
              <span className="text-sm text-slate-400">No image selected</span>
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm">
            Title*
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full px-2 py-1 border rounded-md"
            required
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="datetime" className="text-sm">
            Date and time
          </label>
          <input
            type="datetime-local"
            id="datetime"
            name="doDate"
            className="px-2 w-full py-1 border rounded-md"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="address" className="text-sm">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="w-full px-2 py-1 border rounded-md"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            className="px-2 w-full py-1 border rounded-md"
          />
        </div>
      </form>
    </Drawer>
  );
}
