export interface Question {
  id: string;
  year: number;
  question: string;
  topic: string;
  subtopic: string;
  marks: number;
  type: string;
  difficulty?: string;
}

export interface TopicFrequency {
  topic: string;
  subtopics: string[];
  yearsFound: number[];
  frequency: number;
  totalYears: number;
  questionCount: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  questions: Question[];
}

export interface AnalysisResult {
  id: string;
  papersAnalyzed: number;
  questionsAnalyzed: number;
  topicsDetected: number;
  recurringTopics: number;
  historicalPriority: number;
  years: number[];
  topics: TopicFrequency[];
  questions: Question[];
  isDemo: boolean;
  createdAt: string;
}

export interface RoadmapDay {
  day: number;
  title: string;
  topic: string;
  tasks: string[];
  estimatedTime: string;
  practiceQuestions: PracticeQuestion[];
  completed: boolean;
}

export interface Roadmap {
  id: string;
  analysisId: string;
  days: RoadmapDay[];
  totalDays: number;
  completedDays: number;
  isDemo: boolean;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  topic: string;
  marks: number;
  difficulty: string;
  answer: string;
}

export interface Paper {
  id: string;
  filename: string;
  fileType: string;
  year: number | null;
  board: string;
  classLevel: string;
  subject: string;
  language: string;
  status: string;
  isDemo: boolean;
}

export interface Profile {
  id: string;
  fullName: string;
  preferredLanguage: 'en' | 'kn';
  isDemo: boolean;
}

export type Language = 'en' | 'kn';
