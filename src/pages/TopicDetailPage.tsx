import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, CheckCircle, Minus, BookOpen, Dumbbell, Map, Plus } from 'lucide-react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/useToast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PriorityBadge, Tag } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Loading';

export function TopicDetailPage() {
  const { topicName } = useParams();
  const { analysis } = useAnalysis();
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const decodedName = topicName ? decodeURIComponent(topicName) : '';
  const topic = analysis?.topics.find((tp) => tp.topic === decodedName);

  if (!topic) {
    return (
      <DashboardLayout>
        <Card>
          <EmptyState
            icon={<Target className="w-8 h-8" />}
            title={language === 'en' ? 'Topic Not Found' : 'ವಿಷಯ ಕಂಡುಬಂದಿಲ್ಲ'}
            description={language === 'en' ? 'This topic could not be found.' : 'ಈ ವಿಷಯ ಕಂಡುಬಂದಿಲ್ಲ.'}
            action={<Button onClick={() => navigate('/results')}><ArrowLeft className="w-4 h-4" />{t('backToDashboard')}</Button>}
          />
        </Card>
      </DashboardLayout>
    );
  }

  const recurrenceLabel =
    topic.priority === 'HIGH' ? t('highRecurrence') :
    topic.priority === 'MEDIUM' ? t('mediumRecurrence') :
    t('lowRecurrence');

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate('/results')}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('backToDashboard')}
      </button>

      <div className="mb-6 animate-fade-in">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{topic.topic}</h1>
            <p className="text-slate-500 mt-1">{recurrenceLabel}</p>
          </div>
          <PriorityBadge
            priority={topic.priority}
            label={topic.priority === 'HIGH' ? t('highPriority') : topic.priority === 'MEDIUM' ? t('mediumPriority') : t('lowPriority')}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="animate-fade-in-up">
          <div className="p-5 text-center">
            <p className="text-3xl font-bold text-teal-600">{topic.frequency}/{topic.totalYears}</p>
            <p className="text-sm text-slate-500 mt-1">{t('historicalRecurrence')}</p>
          </div>
        </Card>
        <Card className="animate-fade-in-up" >
          <div className="p-5 text-center">
            <p className="text-3xl font-bold text-slate-700">{topic.questionCount}</p>
            <p className="text-sm text-slate-500 mt-1">{t('questionsFound')}</p>
          </div>
        </Card>
        <Card className="animate-fade-in-up">
          <div className="p-5 text-center">
            <p className="text-3xl font-bold text-slate-700">{topic.yearsFound.length}</p>
            <p className="text-sm text-slate-500 mt-1">{t('yearsFound')}</p>
          </div>
        </Card>
      </div>

      <Card className="mb-6 animate-fade-in-up">
        <div className="p-5">
          <h3 className="font-semibold text-slate-800 mb-4">{t('historicalRecurrence')}</h3>
          <div className="flex flex-wrap gap-3">
            {analysis!.years.map((year) => {
              const found = topic.yearsFound.includes(year);
              return (
                <div
                  key={year}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${
                    found ? 'bg-teal-50 border border-teal-200 text-teal-700' : 'bg-slate-50 border border-slate-200 text-slate-400'
                  }`}
                >
                  {found ? <CheckCircle className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
                  <span className="font-medium text-sm">{year}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="mb-6 animate-fade-in-up">
        <div className="p-5">
          <h3 className="font-semibold text-slate-800 mb-4">{t('subtopics')}</h3>
          <div className="flex flex-wrap gap-2">
            {topic.subtopics.map((sub, i) => (
              <Tag key={i} color="teal">{sub}</Tag>
            ))}
          </div>
        </div>
      </Card>

      <Card className="mb-6 animate-fade-in-up">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h3 className="font-semibold text-slate-800">{t('questionsList')}</h3>
          </div>
          <div className="space-y-3">
            {topic.questions.map((q, i) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold bg-teal-100 text-teal-700">
                    {q.year}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Tag color="blue">{q.marks} {t('marks')}</Tag>
                    {q.difficulty && <Tag color="amber">{q.difficulty}</Tag>}
                    <Tag color="slate">{q.type}</Tag>
                  </div>
                </div>
                <p className="text-sm text-slate-700">{q.question}</p>
                <p className="text-xs text-slate-400 mt-2">{q.subtopic}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={() => navigate('/practice')} size="lg">
          <Dumbbell className="w-5 h-5" />
          {t('practiceThisTopic')}
        </Button>
        <Button variant="outline" onClick={() => showToast(language === 'en' ? 'Added to your roadmap!' : 'ನಿಮ್ಮ ರಸ್ತೆನಕ್ಷೆಗೆ ಸೇರಿಸಲಾಗಿದೆ!', 'success')} size="lg">
          <Plus className="w-5 h-5" />
          {t('addToRoadmap')}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/roadmap')} size="lg">
          <Map className="w-5 h-5" />
          {t('studyRoadmap')}
        </Button>
      </div>
    </DashboardLayout>
  );
}
