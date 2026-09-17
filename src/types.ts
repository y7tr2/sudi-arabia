export type SaudiStateEra = "first_state" | "second_state" | "third_state" | "kings" | "vision2030";

export interface HistoricLeader {
  id: string;
  name: string;
  title: string;
  reign: string;
  hijriReign?: string;
  era: SaudiStateEra;
  image: string;
  description: string;
  keyAchievements: string[];
  famousQuote?: string;
  capitalCity: string;
  historicalSignificance: string;
}

export interface SaudiStateInfo {
  id: SaudiStateEra;
  title: string;
  period: string;
  hijriPeriod: string;
  founder: string;
  capital: string;
  summary: string;
  detailedHistory: string;
  highlights: string[];
  image: string;
}

export interface HistoricLandmark {
  id: string;
  name: string;
  location: string;
  era: string;
  image: string;
  description: string;
  significance: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
