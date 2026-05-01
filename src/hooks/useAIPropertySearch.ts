import { useState } from 'react';
import { properties, Property } from '../data/properties';

export interface RelevanceReason {
  type: 'budget' | 'location' | 'developer' | 'roi' | 'status' | 'amenities' | 'investment';
  text: string;
  icon: string;
}

export interface SearchResult extends Property {
  relevanceReasons: RelevanceReason[];
  matchScore: number;
}

// Strict budget parser - returns max budget in Cr
const parseBudget = (query: string): number | null => {
  const match = query.match(/(\d+(?:\.\d+)?)\s*(cr|lakh|l|crore)/i);
  if (!match) return null;
  
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  
  // Convert to Crores
  if (unit === 'lakh' || unit === 'l') {
    return value / 100; // e.g., 50 lakh = 0.5 Cr
  }
  return value; // Already in Cr
};

// Extract BHK count from query
const parseBHK = (query: string): number | null => {
  const match = query.match(/(\d+)\s*bhk/i);
  if (match) return parseInt(match[1]);
  return null;
};

// Helper function to generate CONCISE relevance reasons (max 2)
const generateRelevanceReasons = (property: Property, query: string): RelevanceReason[] => {
  const reasons: RelevanceReason[] = [];
  const queryLower = query.toLowerCase();
  
  // Budget match (only if query mentions budget)
  const budgetLimit = parseBudget(queryLower);
  if (budgetLimit && property.priceValue <= budgetLimit) {
    reasons.push({
      type: 'budget',
      text: `Exactly within your ₹${budgetLimit}Cr budget`,
      icon: '💰'
    });
  }
  
  // BHK match
  const bhkNeeded = parseBHK(queryLower);
  if (bhkNeeded && property.beds === bhkNeeded) {
    reasons.push({
      type: 'investment',
      text: `${property.beds} BHK - Exact match`,
      icon: '🏠'
    });
  }
  
  // Location match
  if (queryLower.includes(property.location.toLowerCase().split(',')[0].trim())) {
    reasons.push({
      type: 'location',
      text: `Located in ${property.location.split(',')[0]}`,
      icon: '📍'
    });
  }
  
  // High ROI (only if > 13%)
  const roiValue = parseFloat(property.roi);
  if (roiValue >= 13) {
    reasons.push({
      type: 'investment',
      text: `Excellent ${property.roi} ROI`,
      icon: '📈'
    });
  }
  
  // Return max 2 reasons
  return reasons.slice(0, 2);
};

export const useAIPropertySearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [explanation, setExplanation] = useState<string>('');

  const searchProperties = async (query: string) => {
    setLoading(true);
    setResults([]);
    
    const queryLower = query.toLowerCase().trim();
    
    // Parse strict filters
    const budgetLimit = parseBudget(queryLower);
    const bhkNeeded = parseBHK(queryLower);
    
    // STRICT FILTERING - No compromises
    let filtered = properties.filter(property => {
      // Budget filter - HARD LIMIT
      if (budgetLimit && property.priceValue > budgetLimit) {
        return false;
      }
      
      // BHK filter - EXACT MATCH PREFERRED (allow 1 more for flexibility)
      if (bhkNeeded && property.beds < bhkNeeded) {
        return false;
      }
      
      // Location filter (if specific location mentioned)
      const locationKeywords = ['devanahalli', 'whitefield', 'hennur', 'yelahanka', 'north bangalore'];
      const locationMatch = locationKeywords.find(kw => queryLower.includes(kw));
      if (locationMatch && !property.location.toLowerCase().includes(locationMatch)) {
        return false;
      }
      
      return true;
    });
    
    // Sort by relevance score
    filtered.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      // Exact budget match gets priority
      if (budgetLimit) {
        const aDiff = Math.abs(a.priceValue - budgetLimit);
        const bDiff = Math.abs(b.priceValue - budgetLimit);
        scoreA -= aDiff * 10;
        scoreB -= bDiff * 10;
      }
      
      // Exact BHK match
      if (bhkNeeded) {
        if (a.beds === bhkNeeded) scoreA += 20;
        if (b.beds === bhkNeeded) scoreB += 20;
      }
      
      // Developer preference (trusted developers)
      const trustedDevs = ['embassy', 'godrej', 'assetz', 'brigade', 'lodha'];
      const aDevIndex = trustedDevs.findIndex(d => a.developer.toLowerCase().includes(d));
      const bDevIndex = trustedDevs.findIndex(d => b.developer.toLowerCase().includes(d));
      
      if (aDevIndex !== -1) scoreA += (5 - aDevIndex);
      if (bDevIndex !== -1) scoreB += (5 - bDevIndex);
      
      return scoreB - scoreA;
    });
    
    // Take top 4 results MAX
    const topResults = filtered.slice(0, 4);
    
    // Transform with relevance reasons
    const resultsWithReasons = topResults.map(property => ({
      ...property,
      matchScore: 95,
      relevanceReasons: generateRelevanceReasons(property, queryLower)
    }));
    
    // Generate CONCISE explanation (max 2 lines)
    let conciseExplanation = '';
    if (resultsWithReasons.length === 0) {
      conciseExplanation = `No properties match your criteria. Try increasing budget or adjusting requirements.`;
    } else if (resultsWithReasons.length <= 2) {
      conciseExplanation = `Found ${resultsWithReasons.length} perfect match${resultsWithReasons.length > 1 ? 'es' : ''}. ${budgetLimit ? `All within ₹${budgetLimit}Cr budget.` : ''}`;
    } else {
      conciseExplanation = `Top ${resultsWithReasons.length} properties matching your requirements. ${budgetLimit ? `Strictly under ₹${budgetLimit}Cr.` : ''}`;
    }
    
    setResults(resultsWithReasons);
    setExplanation(conciseExplanation);
    setLoading(false);
  };

  return { searchProperties, loading, results, explanation };
};
