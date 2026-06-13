import Image from "next/image";

export function ProductImage({ src, alt }: { src: string | null; alt: string }) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />;
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-deepBlue to-sky-700 p-6 text-center text-white">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -left-8 top-6 h-24 w-24 rounded-full bg-skyAccent/30 blur-2xl" />
      <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full bg-white/15 blur-xl" />
      <div className="relative rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-3xl font-black shadow-2xl backdrop-blur">RK</div>
    </div>
  );
}
