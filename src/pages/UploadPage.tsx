import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, X, Sparkles, AlertCircle, Image as ImageIcon, FileType } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useToast } from '@/hooks/useToast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Paper } from '@/types';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

export function UploadPage() {
  const { isDemo } = useAuth();
  const { t, language } = useLanguage();
  const { setPapers, loadDemoData, setDemoMode } = useAnalysis();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedPapers, setUploadedPapers] = useState<Paper[]>([]);
  const [dragging, setDragging] = useState(false);
  const [board] = useState('Karnataka State Board');
  const [classLevel] = useState('10');
  const [subject] = useState('Mathematics');
  const [lang, setLang] = useState<'en' | 'kn'>('en');
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setError('');

    const validFiles: File[] = [];
    for (const file of Array.from(selectedFiles)) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} exceeds 10MB limit`);
        continue;
      }
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ACCEPTED_TYPES.includes(file.type) && !['pdf', 'jpg', 'jpeg', 'png'].includes(ext || '')) {
        setError(`${file.name} is not a supported file type (PDF, JPG, PNG only)`);
        continue;
      }
      validFiles.push(file);
    }

    const total = files.length + validFiles.length;
    if (total > 5) {
      setError(language === 'en' ? 'Maximum 5 files allowed' : 'ಗರಿಷ್ಠ 5 ಫೈಲ್‌ಗಳು ಅನುಮತಿಸಲಾಗಿದೆ');
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);

    const newPapers: Paper[] = validFiles.map((file, i) => ({
      id: `upload-${Date.now()}-${i}`,
      filename: file.name,
      fileType: file.name.endsWith('.pdf') ? 'PDF' : file.name.match(/\.(jpg|jpeg|png)$/i) ? 'IMG' : 'FILE',
      year: extractYear(file.name),
      board,
      classLevel,
      subject,
      language: lang,
      status: 'uploaded',
      isDemo: false,
    }));
    setUploadedPapers((prev) => [...prev, ...newPapers]);
  };

  const extractYear = (filename: string): number | null => {
    const match = filename.match(/20\d{2}/);
    return match ? parseInt(match[0]) : null;
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadedPapers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (files.length < 2) {
      setError(t('need2to5'));
      return;
    }
    setPapers(uploadedPapers);
    setDemoMode(false);
    navigate('/analyzing');
  };

  const handleDemo = () => {
    loadDemoData();
    setDemoMode(true);
    showToast(t('demoNotice'), 'info');
    navigate('/analyzing');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('analyzePapers')}</h1>
        <p className="text-slate-500 mt-1">{t('uploadSubtitle')}</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-4 animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {isDemo && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm mb-4">
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          {t('demoModeActive')}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 animate-fade-in-up">
          <div className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4">
              {language === 'en' ? 'Selection' : 'ಆಯ್ಕೆ'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{t('board')}</label>
                <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium">
                  {board}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{t('class')}</label>
                <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium">
                  {classLevel}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{t('subject')}</label>
                <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium">
                  {subject}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{t('language')}</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLang('en')}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      lang === 'en' ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang('kn')}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      lang === 'kn' ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card>
            <div className="p-5">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragging ? 'border-teal-400 bg-teal-50' : 'border-slate-300 hover:border-teal-300 hover:bg-slate-50'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="font-medium text-slate-700">{t('selectFiles')}</p>
                <p className="text-sm text-slate-400 mt-1">{t('fileTypes')}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
          </Card>

          {uploadedPapers.length > 0 ? (
            <Card>
              <div className="p-5">
                <h3 className="font-semibold text-slate-800 mb-3">
                  {language === 'en' ? 'Uploaded Files' : 'ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೈಲ್‌ಗಳು'} ({uploadedPapers.length})
                </h3>
                <div className="space-y-3">
                  {uploadedPapers.map((paper, index) => (
                    <div key={paper.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-slate-200">
                        {paper.fileType === 'PDF' ? (
                          <FileType className="w-5 h-5 text-red-500" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{paper.filename}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-400">{paper.fileType}</span>
                          {paper.year && (
                            <>
                              <span className="text-xs text-slate-300">•</span>
                              <span className="text-xs text-slate-400">{paper.year}</span>
                            </>
                          )}
                          <span className="text-xs text-slate-300">•</span>
                          <span className="text-xs text-emerald-500 font-medium">{t('uploaded')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-8 text-center">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-400">{t('noFilesYet')}</p>
              </div>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleAnalyze} disabled={files.length < 2} size="lg" fullWidth>
              <UploadCloud className="w-5 h-5" />
              {t('analyze')}
            </Button>
            <Button onClick={handleDemo} variant="outline" size="lg" fullWidth>
              <Sparkles className="w-5 h-5" />
              {t('tryDemo')}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
