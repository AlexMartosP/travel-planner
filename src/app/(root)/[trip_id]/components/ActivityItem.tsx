import { DoneIconButton } from "@/app/(root)/[trip_id]/components/DoneIconButton";
import { getFileUrl } from "@/data/storage";
import { Tables } from "@/db/types";
import { formateDate } from "@/utils/formaters";
import Image from "next/image";
import Link from "next/link";

export function ActivityItem({
  tripId,
  activity,
}: {
  tripId: number;
  activity: Tables<"Activites">;
}) {
  const imageUrl =
    activity.image_path &&
    getFileUrl({
      bucket: "activities",
      filePath: activity.image_path,
    });

  return (
    <Link
      key={activity.id}
      href={`/${tripId}/${activity.id}`}
      className="flex justify-between items-center p-2 -ml-2 rounded-md hover:bg-slate-200 transition-all group"
    >
      <div className="flex-1 flex gap-2 items-center">
        {imageUrl && (
          <div className="w-20 aspect-square ">
            <Image
              className="w-full h-full object-cover rounded-md"
              src={imageUrl}
              width={400}
              height={400}
              alt="Test"
            />
          </div>
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
      </div>
      <DoneIconButton
        tripId={tripId}
        activityId={activity.id}
        initialDone={activity.done}
      />
    </Link>
  );
}
