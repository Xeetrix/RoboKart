export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl section-spacing container-padding">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-40 rounded-full bg-sky-100" />
        <div className="h-12 w-3/4 rounded-2xl bg-zinc-100" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-80 rounded-3xl bg-zinc-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
