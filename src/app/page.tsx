import HomeHero from "@/components/sections/home/HomeHero";
import UpcomingEvents from "@/components/sections/home/UpcomingEvents";
import ThisIsRavehouse from "@/components/sections/home/ThisIsRavehouse";
import AfterglowGallery from "@/components/sections/home/AfterglowGallery";

export default function HomePage() {
  return (
    <div className="space-y-10 pb-10">
      <HomeHero />
      <UpcomingEvents />
      <ThisIsRavehouse />
      <AfterglowGallery />
    </div>
  );
}
