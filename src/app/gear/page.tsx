// src/app/gear/page.tsx
// OPTIONAL: Rave gear / affiliate hub

export default function GearPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Rave Gear</h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Essential gear for the underground. Curated recommendations and affiliate links.
        </p>
      </div>

      {/* TODO: Add gear catalog, affiliate links */}
      <div className="text-center text-white/50">
        <p>🚧 Gear hub coming in future implementation</p>
      </div>
    </div>
  );
}