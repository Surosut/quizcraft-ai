import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../utils/achievements';

export default function AchievementBadge({ achievementId, unlocked = false, size = 'md' }) {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
  if (!achievement) return null;

  const sizes = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex flex-col items-center gap-1.5"
    >
      <div
        className={`${sizes[size]} rounded-2xl flex items-center justify-center transition-all ${
          unlocked
            ? 'bg-gradient-to-br from-warm-300/20 to-primary-500/20 border-2 border-warm-300/30 shadow-lg shadow-warm-300/10'
            : 'bg-gray-200 dark:bg-dark-600 border-2 border-gray-300 dark:border-dark-500 opacity-40 grayscale'
        }`}
      >
        <span className={unlocked ? '' : 'opacity-50'}>{achievement.emoji}</span>
      </div>
      <div className="text-center">
        <p className={`text-xs font-semibold ${unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
          {achievement.name}
        </p>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 max-w-[100px]">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}
