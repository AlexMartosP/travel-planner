echo "Starting Supabase"

supabase start

echo "Creating activities storage bucket"

ts-node ./createStorageBucket.ts
