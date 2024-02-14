// import { ActivityDrawer } from "@/app/[trip_id]/components/ActivityDrawer";
import { ActivityImage } from "@/app/[trip_id]/components/ActivityImage";
import { AddActivity } from "@/app/[trip_id]/components/AddActivity";
import { TripOptions } from "@/app/[trip_id]/components/TripOptions";
import { getTripWithActivities } from "@/app/[trip_id]/data";
import { formateDate } from "@/utils/formaters";
import { ArrowLeft, PlaneLandingIcon, PlaneTakeoffIcon } from "lucide-react";
import Link from "next/link";

export default async function TripPage({
  params,
  searchParams,
}: {
  params: { trip_id: string };
  searchParams: { activity: string };
}) {
  const trips = await getTripWithActivities(params.trip_id);

  if (trips.status === 404 || !trips.data) {
    return <div>Not found</div>;
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
        {trip.Activites.map((activity) => (
          <Link
            key={activity.id}
            href={`/${params.trip_id}/${activity.id}`}
            className="flex gap-2 items-center p-2 -ml-2 rounded-md hover:bg-slate-200 transition-all"
          >
            {activity.image_path && (
              <ActivityImage path={activity.image_path} />
            )}
            <div>
              <h2 className="font-medium">{activity.title}</h2>
              <p>{activity.description}</p>
              <div>
                <span className="text-sm text-slate-400">
                  {activity.do_date
                    ? formateDate({ date: activity.do_date })
                    : "No date"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <AddActivity tripId={trip.id} />
    </div>
  );
}
