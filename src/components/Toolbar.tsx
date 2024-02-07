"use client";

import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { Layers3, LogOut, Plus, Settings, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Toolbar() {
  const [openTool, setOpenTool] = useState<
    "invite" | "add" | "settings" | null
  >(null);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      <div className=" bg-slate-900 text-white p-3 rounded-full flex items-center gap-8">
        <Link href="/">
          <Layers3 />
        </Link>
      </div>
      <div className=" bg-slate-900 text-white px-8 py-3 rounded-full flex items-center gap-8">
        <button onClick={() => setOpenTool((prev) => (prev ? null : "invite"))}>
          <UserPlus />
        </button>
        <div className="w-[2px] h-[15px] bg-white rounded-full" />
        <button onClick={() => signOut()}>
          <Plus />
        </button>
        <div className="w-[2px] h-[15px] bg-white rounded-full" />
        <div>
          <Settings />
        </div>
      </div>
      <div className=" bg-slate-900 text-white p-3 rounded-full flex items-center gap-8">
        <button onClick={() => signOut()}>
          <LogOut />
        </button>
      </div>
      {openTool === "invite" && (
        <div
          style={{
            bottom: "calc(100% + 1rem)",
            height: 200,
            left: 50,
          }}
          className="absolute bg-slate-900 w-[400px] text-white rounded-2xl p-4"
        >
          <h3 className="text-lg font-medium">Invite a traveler</h3>
          <input
            type="text"
            className="w-full mt-2 p-2 rounded-md text-black"
            placeholder="Email"
          />

          <Button>Invite</Button>
        </div>
      )}
    </div>
  );
}
