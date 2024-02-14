create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "first_name" text null,
    "last_name" text null,
    "full_name" text null,
    constraint profiles_pkey primary key (id),
    constraint profiles_email_key unique (email),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
  );

  create table "public"."trips" (
    "id" uuid not null default gen_random_uuid (),
    "created_at" timestamp with time zone not null default now(),
    "destination_name" text not null,
    "start_date" date not null,
    "end_date" date null,
    "description" text null,
    constraint trips_pkey primary key (id)
  );

  create table "public"."trips_profiles" (
    "trip_id" uuid not null,
    "profile_id" uuid not null,
    constraint trips_profiles_pkey primary key (trip_id, profile_id),
    constraint trips_profiles_profile_id_fkey foreign key (profile_id) references profiles (id) on delete cascade,
    constraint trips_profiles_trip_id_fkey foreign key (trip_id) references trips (id) on delete cascade
  );

  create table "public"."activites" (
    "id" uuid not null default gen_random_uuid (),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "description" text null,
    "do_date" timestamp with time zone null,
    "done" boolean not null default false,
    "address" text null,
    "image_path" text null,
    "trip_id" uuid not null,
    constraint activites_pkey primary key (id),
    constraint activites_trip_id_fkey foreign key (trip_id) references trips (id) on delete cascade
  );

  create table "public"."invitations" (
    "id" uuid not null default gen_random_uuid (),
    "created_at" timestamp with time zone not null default now(),
    "invitee_email" text not null,
    "trip_id" uuid not null,
    "has_expired" boolean not null default false,
    constraint invitations_pkey primary key (id),
    constraint invitations_invitee_email_fkey foreign key (invitee_email) references profiles (email),
    constraint invitations_trip_id_fkey foreign key (trip_id) references trips (id) on delete cascade
  );

CREATE OR REPLACE FUNCTION public.create_profile_for_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
    insert into public."profiles"(id, email, full_name)
    values(new.id, new.email, new.raw_user_meta_data ->> 'full_name');
    return new;
end;$function$
;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_profile_for_user();
