import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { LanguageProvider } from '@/hooks/useLanguage';
import { ToastProvider } from '@/hooks/useToast';
import { AnalysisProvider } from '@/hooks/useAnalysis';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { LandingPage } from '@/pages/LandingPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { UploadPage } from '@/pages/UploadPage';
import { AnalyzingPage } from '@/pages/AnalyzingPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { TopicDetailPage } from '@/pages/TopicDetailPage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { PracticePage } from '@/pages/PracticePage';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <AnalysisProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
                <Route path="/analyzing" element={<ProtectedRoute><AnalyzingPage /></ProtectedRoute>} />
                <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
                <Route path="/topic/:topicName" element={<ProtectedRoute><TopicDetailPage /></ProtectedRoute>} />
                <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
                <Route path="/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnalysisProvider>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
