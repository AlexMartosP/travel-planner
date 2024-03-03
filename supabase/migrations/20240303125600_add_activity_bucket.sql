create policy "Only users with access to activity xvopv1_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'activities'::text) AND (auth.uid() IN ( SELECT trips_profiles.profile_id
   FROM (activites
     JOIN trips_profiles ON ((activites.trip_id = trips_profiles.trip_id)))
  WHERE (activites.id = ((storage.foldername(objects.name))[1])::uuid)))));


create policy "Only users with access to activity xvopv1_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'activities'::text) AND (auth.uid() IN ( SELECT trips_profiles.profile_id
   FROM (activites
     JOIN trips_profiles ON ((activites.trip_id = trips_profiles.trip_id)))
  WHERE (activites.id = ((storage.foldername(objects.name))[1])::uuid)))));


create policy "Only users with access to activity xvopv1_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'activities'::text) AND (auth.uid() IN ( SELECT trips_profiles.profile_id
   FROM (activites
     JOIN trips_profiles ON ((activites.trip_id = trips_profiles.trip_id)))
  WHERE (activites.id = ((storage.foldername(objects.name))[1])::uuid)))));


create policy "Only users with access to activity xvopv1_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'activities'::text) AND (auth.uid() IN ( SELECT trips_profiles.profile_id
   FROM (activites
     JOIN trips_profiles ON ((activites.trip_id = trips_profiles.trip_id)))
  WHERE (activites.id = ((storage.foldername(objects.name))[1])::uuid)))));



