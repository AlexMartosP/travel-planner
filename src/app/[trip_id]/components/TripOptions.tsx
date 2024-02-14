"use client";

import { Tables } from "@/db/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

export function TripOptions({ trip }: { trip: Tables<"Trips"> }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-[2px] bg-slate-200/25 text-slate-800 rounded-full hover:bg-slate-200 transition-all leading-none">
          <MoreHorizontalIcon width={18} height={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="grid gap-2 bg-white border py-3 px-5 rounded-md">
          <DropdownMenu.Item>
            <button>Invite traveler</button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button>Edit trip</button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button className="text-red-600">Delete trip</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
