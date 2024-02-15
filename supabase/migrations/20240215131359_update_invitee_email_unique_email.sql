alter table "public"."invitations" drop constraint "invitations_invitee_email_fkey";

CREATE UNIQUE INDEX invitations_invitee_email_key ON public.invitations USING btree (invitee_email);

alter table "public"."invitations" add constraint "invitations_invitee_email_key" UNIQUE using index "invitations_invitee_email_key";


