import { BannerImage } from "@/app/[trip_id]/[activity_id]/BannerImage";
import { DeleteActivity } from "@/app/[trip_id]/[activity_id]/DeleteActivity";
import { EditActivity } from "@/app/[trip_id]/[activity_id]/EditActivity";
import { getFileUrl } from "@/app/api/getters";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { createSupabaseClient } from "@/db/client";
import { formateDate } from "@/utils/formaters";
import { CheckIcon, XIcon } from "lucide-react";
import { cookies } from "next/headers";

export default async function ActivityPage({
  params,
}: {
  params: { trip_id: string; activity_id: string };
}) {
  const supabase = createSupabaseClient(cookies());

  // Promise.all
  const trip = await supabase
    .from("Trips")
    .select("destination_name, id")
    .eq("id", params.trip_id)
    .single();
  const activity = await supabase
    .from("Activites")
    .select("*")
    .eq("id", params.activity_id)
    .single();

  const notFound = trip.status === 404 || activity.status === 404;

  if (notFound || !trip.data || !activity.data) {
    return <div>Not found</div>;
  }

  const activityImage =
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
        {activity.data.image_path && (
          <BannerImage
            path={activity.data.image_path}
            alt={activity.data.title}
          />
        )}
      </div>
      <h1 className="mt-2">{activity.data.title}</h1>

      <div className="flex gap-2 items-center">
        <span className="text-sm text-slate-500">
          {activity.data.do_date
            ? formateDate({ date: activity.data.do_date })
            : "No date"}
        </span>
        <div className="flex gap-1 items-center px-2 py-1 bg-slate-300/50 rounded-full">
          <div>
            {activity.data.done ? (
              <CheckIcon width={13} height={13} />
            ) : (
              <XIcon width={13} height={13} />
            )}
          </div>
          <div className="text-xs">
            {activity.data.done ? "Done" : "Not done"}
          </div>
        </div>
      </div>
      <span className="text-sm text-slate-500">{activity.data.address}</span>
      <p className="mt-2">{activity.data.description}</p>
      <div className="flex gap-1 items-center mt-4">
        <EditActivity
          activity={activity.data}
          tripId={trip.data.id}
          activityImageUrl={activityImage || ""}
        />
        <DeleteActivity activity={activity.data} tripId={trip.data.id} />
      </div>
    </div>
  );
}
