import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  Sparkles,
  Key,
  AlertCircle,
  ExternalLink,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGame } from '../context/GameContext';
import { generateQuiz } from '../utils/gemini';
import { DIFFICULTY_OPTIONS, QUESTION_COUNT_OPTIONS } from '../utils/constants';

export default function CreateQuiz() {
  const navigate = useNavigate();
  const { apiKey, setApiKey, addQuiz } = useGame();
  const fileInputRef = useRef(null);

  const [notes, setNotes] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('Medium');
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileRead = (file) => {
    if (!file) return;

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNotes(e.target.result);
        setFileName(file.name);
        toast.success(`Loaded ${file.name}`);
      };
      reader.onerror = () => toast.error('Failed to read file');
      reader.readAsText(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      toast('PDF support is limited — plain text (.txt) works best.', { icon: '📄' });
      const reader = new FileReader();
      reader.onload = (e) => {
        // Basic PDF text extraction — may not work for all PDFs
        const text = e.target.result;
        // Try to extract readable text from PDF binary
        const extracted = text
          .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
          .replace(/\s{3,}/g, '\n')
          .trim();
        if (extracted.length > 50) {
          setNotes(extracted);
          setFileName(file.name);
        } else {
          toast.error('Could not extract text from this PDF. Please paste your notes manually.');
        }
      };
      reader.readAsText(file);
    } else {
      toast.error('Please upload a .txt or .pdf file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileRead(e.dataTransfer.files[0]);
    }
  };

  const handleGenerate = async () => {
    const key = localApiKey.trim();
    if (!key) {
      toast.error('Please enter your Gemini API key');
      return;
    }
    if (!notes.trim() || notes.trim().length < 30) {
      toast.error('Please provide more detailed notes (at least a few sentences)');
      return;
    }

    setApiKey(key);
    setIsLoading(true);

    try {
      const questions = await generateQuiz(key, notes, numQuestions, difficulty);

      const title =
        notes.trim().split(/[.\n]/)[0]?.trim().slice(0, 60) || 'Untitled Quiz';

      const quiz = addQuiz({
        title,
        questions,
        difficulty,
        notePreview: notes.slice(0, 200),
      });

      toast.success(`Generated ${questions.length} questions!`);
      navigate(`/quiz/${quiz.id}`);
    } catch (error) {
      console.error('Quiz generation error:', error);
      toast.error(error.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <LoadingSpinner size="lg" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Generating your quiz...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create a Quiz
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Paste your notes or upload a file, and AI will generate a quiz for you.
        </p>
      </motion.div>

      {/* API Key */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Key className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gemini API Key
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Your key is stored locally and never sent to any server except Google's API.
        </p>
        <div className="flex gap-3">
          <input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-600 border border-gray-200 dark:border-dark-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
          />
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm font-medium transition-colors whitespace-nowrap"
          >
            Get Key <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* Notes Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Study Notes
            </h2>
          </div>
          {fileName && (
            <button
              onClick={() => {
                setFileName('');
                setNotes('');
              }}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              {fileName} <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={`Paste your study notes here...\n\nExample:\nPhotosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. The process mainly takes place in the leaves and depends on the green pigment chlorophyll. It involves the absorption of light energy, which is converted into chemical energy through the formation of glucose...`}
          rows={10}
          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-600 border border-gray-200 dark:border-dark-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-y text-sm leading-relaxed"
        />

        {/* File Upload Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-primary-500 bg-primary-500/5'
              : 'border-gray-300 dark:border-dark-500 hover:border-primary-500/50 hover:bg-primary-500/5'
          }`}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-primary-500 font-medium">Click to upload</span> or drag & drop
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            .txt or .pdf files (plain text works best)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf"
            onChange={(e) => handleFileRead(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quiz Options
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Questions
            </label>
            <div className="flex gap-2">
              {QUESTION_COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setNumQuestions(n)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    numQuestions === n
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-500'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <div className="flex gap-2">
              {DIFFICULTY_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    difficulty === d
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-500'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question type info */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Currently supports Multiple Choice Questions (MCQ)</span>
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 via-primary-600 to-accent-400 text-white text-lg font-semibold hover:shadow-2xl hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Sparkles className="w-6 h-6" />
          Generate Quiz with AI
        </button>
      </motion.div>
    </div>
  );
}
