import Image from "next/image";
import type { BlogImage } from "@/lib/blog";

export default function ContentImage({ image }: { image?: BlogImage }) {
  if (!image?.src) return null;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={1200}
      height={800}
      sizes="(max-width: 768px) 100vw, 800px"
      className="my-5 max-h-[32rem] w-full rounded-2xl object-contain"
    />
  );
}
