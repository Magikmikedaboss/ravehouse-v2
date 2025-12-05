import GearHero from "@/components/sections/gear/GearHero";
import GearGrid from "@/components/sections/gear/GearGrid";

export default function GearPage() {
  return (
    <div className="space-y-6 pb-16">
      <GearHero />
      <GearGrid />
    </div>
  );
}