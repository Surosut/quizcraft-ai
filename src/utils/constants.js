export const STORAGE_KEYS = {
  QUIZZES: 'quizcraft_quizzes',
  GAME_STATE: 'quizcraft_game_state',
  API_KEY: 'quizcraft_gemini_key',
  THEME: 'quizcraft_theme',
  USER_PROFILE: 'quizcraft_profile',
};

export const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20];

export const TIME_PER_QUESTION = 30;

export const XP_BASE = 10;
export const XP_STREAK_BONUS = 5;
export const XP_TIME_BONUS_THRESHOLD = 10;
export const XP_TIME_BONUS = 5;

export const LEVEL_MULTIPLIER = 100;

export const EMOJI_AVATARS = [
  '🧠', '🚀', '⚡', '🎯', '🔥', '💎', '🌟', '🦊',
  '🐱', '🐶', '🦁', '🐼', '🦄', '🐉', '🎮', '👾',
];

export const DEFAULT_PROFILE = {
  name: 'Learner',
  avatar: '🧠',
};

export const DEFAULT_GAME_STATE = {
  xp: 0,
  level: 1,
  totalQuizzes: 0,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastPlayedDate: null,
  dailyStreak: 0,
  achievements: [],
};

export const LOADING_MESSAGES = [
  'Analyzing your notes...',
  'Identifying key concepts...',
  'Crafting challenging questions...',
  'Adding tricky distractors...',
  'Polishing the quiz...',
  'Almost ready!',
];

export const PERFORMANCE_RATINGS = [
  { min: 100, emoji: '🏆', label: 'Perfect!', message: 'Flawless victory! You nailed every question!' },
  { min: 80, emoji: '⭐', label: 'Excellent!', message: 'Outstanding performance! Almost perfect!' },
  { min: 60, emoji: '👍', label: 'Good Job!', message: 'Solid effort! You know your stuff.' },
  { min: 40, emoji: '💪', label: 'Keep Trying!', message: 'You\'re getting there — practice makes perfect!' },
  { min: 0, emoji: '📚', label: 'Study More!', message: 'Review the material and try again. You got this!' },
];
