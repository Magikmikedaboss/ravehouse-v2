import GearHero from "@/components/sections/gear/GearHero";
import GearGrid from "@/components/sections/gear/GearGrid";

export const metadata = {
  title: 'Gear | Ravehouse',
  description: 'Essential rave gear and equipment for the underground Las Vegas party scene. From glow products to festival essentials, find everything you need to survive the night.',
  openGraph: {
    title: 'Gear | Ravehouse',
    description: 'Essential rave gear and equipment for the underground Las Vegas party scene. From glow products to festival essentials, find everything you need to survive the night.',
  },
};

export default function GearPage() {
  return (
    <div className="space-y-6 pb-16">
      <GearHero />
      <GearGrid />
    </div>
  );
}