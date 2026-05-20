import {
  BadgeCheck,
  CalendarHeart,
  Camera,
  Handshake,
  MapPin,
  Music2,
  Network,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const navItems = [
  { label: "Services", href: "#services" },
  { label: "Events", href: "#events" },
  { label: "Community", href: "#community" },
  { label: "About us", href: "#about" },
];

export const socialLinks = {
  whatsapp: "https://wa.me/2340000000000",
  instagram: "https://instagram.com/bitzsznn",
  email: "hello@bitzsznn.com",
};

export const stats = [
  {
    value: "500+",
    label: "Community members",
    body: "A growing circle of ambitious, culturally plugged-in young people.",
  },
  {
    value: "30+",
    label: "Events thrown",
    body: "From intimate rooftop nights to high-energy cultural moments.",
  },
  {
    value: "4+",
    label: "States reached",
    body: "We have moved through multiple states and keep expanding.",
  },
  {
    value: "50+",
    label: "Collaborations secured",
    body: "Partnerships with artists, creators, startups, and local brands.",
  },
];

export const values = [
  {
    icon: UsersRound,
    title: "Community first",
    body: "Every Bitzsznn moment is built to help young people meet, belong, and leave with stronger connections.",
  },
  {
    icon: Sparkles,
    title: "Vibes with value",
    body: "We keep the energy high while opening doors to people, partners, ideas, and opportunity.",
  },
  {
    icon: Camera,
    title: "Memories that travel",
    body: "From camp stories to post-NYSC transitions, we create moments people carry into their next season.",
  },
  {
    icon: Handshake,
    title: "Culture that connects",
    body: "We bring music, entertainment, creators, and brands into experiences that feel current and human.",
  },
];

export const services = [
  {
    number: "01/",
    title: "Events & nightlife experiences",
    body: "Concept, curation, guest flow, energy, and production for cultural nights people remember.",
    icon: Music2,
  },
  {
    number: "02/",
    title: "NYSC & post-NYSC community",
    body: "Moments for corps members, fresh graduates, and young professionals moving into what comes next.",
    icon: UsersRound,
  },
  {
    number: "03/",
    title: "Brand & artist collaborations",
    body: "Meaningful access to a young audience through activations, hosting, music, creators, and launch moments.",
    icon: BadgeCheck,
  },
  {
    number: "04/",
    title: "Content & cultural storytelling",
    body: "Photo, video, recaps, and stories that turn one night into a memory people share after the lights come up.",
    icon: Camera,
  },
  {
    number: "05/",
    title: "Networking & opportunity access",
    body: "Curated rooms where fun meets ambition: founders, creatives, students, corps members, and builders.",
    icon: Network,
  },
];

export const reasons = [
  {
    title: "Built for the transition season",
    body: "Bitzsznn understands the space between school, service year, first jobs, new cities, and new circles.",
  },
  {
    title: "Premium energy, local pulse",
    body: "The experience feels elevated without losing the warmth, sound, language, and rhythm of youth culture.",
  },
  {
    title: "Partnership-ready",
    body: "Brands, creators, artists, and communities can plug into an audience that actually shows up.",
  },
];

export const eventHighlights = [
  "Curated music and guest experiences",
  "Photo-ready memories and recap content",
  "Rooms designed for connection, not just attendance",
  "Access for partners, creators, and emerging brands",
];

export const faqs = [
  {
    question: "What is Bitzsznn?",
    answer:
      "Bitzsznn is a youth cultural community brand built around NYSC and post-NYSC lifestyle, entertainment, music, events, memories, connection, and opportunity.",
  },
  {
    question: "Is Bitzsznn only about parties?",
    answer:
      "No. The party is one expression of the brand, but the deeper work is connection: helping young people meet, transition, collaborate, and create shared memories.",
  },
  {
    question: "Who is Bitzsznn for?",
    answer:
      "Corps members, recent graduates, young professionals, creatives, founders, artists, and culturally plugged-in people looking for good energy and real access.",
  },
  {
    question: "How can I join the community?",
    answer:
      "Join through our WhatsApp or Instagram community links, attend an event, or connect with us during a Bitzsznn activation.",
  },
  {
    question: "Can Bitzsznn plan or host my event?",
    answer:
      "Yes. We can collaborate on event concepts, hosting, audience building, experiences, and brand activations.",
  },
  {
    question: "Can brands partner with Bitzsznn?",
    answer:
      "Yes. We work with brands that want credible access to youth culture through events, content, creators, and community moments.",
  },
];

export const ticketTiers = [
  {
    id: "early",
    name: "Early Vibe",
    price: 5000,
    description: "Entry access for the people who move first.",
    perks: ["General entry", "Community wristband", "Event photo access"],
  },
  {
    id: "standard",
    name: "Main Experience",
    price: 10000,
    description: "The full Bitzsznn night with priority entry.",
    perks: ["Priority entry", "Welcome drink", "Photo booth access"],
    featured: true,
  },
  {
    id: "crew",
    name: "Crew Pass",
    price: 45000,
    description: "Five-person access for your people.",
    perks: ["5 entries", "Reserved crew check-in", "Group photo moment"],
  },
  {
    id: "partner",
    name: "Partner Table",
    price: 150000,
    description: "Premium table access for brands and hosted groups.",
    perks: ["Table for 6", "Bottle service starter", "Brand mention option"],
  },
];

export const upcomingEvent = {
  title: "The Bitzsznn Experience",
  date: "Next cultural night",
  location: "Lagos, Nigeria",
  icon: CalendarHeart,
  pinIcon: MapPin,
};
