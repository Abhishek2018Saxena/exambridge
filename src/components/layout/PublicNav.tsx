import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function PublicNav() {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-white text-lg">ExamBridge</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
            className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            <Languages className="w-4 h-4" />
            {language === 'en' ? 'English | ಕನ್ನಡ' : 'ಕನ್ನಡ | English'}
          </button>
          <button
            onClick={() => navigate('/signin')}
            className="text-sm font-medium text-white/90 hover:text-white px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
          >
            {language === 'en' ? 'Sign In' : 'ಸೈನ್ ಇನ್'}
          </button>
        </div>
      </div>
    </header>
  );
}
