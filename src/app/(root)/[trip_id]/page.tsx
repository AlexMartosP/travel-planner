import { ActivityItem } from "@/app/(root)/[trip_id]/components/ActivityItem";
import { AddActivity } from "@/app/(root)/[trip_id]/components/AddActivity";
import { TripOptions } from "@/app/(root)/[trip_id]/components/TripOptions";
import { currentUserHasAccessToTrip } from "@/app/api/trips/access";
import { getTripWithActivities } from "@/app/api/trips/selections";
import { formateDate } from "@/utils/formaters";
import { ArrowLeft, PlaneLandingIcon, PlaneTakeoffIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TripPage({
  params,
}: {
  params: { trip_id: string };
}) {
  const hasAccess = await currentUserHasAccessToTrip(params.trip_id);

  if (!hasAccess) {
    return notFound();
  }

  const trips = await getTripWithActivities(params.trip_id);

  if (trips.status === 404 || !trips.data) {
    notFound();
  }

  const trip = trips.data;

  return (
    <div>
      <div className="sticky top-0 left-0 right-0 pt-32 pb-4 bg-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div>
            <ArrowLeft width={18} />
          </div>
          <div>Back to trips</div>
        </Link>
        <div className="flex justify-between mt-4">
          <div>
            <h1>{trip.destination_name}</h1>
            <p>{trip.description}</p>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <PlaneTakeoffIcon width={18} />
                <span className="text-sm text-slate-500">
                  {formateDate({ date: trip.start_date })}{" "}
                </span>
              </div>
              {trip.end_date && (
                <div className="flex gap-2 items-center">
                  <PlaneLandingIcon width={17} />
                  <span className="text-sm text-slate-500">
                    {formateDate({ date: trip.end_date })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <TripOptions trip={trip} />
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-12 mb-32">
        {trip.activites.length > 0 ? (
          trip.activites.map((activity) => (
            <ActivityItem
              key={activity.id}
              tripId={trip.id}
              activity={activity}
            />
          ))
        ) : (
          <p>No activites yet</p>
        )}
      </div>
      <AddActivity tripId={trip.id} />
    </div>
  );
}
