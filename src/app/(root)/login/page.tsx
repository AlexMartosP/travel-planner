import { LoginWithGoogle } from "@/app/(root)/login/LoginButtons/LoginWithGoogle";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirectTo?: string };
}) {
  return (
    <div className="grid place-items-center h-full">
      <LoginWithGoogle redirectTo={searchParams.redirectTo} />
    </div>
  );
}
