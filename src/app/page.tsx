import { SignoutButton } from "@/app/SignoutButton";
import { Button } from "@/components/ui/Button";
import { createSupabaseClient } from "@/db/client";
import { differenceInDays } from "date-fns";
import { PlusIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = createSupabaseClient(cookies());

  const { data, error } = await supabase.auth.getUser();
  const trips = await supabase
    .from("Trips")
    .select("*, Profiles!inner()")
    .eq("Profiles.id", data.user!.id);

  return (
    <div className="pt-32">
      <div>
        <h1>Welcome back, {data.user?.user_metadata.full_name}!</h1>
        <SignoutButton />
        <div className="mt-12">
          {trips.data?.map((trip) => (
            <Link
              href={`/${trip.id}`}
              key={trip.id}
              className="group flex justify-between items-center"
            >
              <div className="underline underline-offset-2 decoration-slate-300 group-hover:decoration-slate-500 transition">
                {trip.destination_name}
              </div>
              <span className="text-sm text-slate-500">
                <span className="font-medium">
                  {getDaysUntilTakeOff(
                    differenceInDays(trip.start_date, new Date())
                  )}{" "}
                </span>
                until takeoff
              </span>
            </Link>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 flex justify-center items-center gap-2"
            fullwidth
          >
            <PlusIcon width={18} />
            <span className="text-sm">Add new trip</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function getDaysUntilTakeOff(difference: number) {
  if (difference === 0) {
    return "Today";
  }

  if (difference === 1) {
    return "Tomorrow";
  }

  return `${difference} days`;
}
