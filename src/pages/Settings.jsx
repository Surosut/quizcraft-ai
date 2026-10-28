import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Key,
  User,
  Palette,
  Trash2,
  ExternalLink,
  Save,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { EMOJI_AVATARS } from '../utils/constants';
import ThemeToggle from '../components/ThemeToggle';

export default function Settings() {
  const { apiKey, setApiKey, profile, setProfile, resetProgress } = useGame();
  const { theme } = useTheme();

  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localName, setLocalName] = useState(profile.name);
  const [localAvatar, setLocalAvatar] = useState(profile.avatar);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = () => {
    setProfile({ name: localName.trim() || 'Learner', avatar: localAvatar });
    toast.success('Profile updated!');
  };

  const handleSaveApiKey = () => {
    setApiKey(localApiKey.trim());
    toast.success('API key saved!');
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    toast.success('All progress has been reset');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your profile, API key, and preferences.
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
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Required for AI quiz generation. Stored locally in your browser.
        </p>
        <div className="flex gap-3">
          <input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-600 border border-gray-200 dark:border-dark-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
          />
          <button
            onClick={handleSaveApiKey}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-500 text-white font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-sm text-primary-500 hover:text-primary-400 transition-colors"
        >
          Get a free API key from Google AI Studio <ExternalLink className="w-3 h-3" />
        </a>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Profile
          </h2>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder="Your name..."
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-600 border border-gray-200 dark:border-dark-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
          />
        </div>

        {/* Avatar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Avatar
          </label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_AVATARS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setLocalAvatar(emoji)}
                className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                  localAvatar === emoji
                    ? 'bg-primary-500/20 border-2 border-primary-500 scale-110'
                    : 'bg-gray-100 dark:bg-dark-600 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-dark-500'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-500 text-white font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
        >
          <Save className="w-4 h-4" />
          Save Profile
        </button>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Theme
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle between light and dark themes
            </p>
          </div>
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Reset Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 border-red-500/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <Trash2 className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reset Progress
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This will permanently delete all your quizzes, XP, achievements, and stats.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Reset All Progress
          </button>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="text-sm text-red-500 font-medium">Are you sure? This cannot be undone.</span>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-dark-500 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
