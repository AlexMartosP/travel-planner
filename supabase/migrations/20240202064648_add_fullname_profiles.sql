alter table "public"."Profiles" add column "full_name" text;

alter table "public"."Profiles" alter column "first_name" drop not null;

alter table "public"."Profiles" alter column "last_name" drop not null;


