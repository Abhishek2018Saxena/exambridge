import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Brain, Target, TrendingUp, CheckCircle, Minus, Info, ArrowRight, Flame, AlertCircle, Circle, ChevronRight } from 'lucide-react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useLanguage } from '@/hooks/useLanguage';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PriorityBadge, Tag } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Loading';
import type { TopicFrequency } from '@/types';

export function ResultsPage() {
  const { analysis, isDemoMode } = useAnalysis();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!analysis) {
    return (
      <DashboardLayout>
        <Card>
          <EmptyState
            icon={<Target className="w-8 h-8" />}
            title={language === 'en' ? 'No Results Yet' : 'ಇನ್ನೂ ಫಲಿತಾಂಶಗಳಿಲ್ಲ'}
            description={t('noDataYet')}
            action={<Button onClick={() => navigate('/upload')}>{t('uploadPapers')}</Button>}
          />
        </Card>
      </DashboardLayout>
    );
  }

  const stats = [
    { label: t('papersAnalyzed'), value: analysis.papersAnalyzed, icon: FileText, color: 'teal' },
    { label: t('questionsAnalyzed'), value: analysis.questionsAnalyzed, icon: Brain, color: 'blue' },
    { label: t('topicsDetected'), value: analysis.topicsDetected, icon: Target, color: 'amber' },
    { label: t('recurringTopics'), value: analysis.recurringTopics, icon: TrendingUp, color: 'emerald' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('examIntelligenceReport')}</h1>
        {isDemoMode && (
          <p className="text-sm text-amber-600 mt-1 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            {t('demoNotice')}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <Card key={i} className="animate-fade-in-up">
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
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-800">{t('topicFrequencyHeatmap')}</h3>
          </div>
          <p className="text-sm text-slate-400 mb-5">
            {language === 'en'
              ? 'Topic recurrence across analyzed years'
              : 'ವಿಶ್ಲೇಷಿಸಿದ ವರ್ಷಗಳಾದ್ಯಂತ ವಿಷಯ ಪುನರಾವರ್ತನೆ'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-3 text-sm font-semibold text-slate-600">
                    {language === 'en' ? 'Topic' : 'ವಿಷಯ'}
                  </th>
                  {analysis.years.map((year) => (
                    <th key={year} className="text-center py-3 px-3 text-sm font-semibold text-slate-600 min-w-[80px]">
                      {year}
                    </th>
                  ))}
                  <th className="text-center py-3 px-3 text-sm font-semibold text-slate-600">
                    {language === 'en' ? 'Frequency' : 'ಆವರ್ತನೆ'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {analysis.topics.map((topic, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/topic/${encodeURIComponent(topic.topic)}`)}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700 text-sm">{topic.topic}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </div>
                    </td>
                    {analysis.years.map((year) => {
                      const found = topic.yearsFound.includes(year);
                      return (
                        <td key={year} className="text-center py-3 px-3">
                          {found ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600">
                              <CheckCircle className="w-5 h-5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-slate-300">
                              <Minus className="w-5 h-5" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="text-center py-3 px-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">
                        {topic.frequency}/{topic.totalYears}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="flex items-start gap-2 mb-6 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm relative">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{t('priorityTooltip')}</span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">{t('highYieldTopics')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analysis.topics.map((topic, i) => (
          <TopicCard key={i} topic={topic} index={i} />
        ))}
      </div>
    </DashboardLayout>
  );
}

function TopicCard({ topic, index }: { topic: TopicFrequency; index: number }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const recurrenceLabel =
    topic.priority === 'HIGH' ? t('highRecurrence') :
    topic.priority === 'MEDIUM' ? t('mediumRecurrence') :
    t('lowRecurrence');

  return (
    <Card className="animate-fade-in-up" hover onClick={() => navigate(`/topic/${encodeURIComponent(topic.topic)}`)}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">{topic.topic}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{recurrenceLabel}</p>
          </div>
          <PriorityBadge priority={topic.priority} label={topic.priority === 'HIGH' ? t('highPriority') : topic.priority === 'MEDIUM' ? t('mediumPriority') : t('lowPriority')} />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-slate-50">
            <p className="text-lg font-bold text-slate-700">{topic.frequency}/{topic.totalYears}</p>
            <p className="text-xs text-slate-400">{t('historicalRecurrence')}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-slate-50">
            <p className="text-lg font-bold text-slate-700">{topic.questionCount}</p>
            <p className="text-xs text-slate-400">{t('questionsFound')}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-slate-50">
            <p className="text-lg font-bold text-slate-700">{topic.yearsFound.length}</p>
            <p className="text-xs text-slate-400">{t('yearsFound')}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {topic.subtopics.slice(0, 3).map((sub, i) => (
            <Tag key={i} color="slate">{sub}</Tag>
          ))}
          {topic.subtopics.length > 3 && (
            <Tag color="slate">+{topic.subtopics.length - 3}</Tag>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            {topic.priority === 'HIGH' && <Flame className="w-3.5 h-3.5 text-red-400" />}
            {topic.priority === 'MEDIUM' && <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
            {topic.priority === 'LOW' && <Circle className="w-3.5 h-3.5 text-slate-300" />}
            {topic.yearsFound.join(', ')}
          </div>
          <button className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
            {t('viewQuestions')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
