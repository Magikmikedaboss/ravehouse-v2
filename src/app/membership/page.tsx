import MembershipHero from "@/components/sections/membership/MembershipHero";
import MembershipTiers from "@/components/sections/membership/MembershipTiers";
import MembershipFAQ from "@/components/sections/membership/MembershipFAQ";

export default function MembershipPage() {
  return (
    <div className="space-y-10 pb-16">
      <MembershipHero />
      <section className="px-4 lg:px-6 space-y-8">
        <MembershipTiers />
        <MembershipFAQ />
      </section>
    </div>
  );
}