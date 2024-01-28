alter table "public"."Activites" alter column "do_date" set data type timestamp with time zone using "do_date"::timestamp with time zone;

alter table "public"."Profiles" add column "email" text not null;

alter table "public"."Profiles" add column "first_name" text not null;

alter table "public"."Profiles" add column "last_name" text not null;


