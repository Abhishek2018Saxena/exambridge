import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload, BarChart3, Map, Dumbbell, LogOut, Languages, Sparkles, GraduationCap, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { fullName, signOut, isDemo } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: t('uploadPapers').replace(' Papers', ''), label2: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', label: t('uploadPapers'), label2: 'Upload', icon: Upload },
    { path: '/results', label: t('viewResults'), label2: 'Results', icon: BarChart3 },
    { path: '/roadmap', label: t('studyRoadmap'), label2: 'Roadmap', icon: Map },
    { path: '/practice', label: t('practice'), label2: 'Practice', icon: Dumbbell },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'kn' : 'en');

  const NavContent = () => (
    <>
      <div className="px-4 py-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-none">ExamBridge</h1>
            <p className="text-xs text-slate-400 mt-0.5">Exam Intelligence</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {language === 'en' ? item.label2 : item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-100 space-y-2">
        {isDemo && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-700">{t('demoMode')}</span>
          </div>
        )}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 w-full transition-colors"
        >
          <Languages className="w-5 h-5" />
          {language === 'en' ? 'English | ಕನ್ನಡ' : 'ಕನ್ನಡ | English'}
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 w-full transition-colors"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('signOut')}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white flex flex-col animate-slide-in">
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64 min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-slate-700">ExamBridge</span>
          <button onClick={toggleLanguage} className="text-xs font-medium text-teal-600 px-2 py-1 rounded-lg hover:bg-teal-50">
            {language === 'en' ? 'ಕನ್ನಡ' : 'EN'}
          </button>
        </div>

        <main className="p-4 md:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
