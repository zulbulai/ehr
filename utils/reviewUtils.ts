import { ALL_REVIEWS } from '../data/reviews';
import { REVIEW_TEMPLATES } from '../data/reviewTemplates';
import { CATEGORIES } from '../constants';
import { Review } from '../types';

// Keyword dictionary to map categories to related terms found in natural text
const KEYWORD_MAP: Record<string, string[]> = {
  // Services
  "residential": ["residential", "home", "flat", "apartment", "2 bhk", "3 bhk", "4 bhk", "residence", "family"],
  "commercial": ["commercial", "office", "shop", "retail", "business", "workplace"],
  "investment": ["investment", "advisory", "invest", "returns", "appreciation", "asset"],
  "new launch": ["new launch", "pre-launch", "upcoming project", "booking"],
  "under construction": ["under construction", "possession", "developing", "construction"],
  "ready to move": ["ready to move", "ready", "immediate", "possession", "moved in"],
  "luxury": ["luxury", "premium", "high-end", "lavish", "elite", "spacious"],
  "first time": ["first time", "first home", "guidance", "nervous", "beginners"],
  "nri": ["nri", "overseas", "abroad", "distance", "virtual"],

  // Outcomes
  "best deal": ["best deal", "great price", "value", "good deal"],
  "pricing": ["pricing", "market rate", "fair price", "price"],
  "negotiation": ["negotiation", "negotiate", "bargain", "rates"],
  "roi": ["roi", "return", "appreciation", "profit", "growth"],
  "transparent": ["transparent", "clear", "open", "hidden"],
  "smooth": ["smooth", "easy", "hassle-free", "seamless", "quick"],

  // Trust
  "honest": ["honest", "genuine", "truthful", "sincere"],
  "professional": ["professional", "expert", "pro", "corporate"],
  "knowledgeable": ["knowledgeable", "market knowledge", "expertise", "insight"],
  "ethical": ["ethical", "principles", "trust", "integrity"],
  "responsive": ["responsive", "available", "reply", "answer"],
  "reliable": ["reliable", "dependable", "trusted", "faith"]
};

const checkMatch = (text: string, keyword: string): boolean => {
  if (!keyword) return true;
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  // 1. Direct match
  if (lowerText.includes(lowerKeyword)) return true;

  // 2. Synonym match
  const synonyms = KEYWORD_MAP[lowerKeyword];
  if (synonyms) {
    return synonyms.some(syn => lowerText.includes(syn));
  }

  return false;
};

export const filterReviews = (keyword: string): Review[] => {
  if (!keyword || keyword.trim() === '') return ALL_REVIEWS;
  return ALL_REVIEWS.filter(review => checkMatch(review.text, keyword));
};

export const filterReviewsByMultiTags = (locations: string[], services: string[], outcomes: string[], trust: string[]): Review[] => {
  return ALL_REVIEWS.filter(r => {
    const matchLoc = locations.length === 0 || locations[0] === "" || checkMatch(r.text, locations[0]);
    const matchSrv = services.length === 0 || services[0] === "" || checkMatch(r.text, services[0]);
    const matchOut = outcomes.length === 0 || outcomes[0] === "" || checkMatch(r.text, outcomes[0]);
    const matchTrust = trust.length === 0 || trust[0] === "" || checkMatch(r.text, trust[0]);

    return matchLoc && matchSrv && matchOut && matchTrust;
  });
};

export const generateDynamicReviews = (
  location: string,
  service: string,
  outcome: string,
  trust: string
): Review[] => {
  const loc = location || "Mumbai";
  const srv = service || "property services";
  const out = outcome || "great results";
  const trst = trust || "trusted";

  return REVIEW_TEMPLATES.map((template, index) => {
    let text = template
      .replace(/{location}/g, loc)
      .replace(/{service}/g, srv)
      .replace(/{outcome}/g, out)
      .replace(/{trust}/g, trst);
    
    return {
      id: 1000 + index,
      text: text
    };
  });
};

// NEW: Helper to pick a random item from an array
const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// NEW: Generates a completely random unique review
export const generateRandomReview = (currentText: string | null = null): Review => {
  // Extract options from constants
  const locations = CATEGORIES.find(c => c.title === "Location")?.options || [];
  const services = CATEGORIES.find(c => c.title === "Service")?.options || [];
  const outcomes = CATEGORIES.find(c => c.title === "Outcome")?.options || [];
  const trusts = CATEGORIES.find(c => c.title === "Trust")?.options || [];

  let newText = "";
  let attempts = 0;

  // Loop to ensure we don't return the exact same text as before (simple uniqueness check)
  do {
    const loc = getRandomItem(locations).label;
    const srv = getRandomItem(services).label;
    const out = getRandomItem(outcomes).label;
    const trst = getRandomItem(trusts).label;
    const template = getRandomItem(REVIEW_TEMPLATES);

    newText = template
      .replace(/{location}/g, loc)
      .replace(/{service}/g, srv)
      .replace(/{outcome}/g, out)
      .replace(/{trust}/g, trst);
    
    attempts++;
  } while (newText === currentText && attempts < 5);

  return {
    id: Date.now(), // Unique timestamp ID
    text: newText
  };
};