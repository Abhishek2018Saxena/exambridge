import { useNavigate } from 'react-router-dom';
import { Upload, Brain, Search, TrendingUp, Map, FileText, Languages, BarChart3, Target, CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { PublicNav } from '@/components/layout/PublicNav';

export function LandingPage() {
  const { t, language } = useLanguage();
  const { enterDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = () => navigate('/signup');
  const handleDemo = () => {
    enterDemoMode();
    navigate('/dashboard');
  };

  const steps = [
    { icon: Upload, title: t('step1'), desc: t('step1Desc'), num: 1 },
    { icon: Brain, title: t('step2'), desc: t('step2Desc'), num: 2 },
    { icon: Search, title: t('step3'), desc: t('step3Desc'), num: 3 },
    { icon: TrendingUp, title: t('step4'), desc: t('step4Desc'), num: 4 },
    { icon: Map, title: t('step5'), desc: t('step5Desc'), num: 5 },
  ];

  const features = [
    { icon: FileText, title: t('feature1') },
    { icon: Languages, title: t('feature2') },
    { icon: BarChart3, title: t('feature3') },
    { icon: Target, title: t('feature4') },
    { icon: CheckCircle2, title: t('feature5') },
    { icon: TrendingUp, title: t('feature6') },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles />
            {language === 'en' ? 'AI-Powered Exam Intelligence' : 'AI-ಆಧಾರಿತ ಪರೀಕ್ಷಾ ಬುದ್ಧಿಮತ್ತೆ'}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight animate-fade-in-up">
            {t('heroTitle')}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('heroDesc')}
          </p>

          <p className="mt-4 text-base text-teal-400 font-medium italic">
            {t('tagline')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={handleAnalyze}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-600 text-white font-semibold text-base hover:bg-teal-700 shadow-lg hover:shadow-teal-500/30 transition-all duration-200 hover:scale-[1.02]"
            >
              {t('analyzeMyPapers')}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleDemo}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-base hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
            >
              {t('tryDemoBtn')}
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white shadow-2xl overflow-hidden animate-scale-in">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-slate-400 font-medium">ExamBridge Dashboard</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: t('papersAnalyzed'), value: '3', icon: FileText, color: 'teal' },
                { label: t('questionsAnalyzed'), value: '24', icon: Brain, color: 'blue' },
                { label: t('topicsDetected'), value: '6', icon: Target, color: 'amber' },
                { label: t('recurringTopics'), value: '4', icon: TrendingUp, color: 'emerald' },
              ].map((card, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-${card.color}-50 text-${card.color}-600`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{card.label}</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <div className="rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{t('examIntelligence')}</p>
                  <p className="text-3xl font-bold text-teal-600 mt-1">87% {t('historicalPriority')}</p>
                  <p className="text-xs text-slate-400 mt-1">{t('calculatedFrom')}</p>
                </div>
                <div className="w-20 h-20 rounded-full border-8 border-teal-200 flex items-center justify-center">
                  <span className="text-xl font-bold text-teal-600">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">{t('howItWorks')}</h2>
          <div className="w-20 h-1 bg-teal-500 rounded-full mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <step.icon className="w-7 h-7" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800">{step.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">{t('features')}</h2>
          <div className="w-20 h-1 bg-teal-500 rounded-full mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-200 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-slate-700">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'en' ? 'Start Your Smart Preparation Today' : 'ಇಂದೇ ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ತಯಾರಿಕೆ ಪ್ರಾರಂಭಿಸಿ'}
          </h2>
          <p className="text-slate-300 mb-8">
            {language === 'en' ? 'Upload your past papers and let AI build your study plan.' : 'ನಿಮ್ಮ ಹಳೆಯ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು AI ನಿಮ್ಮ ಅಧ್ಯಯನ ಯೋಜನೆ ನಿರ್ಮಿಸಲಿ.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleAnalyze}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 shadow-lg transition-all"
            >
              {t('analyzeMyPapers')}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleDemo}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/20 transition-all"
            >
              {t('tryDemoBtn')}
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            ExamBridge — {language === 'en' ? 'Your past papers. Your language. Your smartest study plan.' : 'ನಿಮ್ಮ ಹಳೆಯ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು. ನಿಮ್ಮ ಭಾಷೆ. ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ಅಧ್ಯಯನ ಯೋಜನೆ.'}
          </p>
          <p className="text-slate-600 text-xs mt-2">
            {language === 'en' ? 'Historical recurrence analysis — not exam prediction.' : 'ಐತಿಹಾಸಿಕ ಪುನರಾವರ್ತನೆ ವಿಶ್ಲೇಷಣೆ — ಪರೀಕ್ಷೆ ಭವಿಷ್ಯವಲ್ಲ.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Sparkles() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
