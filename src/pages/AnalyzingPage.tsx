import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Loader2, Sparkles, Info } from 'lucide-react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useLanguage } from '@/hooks/useLanguage';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';

export function AnalyzingPage() {
  const { isDemoMode } = useAnalysis();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const steps = [
    { key: 'papersUploaded', label: t('papersUploaded') },
    { key: 'extractingQuestions', label: t('extractingQuestions') },
    { key: 'detectingTopics', label: t('detectingTopics') },
    { key: 'comparingYears', label: t('comparingYears') },
    { key: 'calculatingFrequency', label: t('calculatingFrequency') },
    { key: 'buildingRoadmap', label: t('buildingRoadmap') },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = isDemoMode ? 700 : 1200;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate('/results'), 500);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);
    return () => clearInterval(interval);
  }, [steps.length, isDemoMode, navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-8">
        {isDemoMode && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm mb-6 animate-fade-in">
            <Info className="w-4 h-4 flex-shrink-0" />
            {t('demoNotice')}
          </div>
        )}

        <Card className="animate-scale-in">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white animate-pulse-soft" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {isDemoMode ? 'Demo Analysis' : 'Analyzing Your Papers'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {isDemoMode ? 'Loading prepared sample data...' : 'AI is processing your exam papers...'}
              </p>
            </div>

            <div className="mb-8">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 text-right mt-1.5">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </p>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;
                const isPending = index > currentStep;

                return (
                  <div
                    key={step.key}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-teal-50 border border-teal-200' : isComplete ? 'bg-emerald-50/50' : 'opacity-50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isComplete ? (
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      ) : isActive ? (
                        <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      isComplete ? 'text-emerald-700' : isActive ? 'text-teal-700' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    {isComplete && (
                      <span className="ml-auto text-xs text-emerald-500 font-medium">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
