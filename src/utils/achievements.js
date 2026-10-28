export const ACHIEVEMENTS = [
  {
    id: 'first_quiz',
    name: 'First Steps',
    description: 'Complete your first quiz',
    emoji: '🎯',
    check: (state) => state.totalQuizzes >= 1,
  },
  {
    id: 'ten_quizzes',
    name: 'Quiz Enthusiast',
    description: 'Complete 10 quizzes',
    emoji: '📚',
    check: (state) => state.totalQuizzes >= 10,
  },
  {
    id: 'perfect_score',
    name: 'Perfectionist',
    description: 'Get a perfect score on any quiz',
    emoji: '🏆',
    check: (state, quizResult) => {
      if (!quizResult) return false;
      return quizResult.correct === quizResult.total;
    },
  },
  {
    id: 'five_day_streak',
    name: 'Dedicated Learner',
    description: 'Maintain a 5-day learning streak',
    emoji: '🔥',
    check: (state) => state.dailyStreak >= 5,
  },
  {
    id: 'hundred_questions',
    name: 'Century Club',
    description: 'Answer 100 questions',
    emoji: '💯',
    check: (state) => state.totalQuestionsAnswered >= 100,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Get all correct answers each under 10 seconds',
    emoji: '⚡',
    check: (state, quizResult) => {
      if (!quizResult || !quizResult.answers) return false;
      return (
        quizResult.correct === quizResult.total &&
        quizResult.answers.every((a) => a.isCorrect && a.timeRemaining >= 20)
      );
    },
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Get a 10-question correct streak in a single quiz',
    emoji: '🌟',
    check: (state) => state.bestStreak >= 10,
  },
  {
    id: 'xp_collector',
    name: 'XP Collector',
    description: 'Earn 1000 total XP',
    emoji: '💎',
    check: (state) => state.xp >= 1000,
  },
];

export function checkNewAchievements(gameState, quizResult = null) {
  const newAchievements = [];

  for (const achievement of ACHIEVEMENTS) {
    if (!gameState.achievements.includes(achievement.id)) {
      if (achievement.check(gameState, quizResult)) {
        newAchievements.push(achievement);
      }
    }
  }

  return newAchievements;
}
