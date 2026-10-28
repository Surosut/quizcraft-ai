import { motion } from 'framer-motion';

export default function ProgressBar({ current, max, label, showText = true, className = '', color = 'primary' }) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  const barColors = {
    primary: 'from-primary-500 to-accent-400',
    green: 'from-green-500 to-emerald-400',
    warm: 'from-warm-300 to-orange-400',
  };

  return (
    <div className={className}>
      {showText && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {current} / {max}
          </span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${barColors[color]}`}
        />
      </div>
    </div>
  );
}
