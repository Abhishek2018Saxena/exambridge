import { useNavigate } from 'react-router-dom';
import { FileText, Brain, Target, TrendingUp, Upload, BarChart3, Map, Dumbbell, Sparkles, ArrowRight, Info } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useAnalysis } from '@/hooks/useAnalysis';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/Loading';

export function DashboardPage() {
  const { fullName, isDemo } = useAuth();
  const { t, language } = useLanguage();
  const { analysis, loadDemoData } = useAnalysis();
  const navigate = useNavigate();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return language === 'en' ? 'Good morning' : 'ಶುಭೋದಯ';
    if (hour < 17) return language === 'en' ? 'Good afternoon' : 'ಶುಭ ಮಧ್ಯಾಹ್ನ';
    return language === 'en' ? 'Good evening' : 'ಶುಭ ಸಂಜೆ';
  })();

  const stats = analysis
    ? [
        { label: t('papersAnalyzed'), value: analysis.papersAnalyzed, icon: FileText, color: 'teal' },
        { label: t('questionsAnalyzed'), value: analysis.questionsAnalyzed, icon: Brain, color: 'blue' },
        { label: t('topicsDetected'), value: analysis.topicsDetected, icon: Target, color: 'amber' },
        { label: t('recurringTopics'), value: analysis.recurringTopics, icon: TrendingUp, color: 'emerald' },
      ]
    : [];

  const quickActions = [
    { label: t('uploadPapers'), desc: language === 'en' ? 'Upload past papers for analysis' : 'ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಹಳೆಯ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', icon: Upload, path: '/upload', color: 'teal' },
    { label: t('viewResults'), desc: language === 'en' ? 'View your exam intelligence report' : 'ನಿಮ್ಮ ಪರೀಕ್ಷಾ ಬುದ್ಧಿಮತ್ತೆ ವರದಿ ನೋಡಿ', icon: BarChart3, path: '/results', color: 'blue' },
    { label: t('studyRoadmap'), desc: language === 'en' ? 'Your 7-day personalized plan' : 'ನಿಮ್ಮ 7-ದಿನಗಳ ವೈಯಕ್ತಿಕ ಯೋಜನೆ', icon: Map, path: '/roadmap', color: 'amber' },
    { label: t('practice'), desc: language === 'en' ? 'Practice topic-based questions' : 'ವಿಷಯ ಆಧಾರಿತ ಪ್ರಶ್ನೆಗಳ ಅಭ್ಯಾಸ', icon: Dumbbell, path: '/practice', color: 'emerald' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            {greeting}, {fullName} <span className="inline-block">👋</span>
          </h1>
          {isDemo && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              {t('demoMode')}
            </span>
          )}
        </div>
        <p className="text-slate-500 mt-1">{t('dashboardSubtitle')}</p>
      </div>

      {analysis ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <Card key={i} className="animate-fade-in-up" >
                <div className="p-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-${stat.color}-50 text-${stat.color}-600`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mb-6 animate-fade-in-up" >
            <div className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-700 text-lg">{t('examIntelligence')}</h3>
                <p className="text-4xl font-bold text-teal-600 mt-2">{analysis.historicalPriority}% {t('historicalPriority')}</p>
                <p className="text-sm text-slate-500 mt-2 flex items-start gap-1.5">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                  {t('calculatedFrom')}
                </p>
              </div>
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#ccfbf1" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none" stroke="#0d9488" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 42 * analysis.historicalPriority / 100} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">{analysis.historicalPriority}%</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Card
                key={i}
                hover
                onClick={() => navigate(action.path)}
                className="animate-fade-in-up"
              >
                <div className="p-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-${action.color}-50 text-${action.color}-600`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-800">{action.label}</h3>
                  <p className="text-sm text-slate-500 mt-1">{action.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-teal-600 text-sm font-medium">
                    {language === 'en' ? 'Go' : 'ಹೋಗಿ'}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <EmptyState
            icon={<Target className="w-8 h-8" />}
            title={language === 'en' ? 'No Analysis Yet' : 'ಇನ್ನೂ ವಿಶ್ಲೇಷಣೆ ಇಲ್ಲ'}
            description={t('noDataYet')}
            action={
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => navigate('/upload')}>
                  <Upload className="w-4 h-4" />
                  {t('uploadPapers')}
                </Button>
                <Button variant="outline" onClick={loadDemoData}>
                  <Sparkles className="w-4 h-4" />
                  {t('tryDemo')}
                </Button>
              </div>
            }
          />
        </Card>
      )}
    </DashboardLayout>
  );
}
