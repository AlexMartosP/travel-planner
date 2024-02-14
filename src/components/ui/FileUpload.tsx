import { UploadIcon } from "lucide-react";
import Image from "next/image";

export function FileUpload({
  name,
  accept,
  alt,
  imageSrc,
  onChange,
  width,
  height,
}: {
  name?: string;
  accept?: string;
  imageSrc?: string;
  onChange: (file: File) => void;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <div className="relative w-full aspect-video border-2 border-dashed rounded-md overflow-clip p-2 grid items-center">
      <input
        type="file"
        name={name}
        accept={accept}
        className="opacity-0 absolute top-0 left-0 w-full h-full"
        onChange={(e) => {
          if (e.target.files) {
            onChange(e.target.files[0]);
          }
        }}
      />
      {imageSrc ? (
        <Image
          className="rounded-md w-full h-full object-cover"
          src={imageSrc}
          width={width}
          height={height}
          alt={alt}
        />
      ) : (
        <div className="grid gap-2 justify-items-center text-center">
          <UploadIcon />
          <span className="text-sm text-slate-400">No image selected</span>
        </div>
      )}
    </div>
  );
}
