// src/app/blog/page.tsx
// Phase 1: Blog index page - "The Circuit"

export default function BlogPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">The Circuit</h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Ravehouse editorial hub. Stories from the underground, gear guides, and the latest from the scene.
        </p>
      </div>

      {/* TODO: Add BlogHero, BlogList components */}
      <div className="text-center text-white/50">
        <p>🚧 Blog content coming in Phase 1 implementation</p>
      </div>
    </div>
  );
}