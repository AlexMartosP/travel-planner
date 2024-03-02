import { AddTrip } from "@/app/(root)/components/AddTrip";
import { SignoutButton } from "@/app/(root)/components/SignoutButton";
import { createSupabaseClient } from "@/db/client";
import { differenceInDays } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = createSupabaseClient(cookies());

  const { data, error } = await supabase.auth.getUser();

  // Promise.all
  const futureTrips = await supabase
    .from("trips")
    .select("*, profiles!inner(*)")
    .eq("profiles.id", data.user!.id)
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true });

  const previousTrips = await supabase
    .from("trips")
    .select("*, profiles!inner(*)")
    .eq("profiles.id", data.user!.id)
    .lt("start_date", new Date().toISOString())
    .order("start_date", { ascending: false });

  return (
    <div className="pt-32">
      <div>
        <h1>Welcome back, {data.user?.user_metadata.full_name}!</h1>
        <SignoutButton />
        <div className="mt-12">
          {futureTrips.data?.map((trip) => (
            <Link
              href={`/${trip.id}`}
              key={trip.id}
              className="group flex justify-between items-center"
            >
              <div className="underline underline-offset-2 decoration-slate-300 group-hover:decoration-slate-500 transition">
                {trip.destination_name}
              </div>
              <span className="text-sm text-slate-500 font-medium">
                {getDaysUntilTakeOff(
                  differenceInDays(trip.start_date, new Date())
                )}
              </span>
            </Link>
          ))}
          <AddTrip />
        </div>
        <div className="mt-12">
          <h2>Previous trips</h2>
          <div className="mt-2">
            {previousTrips.data?.map((trip) => (
              <Link
                href={`/${trip.id}`}
                key={trip.id}
                className="group flex justify-between items-center"
              >
                <div className="underline underline-offset-2 decoration-slate-300 group-hover:decoration-slate-500 transition">
                  {trip.destination_name}
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  {pluralize({
                    value: differenceInDays(new Date(), trip.start_date),
                    singular: "day",
                    plural: "days",
                  })}{" "}
                  ago
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function pluralize({
  value,
  singular,
  plural,
}: {
  value: number;
  singular: string;
  plural: string;
}) {
  return `${value} ${value > 1 ? plural : singular}`;
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
