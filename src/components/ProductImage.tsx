import Image from "next/image";

export function ProductImage({ src, alt }: { src: string | null; alt: string }) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-50 via-sky-50 to-blue-50 p-6 text-center">
      <div className="rounded-2xl bg-ink px-5 py-4 text-2xl font-black text-white">RK</div>
    </div>
  );
}
