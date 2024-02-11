alter table "public"."Profiles" disable row level security;

alter table "public"."Trips" disable row level security;

alter table "public"."trips_profiles" disable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile_for_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
    insert into public."Profiles"(id, email, full_name)
    values(new.id, new.email, new.raw_user_meta_data ->> 'full_name');
    return new;
end;$function$
;


