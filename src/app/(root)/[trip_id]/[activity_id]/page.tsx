import { DeleteActivity } from "@/app/(root)/[trip_id]/[activity_id]/components/DeleteActivity";
import { DoneButton } from "@/app/(root)/[trip_id]/[activity_id]/components/DoneButton";
import { EditActivity } from "@/app/(root)/[trip_id]/[activity_id]/components/EditActivity";
import { currentUserHasAccessToTrip } from "@/app/api/trips/access";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getFileUrl } from "@/data/storage";
import { createSupabaseClient } from "@/db/client";
import { formateDate } from "@/utils/formaters";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ActivityPage({
  params,
}: {
  params: { trip_id: string; activity_id: string };
}) {
  const hasAccess = await currentUserHasAccessToTrip(params.trip_id);

  if (!hasAccess) {
    return notFound();
  }

  const supabase = createSupabaseClient(cookies());

  // Promise.all
  const trip = await supabase
    .from("trips")
    .select("destination_name, id")
    .eq("id", params.trip_id)
    .single();
  console.log(trip);
  const activity = await supabase
    .from("activites")
    .select("*")
    .eq("id", params.activity_id)
    .single();

  if (
    trip.status === 404 ||
    activity.status === 404 ||
    !trip.data ||
    !activity.data
  ) {
    return notFound();
  }

  const imageUrl =
    activity.data.image_path &&
    getFileUrl({
      bucket: "activities",
      filePath: activity.data.image_path,
    });

  return (
    <div className="pt-32">
      <Breadcrumbs
        items={[
          {
            label: trip.data.destination_name,
            href: `/${trip.data.id}`,
          },
          {
            label: activity.data.title,
            href: "",
          },
        ]}
      />
      <div className="mt-4">
        {imageUrl && (
          <div className="w-full h-72">
            <Image
              className="w-full h-full object-cover rounded-md"
              src={imageUrl}
              width={600}
              height={400}
              alt={activity.data.title}
            />
          </div>
        )}
      </div>
      <h1 className="mt-2">{activity.data.title}</h1>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-slate-500">
          {activity.data.do_date
            ? formateDate({ date: activity.data.do_date })
            : "No date"}
        </span>
        <DoneButton
          tripId={trip.data.id}
          activityId={activity.data.id}
          initialDone={activity.data.done}
        />
      </div>
      <span className="text-sm text-slate-500">{activity.data.address}</span>
      <p className="mt-2">{activity.data.description}</p>
      <div className="flex gap-1 items-center mt-4">
        <EditActivity
          activity={activity.data}
          tripId={trip.data.id}
          activityImageUrl={imageUrl || ""}
        />
        <DeleteActivity activity={activity.data} tripId={trip.data.id} />
      </div>
    </div>
  );
}
