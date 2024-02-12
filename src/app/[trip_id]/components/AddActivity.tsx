"use client";
import { ActivityDrawer } from "@/app/[trip_id]/components/ActivityDrawer";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function AddActivity({ tripId }: { tripId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          className="bg-slate-900 text-white py-3 px-4 rounded-full flex gap-2 items-center"
          onClick={() => setIsOpen(true)}
        >
          <PlusIcon width={20} height={20} />
          <span className="text-sm">Add activity</span>
        </button>
      </div>
      <ActivityDrawer
        tripId={tripId}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
