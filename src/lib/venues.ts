// src/lib/venues.ts
export type VenueCategory =
  | "Underground"
  | "After-Hours"
  | "Downtown"
  | "Rooftop"
  | "Immersive"
  | "Massive"
  | "Cult Classic";

export type Venue = {
  slug: string;
  name: string;
  category: VenueCategory[];
  categories?: VenueCategory[]; // Support both field names for backward compatibility
  area: string;
  addressHint?: string;
  vibeTags: string[];
  short: string;
  bestFor: string | string[];
  intensity: 1 | 2 | 3 | 4 | 5; // 1 chill -> 5 feral
  priceHint: "Free-ish" | "Low" | "Mid" | "High" | "Varies";
  affiliateNearby?: boolean;
  proTips?: string[];
  safetyNote?: string;
  heroGradient?: "pink" | "cyan" | "purple" | "orange";
};

export const VENUES: Venue[] = [
  {
    slug: "the-space",
    name: "The Space",
    category: ["Downtown"],
    area: "Westside / Arts District-ish",
    vibeTags: ["Intimate", "Live", "Performance"],
    short: "Small-room magic for live music and theater nights.",
    bestFor: "Pre-rave shows, date nights, smaller crews",
    intensity: 2,
    priceHint: "Mid",
    affiliateNearby: true,
    heroGradient: "purple",
  },
  {
    slug: "las-vegas-festival-grounds",
    name: "Las Vegas Festival Grounds",
    category: ["Massive"],
    area: "Strip corridor",
    vibeTags: ["Outdoor", "Big Stage", "Festival"],
    short: "Wide-open, large-scale concerts and festival production.",
    bestFor: "Big headliners, festival weekends",
    intensity: 4,
    priceHint: "Varies",
    affiliateNearby: true,
    heroGradient: "cyan",
  },
  {
    slug: "underground-speakeasy-distillery",
    name: "The Underground Speakeasy & Distillery",
    category: ["Cult Classic", "Downtown"],
    area: "Downtown (Mob Museum)",
    addressHint: "Downtown LV near Mob Museum",
    vibeTags: ["Hidden", "Cocktails", "Historic"],
    short: "A secret-feeling bar with old-world energy and strong pours.",
    bestFor: "Pre-game rituals, classy chaos",
    intensity: 2,
    priceHint: "Mid",
    affiliateNearby: true,
    heroGradient: "orange",
    proTips: [
      "Ask for their off-menu cocktails - they're worth it.",
      "Go early if you want to actually hear your friends talk.",
      "The entrance is deliberately hard to find - look for the subtle signage."
    ],
  },
  {
    slug: "starbase-las-vegas",
    name: "StarBase Las Vegas",
    category: ["Immersive"],
    area: "Varies",
    vibeTags: ["Futuristic", "Immersive", "Experimental"],
    short: "A futuristic immersive event space built for sensory nights.",
    bestFor: "Art-meets-bass, experimental crews",
    intensity: 3,
    priceHint: "Varies",
    affiliateNearby: true,
    heroGradient: "cyan",
    proTips: [
      "Wear comfortable clothes - you might be moving through different environments.",
      "Check their event schedule - each night has a different theme.",
      "Bring friends who are open to weird experiences."
    ],
  },
  {
    slug: "1st-street-stage",
    name: "1st Street Stage",
    category: ["Downtown"],
    area: "Fremont Street Experience",
    addressHint: "Fremont Street Experience",
    vibeTags: ["Street", "Live", "Crowds"],
    short: "Fremont energy: loud, bright, and full of motion.",
    bestFor: "People-watching, live sets, warm-up laps",
    intensity: 3,
    priceHint: "Free-ish",
    affiliateNearby: true,
    heroGradient: "pink",
  },
  {
    slug: "sphere",
    name: "Sphere",
    category: ["Immersive", "Massive"],
    area: "Near Venetian",
    addressHint: "Near Venetian Resort",
    vibeTags: ["High-Tech", "Iconic", "Overwhelming"],
    short: "A high-tech immersion monster. Huge visuals. Huge feelings.",
    bestFor: "Tourists + tech-heads + 'we need one big night'",
    intensity: 4,
    priceHint: "High",
    affiliateNearby: true,
    heroGradient: "cyan",
    proTips: [
      "Book tickets way in advance - this place sells out fast.",
      "Prepare for sensory overload - it's intense by design.",
      "The experience varies wildly by show, so check what's playing."
    ],
  },
  {
    slug: "club-ego-afterhours",
    name: "Club EGO Afterhours",
    category: ["After-Hours", "Underground"],
    area: "Varies",
    addressHint: "Text-drop / rotating",
    vibeTags: ["Late", "Underground", "No Sleep"],
    short: "When the city taps out, this place keeps talking in bass.",
    bestFor: ["After-hours crews", "Night-owls", "Post-rave lingerers"],
    intensity: 5,
    priceHint: "Mid",
    affiliateNearby: true,
    heroGradient: "orange",
    proTips: [
      "Eat something before you go. After-hours time dilates.",
      "Have a ride plan before you arrive. Don't freestyle it at 4AM.",
      "Respect the room: consent-forward, no sloppy behavior."
    ],
    safetyNote: "After-hours spaces can be intense. Know your limits and travel smart.",
  },
  {
    slug: "jalisco-underground",
    name: "Jalisco Underground",
    category: ["Underground"],
    area: "Varies",
    vibeTags: ["Raw", "Local", "Bass"],
    short: "Low-light lounge energy with a raw underground edge.",
    bestFor: "Locals, smaller groups, vibey late nights",
    intensity: 4,
    priceHint: "Low",
    affiliateNearby: true,
    heroGradient: "purple",
    proTips: [
      "Show up with a local or someone who knows the scene.",
      "Cash-friendly - not all cards work everywhere.",
      "Dress down rather than up - this isn't a show-off spot."
    ],
  },
  {
    slug: "we-all-scream",
    name: "We All Scream",
    category: ["Downtown", "Rooftop"],
    area: "Downtown / Fremont",
    addressHint: "Downtown LV",
    vibeTags: ["Rooftop", "Loud", "Playful"],
    short: "Ice cream downstairs, rooftop dance floor upstairs. Chaos, curated.",
    bestFor: ["Birthday squads", "Tourists", "High-energy nights"],
    intensity: 4,
    priceHint: "Mid",
    affiliateNearby: true,
    heroGradient: "pink",
    proTips: [
      "Go earlier if you want room to move; later gets packed fast.",
      "Rooftop wind can be real. Bring a layer if you're sensitive.",
      "If you're meeting friends, pick a landmark spot immediately."
    ],
    safetyNote: "Hydrate and plan your ride. Downtown nights can stretch long.",
  },
  {
    slug: "area15",
    name: "AREA15",
    category: ["Immersive"],
    area: "West of Strip",
    addressHint: "Just off the Strip",
    vibeTags: ["Art", "Immersive", "Nightlife"],
    short: "Immersive art + music + nightlife in one neon labyrinth.",
    bestFor: ["Groups", "First-time visitors", "'let's do something different'"],
    intensity: 3,
    priceHint: "Varies",
    affiliateNearby: true,
    heroGradient: "cyan",
    proTips: [
      "Wear comfy shoes. You'll wander more than you think.",
      "Book immersive experiences ahead on busy weekends.",
      "Pair with a downtown after-hours plan if you want the late-late."
    ],
  },
  {
    slug: "commonwealth",
    name: "Commonwealth",
    category: ["Downtown", "Rooftop", "Cult Classic"],
    area: "Downtown",
    addressHint: "Downtown LV",
    vibeTags: ["Rooftop", "Speakeasy", "Views"],
    short: "Downtown rooftop with a hidden-speakeasy heartbeat.",
    bestFor: ["Rooftop warm-up", "Date nights", "Elevated pre-game"],
    intensity: 3,
    priceHint: "Mid",
    affiliateNearby: true,
    heroGradient: "purple",
    proTips: [
      "Show up with a plan: rooftop first, then decide if you're going deeper.",
      "Keep your group tight when it's busy to avoid the 'lost crew' spiral.",
      "If you want quiet conversation, arrive earlier."
    ],
  },
  {
    slug: "double-down-saloon",
    name: "Double Down Saloon",
    category: ["Cult Classic"],
    area: "Near Strip",
    addressHint: "Near Strip",
    vibeTags: ["Punk", "Dive", "Legend"],
    short: "Iconic punk dive bar energy. Sticky floors. Pure personality.",
    bestFor: "Old Vegas grit, pre-game shots, loud laughs",
    intensity: 3,
    priceHint: "Low",
    affiliateNearby: true,
    heroGradient: "orange",
    proTips: [
      "Embrace the chaos - this place is legendary for a reason.",
      "Cash is king here.",
      "Don't wear anything you're precious about."
    ],
  },
];

export const VENUE_FILTERS: { label: string; value: VenueCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Underground", value: "Underground" },
  { label: "After-Hours", value: "After-Hours" },
  { label: "Downtown", value: "Downtown" },
  { label: "Rooftop", value: "Rooftop" },
  { label: "Immersive", value: "Immersive" },
  { label: "Massive", value: "Massive" },
  { label: "Cult Classic", value: "Cult Classic" },
];

export function intensityLabel(n: Venue["intensity"]) {
  if (n <= 2) return "Chill";
  if (n === 3) return "Turn-up";
  if (n === 4) return "Wild";
  return "After-hours feral";
}

export function gradientClass(g: Venue["heroGradient"]) {
  switch (g) {
    case "pink":
      return "from-rh-pink via-rh-purple to-rh-cyan";
    case "cyan":
      return "from-rh-cyan via-rh-purple to-rh-pink";
    case "purple":
      return "from-rh-purple via-rh-pink to-rh-cyan";
    case "orange":
      return "from-rh-orange via-rh-pink to-rh-purple";
    default:
      return "from-rh-cyan via-rh-purple to-rh-pink";
  }
}