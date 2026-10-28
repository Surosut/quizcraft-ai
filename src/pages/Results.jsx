import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  LayoutDashboard,
  Share2,
  Trophy,
  Zap,
  Clock,
  Flame,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useGame } from '../context/GameContext';
import { PERFORMANCE_RATINGS } from '../utils/constants';
import { getXPBreakdown } from '../utils/xpCalculator';
import ConfettiEffect from '../components/ConfettiEffect';
import { useState } from 'react';

export default function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuizById } = useGame();
  const [showConfetti] = useState(1);

  const quiz = getQuizById(id);

  if (!quiz || !quiz.lastResult) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Results Not Found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl bg-primary-500 text-white font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const result = quiz.lastResult;
  const { correct, total, answers } = result;
  const percentage = Math.round((correct / total) * 100);
  const xpBreakdown = getXPBreakdown(answers);

  const rating = PERFORMANCE_RATINGS.find((r) => percentage >= r.min);

  const handleShare = () => {
    const text = `🧠 QuizCraft AI Results\n📝 ${quiz.title}\n✅ Score: ${correct}/${total} (${percentage}%)\n⭐ ${rating.label}\n💎 ${xpBreakdown.totalXP} XP earned\n\nTry it at QuizCraft AI!`;
    navigator.clipboard.writeText(text);
    toast.success('Results copied to clipboard!');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {percentage === 100 && <ConfettiEffect trigger={showConfetti} />}

      {/* Score Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-7xl mb-4"
        >
          {rating.emoji}
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {rating.label}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{rating.message}</p>

        {/* Score Circle */}
        <div className="inline-flex items-baseline gap-1 mb-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-black gradient-text"
          >
            {correct}
          </motion.span>
          <span className="text-2xl text-gray-400 dark:text-gray-500 font-bold">
            / {total}
          </span>
        </div>
        <p className="text-lg text-gray-500 dark:text-gray-400">{percentage}% Correct</p>
      </motion.div>

      {/* XP Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warm-300" />
          XP Earned
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Zap className="w-4 h-4 text-primary-500" />
              Base XP ({correct} correct × 10)
            </span>
            <span className="font-bold text-gray-900 dark:text-white">+{xpBreakdown.baseXP}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Flame className="w-4 h-4 text-orange-500" />
              Streak Bonus
            </span>
            <span className="font-bold text-gray-900 dark:text-white">+{xpBreakdown.streakBonus}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 text-accent-400" />
              Speed Bonus
            </span>
            <span className="font-bold text-gray-900 dark:text-white">+{xpBreakdown.timeBonus}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-dark-500 pt-3 flex items-center justify-between">
            <span className="font-bold text-gray-900 dark:text-white">Total XP</span>
            <span className="text-xl font-black gradient-text">+{xpBreakdown.totalXP}</span>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => navigate(`/quiz/${id}`)}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Retry Quiz
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-dark-500 transition-all"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-dark-500 transition-all"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </motion.div>

      {/* Question Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Review Answers
        </h2>

        <div className="space-y-4">
          {quiz.questions.map((q, i) => {
            const answer = answers[i];
            const isCorrect = answer?.isCorrect;
            const userSelected = answer?.selected;

            return (
              <div
                key={i}
                className={`glass-card p-5 border-l-4 ${
                  isCorrect ? 'border-l-green-500' : 'border-l-red-500'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <p className="font-medium text-gray-900 dark:text-white">{q.question}</p>
                </div>

                <div className="ml-8 space-y-1.5">
                  {q.options.map((opt, j) => {
                    let optStyle = 'text-gray-500 dark:text-gray-400';
                    let prefix = '';
                    if (j === q.correctAnswer) {
                      optStyle = 'text-green-600 dark:text-green-400 font-medium';
                      prefix = '✓ ';
                    }
                    if (j === userSelected && !isCorrect) {
                      optStyle = 'text-red-500 line-through';
                      prefix = '✗ ';
                    }

                    return (
                      <p key={j} className={`text-sm ${optStyle}`}>
                        {prefix}{opt}
                      </p>
                    );
                  })}
                </div>

                {q.explanation && (
                  <p className="ml-8 mt-2 text-xs text-gray-400 dark:text-gray-500">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
