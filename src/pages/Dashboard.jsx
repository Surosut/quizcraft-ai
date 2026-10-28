import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  Flame,
  Star,
  PlusCircle,
  Search,
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import QuizCard from '../components/QuizCard';
import ProgressBar from '../components/ProgressBar';
import AchievementBadge from '../components/AchievementBadge';
import { useGame } from '../context/GameContext';
import { ACHIEVEMENTS } from '../utils/achievements';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const { gameState, quizzes, levelInfo, profile, deleteQuiz } = useGame();

  const handleDelete = (id) => {
    if (window.confirm('Delete this quiz?')) {
      deleteQuiz(id);
      toast.success('Quiz deleted');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {profile.name}! {profile.avatar}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Ready to keep learning? You're on a roll!
          </p>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Create Quiz
        </button>
      </motion.div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-2xl">
            {profile.avatar}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Level {levelInfo.level}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {levelInfo.totalXP} Total XP
            </p>
          </div>
        </div>
        <ProgressBar
          current={levelInfo.currentLevelXP}
          max={levelInfo.xpForNextLevel}
          label={`${levelInfo.xpForNextLevel - levelInfo.currentLevelXP} XP to Level ${levelInfo.level + 1}`}
        />
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={BookOpen}
          label="Total Quizzes"
          value={gameState.totalQuizzes}
          color="primary"
          delay={0.15}
        />
        <StatsCard
          icon={HelpCircle}
          label="Questions Answered"
          value={gameState.totalQuestionsAnswered}
          color="accent"
          delay={0.2}
        />
        <StatsCard
          icon={Flame}
          label="Day Streak"
          value={`${gameState.dailyStreak} 🔥`}
          color="warm"
          delay={0.25}
        />
        <StatsCard
          icon={Star}
          label="XP Points"
          value={gameState.xp}
          color="primary"
          delay={0.3}
        />
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Achievements
        </h2>
        <div className="flex flex-wrap gap-6">
          {ACHIEVEMENTS.map((a) => (
            <AchievementBadge
              key={a.id}
              achievementId={a.id}
              unlocked={gameState.achievements.includes(a.id)}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Recent Quizzes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Your Quizzes
          </h2>
          {quizzes.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''}
            </span>
          )}
        </div>

        {quizzes.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No quizzes yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Create your first AI-generated quiz to get started!
            </p>
            <button
              onClick={() => navigate('/create')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              Create Your First Quiz
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz, i) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onDelete={handleDelete}
                delay={0.45 + i * 0.05}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
