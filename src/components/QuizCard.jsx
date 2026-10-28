import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Trash2, Clock, CheckCircle2 } from 'lucide-react';

export default function QuizCard({ quiz, onDelete, delay = 0 }) {
  const navigate = useNavigate();

  const date = new Date(quiz.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const scorePercent = quiz.score != null ? Math.round(quiz.score) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-5 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {quiz.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {date}
            </span>
            <span>{quiz.questions?.length || 0} questions</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 dark:text-primary-400 font-medium">
              {quiz.difficulty}
            </span>
          </div>
        </div>

        {scorePercent !== null && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              scorePercent >= 80
                ? 'bg-green-500/10 text-green-500'
                : scorePercent >= 60
                ? 'bg-warm-300/10 text-warm-400'
                : 'bg-red-500/10 text-red-500'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            {scorePercent}%
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => navigate(`/quiz/${quiz.id}`)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
        >
          <Play className="w-4 h-4" />
          {quiz.played ? 'Retry' : 'Play'}
        </button>

        <button
          onClick={() => onDelete(quiz.id)}
          className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
          title="Delete quiz"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
