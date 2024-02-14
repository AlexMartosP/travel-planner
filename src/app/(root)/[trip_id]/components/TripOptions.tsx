"use client";

import { TripDialog } from "@/components/TripDialog";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Tables } from "@/db/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

export function TripOptions({ trip }: { trip: Tables<"Trips"> }) {
  const [openDialog, setOpenDialog] = useState<
    "invite" | "edit" | "delete" | null
  >(null);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-[2px] bg-slate-200/25 text-slate-800 rounded-full hover:bg-slate-200 transition-all leading-none">
            <MoreHorizontalIcon width={18} height={18} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="grid gap-2 bg-white border py-3 px-5 rounded-md">
            <DropdownMenu.Item>
              <button onClick={() => setOpenDialog("invite")}>
                Invite traveler
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <button onClick={() => setOpenDialog("edit")}>Edit trip</button>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <button
                className="text-red-600"
                onClick={() => setOpenDialog("delete")}
              >
                Delete trip
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <Dialog
        title="Invite traveler"
        open={openDialog === "invite"}
        buttonLabel="Invite"
        onClose={() => setOpenDialog(null)}
        loading={false}
        formId="invite_form"
      >
        <form id="invite_form">
          <Input label="Email*" type="email" name="email" required />
        </form>
      </Dialog>
      <TripDialog
        trip={trip}
        open={openDialog === "edit"}
        onClose={() => setOpenDialog(null)}
        loading={false}
        action={() => {}}
      />

      <Dialog
        title="Delete trip"
        open={openDialog === "delete"}
        buttonLabel="Delete"
        onClose={() => setOpenDialog(null)}
        loading={false}
      >
        <span>Are you sure you want to delete {trip.destination_name}?</span>
      </Dialog>
    </>
  );
}
