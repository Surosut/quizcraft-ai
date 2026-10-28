import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, label, value, color = 'primary', delay = 0 }) {
  const colorClasses = {
    primary: 'from-primary-500/10 to-primary-500/5 border-primary-500/20 text-primary-500',
    accent: 'from-accent-400/10 to-accent-400/5 border-accent-400/20 text-accent-400',
    warm: 'from-warm-300/10 to-warm-300/5 border-warm-300/20 text-warm-400',
    red: 'from-red-500/10 to-red-500/5 border-red-500/20 text-red-500',
  };

  const iconBgClasses = {
    primary: 'bg-primary-500/10',
    accent: 'bg-accent-400/10',
    warm: 'bg-warm-300/10',
    red: 'bg-red-500/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`glass-card p-5 bg-gradient-to-br ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${iconBgClasses[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
