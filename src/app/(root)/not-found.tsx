import Link from "next/link";

export default function TripNotFound() {
  return (
    <div className="pt-32 grid gap-2">
      <div className="text-4xl">404</div>
      <h2>Could not find the resource</h2>
      <Link href="/" className="underline text-sm text-slate-500">
        Return home
      </Link>
    </div>
  );
}
