import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

const activity_images = [
  "eiffel_tower.jpg",
  "louvre_museum.jpg",
  "park_guell.jpg",
  "segrada_familia.jpg",
  "van_gogh_museum.jpg",
];

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

(async function run() {
  const { error } = await supabase.storage.createBucket("activities", {
    public: false,
    allowedMimeTypes: ["image/jpg", "image/png"],
    fileSizeLimit: 204800,
  });

  if (error) {
    console.log("Error while creating storage bucket");
    console.log(error);
    process.exit(1);
  }

  for (let image of activity_images) {
    console.log("Uplaoding: " + image);
    const file = await fs.readFile(
      path.resolve(`./activites/${image}`),
      "base64"
    );
    const { error } = await supabase.storage
      .from("activities")
      .upload(`activites/${image}`, file, { contentType: "image/jpg" });

    if (error) {
      console.log("Error while uploading: " + image);
      console.log(error);
      process.exit(1);
    }
  }
})();
