import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AnalysisResult, Roadmap, Paper } from '@/types';
import { demoAnalysis, demoRoadmap, demoPapers, demoPracticeQuestions } from '@/data/demoData';

interface AnalysisContextType {
  analysis: AnalysisResult | null;
  roadmap: Roadmap | null;
  papers: Paper[];
  isDemoMode: boolean;
  setAnalysis: (a: AnalysisResult | null) => void;
  setRoadmap: (r: Roadmap | null) => void;
  setPapers: (p: Paper[]) => void;
  setDemoMode: (v: boolean) => void;
  loadDemoData: () => void;
  toggleDayComplete: (day: number) => void;
  practiceQuestions: typeof demoPracticeQuestions;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isDemoMode, setDemoMode] = useState(false);
  const [practiceQuestions] = useState(demoPracticeQuestions);

  const loadDemoData = () => {
    setAnalysis(demoAnalysis);
    setRoadmap(demoRoadmap);
    setPapers(demoPapers);
    setDemoMode(true);
  };

  const toggleDayComplete = (day: number) => {
    setRoadmap((prev) => {
      if (!prev) return prev;
      const days = prev.days.map((d) => (d.day === day ? { ...d, completed: !d.completed } : d));
      const completedDays = days.filter((d) => d.completed).length;
      return { ...prev, days, completedDays };
    });
  };

  return (
    <AnalysisContext.Provider value={{ analysis, roadmap, papers, isDemoMode, setAnalysis, setRoadmap, setPapers, setDemoMode, loadDemoData, toggleDayComplete, practiceQuestions }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
  return ctx;
}
