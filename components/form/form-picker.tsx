"use client";

import defaultPics from "@/constants/defaultPics";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { CircleCheckBig, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await unsplash().photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (data && data.response) {
          const img = data.response as Array<Record<string, any>>;
          setImages(img);
        } else {
          console.error("Failed to get images");
        }
      } catch (err) {
        setImages(defaultPics);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative mt-4">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((img) => (
          <div
            key={img.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(img.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />
            <Image
              fill
              src={img.urls.thumb}
              alt="unsplash image"
              className="object-cover rounded-sm"
            />
            {selectedImageId === img.id && (
              <div className="absolute h-full w-full bg-black/30 p-2">
                <CircleCheckBig className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={img.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute 
              bottom-0 w-full text-[10px] truncate text-white 
              hover:underline p-1 bg-black/50"
            >
              {img.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
}
