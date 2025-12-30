import { MapPin, Home, TrendingUp, ShieldCheck } from 'lucide-react';
import { CategoryGroup } from './types';

export const GMB_LINK = "https://g.page/r/CSOC8Z5KY3WlEBM/review";

export const CATEGORIES: CategoryGroup[] = [
  {
    title: "Location",
    icon: MapPin,
    options: [
      { label: "Andheri East", value: "andheri east" },
      { label: "Andheri West", value: "andheri west" },
      { label: "Powai", value: "powai" },
      { label: "Bhandup", value: "bhandup" },
      { label: "Mulund", value: "mulund" },
      { label: "Ghatkopar", value: "ghatkopar" },
      { label: "Kanjurmarg", value: "kanjurmarg" },
      { label: "Central Mumbai", value: "central mumbai" },
      { label: "Western Suburbs", value: "western suburbs" },
    ]
  },
  {
    title: "Service",
    icon: Home,
    options: [
      { label: "Residential Consultant", value: "residential" },
      { label: "Investment Advisory", value: "investment" },
      { label: "New Launch Project", value: "new launch" },
      { label: "Under Construction", value: "under construction" },
      { label: "Ready to Move", value: "ready to move" },
      { label: "Luxury Home", value: "luxury" },
      { label: "First Time Buyer", value: "first time" },
      { label: "NRI Investment", value: "nri" },
      { label: "Commercial / Office", value: "commercial" },
    ]
  },
  {
    title: "Outcome",
    icon: TrendingUp,
    options: [
      { label: "Best Deal", value: "best deal" },
      { label: "Right Pricing", value: "pricing" },
      { label: "Negotiation Support", value: "negotiation" },
      { label: "ROI / Good Returns", value: "roi" },
      { label: "Transparent Guidance", value: "transparent" },
      { label: "Smooth Process", value: "smooth" },
    ]
  },
  {
    title: "Trust",
    icon: ShieldCheck,
    options: [
      { label: "Honest", value: "honest" },
      { label: "Professional", value: "professional" },
      { label: "Knowledgeable", value: "knowledgeable" },
      { label: "Ethical", value: "ethical" },
      { label: "Responsive", value: "responsive" },
      { label: "Reliable", value: "reliable" },
    ]
  }
];