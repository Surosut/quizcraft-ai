import { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  STORAGE_KEYS,
  DEFAULT_GAME_STATE,
  DEFAULT_PROFILE,
} from '../utils/constants';
import { calculateLevel } from '../utils/xpCalculator';
import { checkNewAchievements } from '../utils/achievements';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useLocalStorage(STORAGE_KEYS.GAME_STATE, DEFAULT_GAME_STATE);
  const [quizzes, setQuizzes] = useLocalStorage(STORAGE_KEYS.QUIZZES, []);
  const [apiKey, setApiKey] = useLocalStorage(STORAGE_KEYS.API_KEY, '');
  const [profile, setProfile] = useLocalStorage(STORAGE_KEYS.USER_PROFILE, DEFAULT_PROFILE);

  const levelInfo = calculateLevel(gameState.xp);

  const addQuiz = useCallback(
    (quiz) => {
      const newQuiz = {
        ...quiz,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        played: false,
        score: null,
      };
      setQuizzes((prev) => [newQuiz, ...prev]);
      return newQuiz;
    },
    [setQuizzes]
  );

  const updateQuizResult = useCallback(
    (quizId, result) => {
      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === quizId
            ? {
                ...q,
                played: true,
                score: result.score,
                lastPlayedAt: new Date().toISOString(),
                lastResult: result,
              }
            : q
        )
      );
    },
    [setQuizzes]
  );

  const addXP = useCallback(
    (amount, quizResult = null) => {
      setGameState((prev) => {
        const today = new Date().toDateString();
        const lastPlayed = prev.lastPlayedDate
          ? new Date(prev.lastPlayedDate).toDateString()
          : null;
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        let dailyStreak = prev.dailyStreak;
        if (lastPlayed !== today) {
          dailyStreak = lastPlayed === yesterday ? prev.dailyStreak + 1 : 1;
        }

        const newState = {
          ...prev,
          xp: prev.xp + amount,
          totalQuizzes: prev.totalQuizzes + (quizResult ? 1 : 0),
          totalQuestionsAnswered:
            prev.totalQuestionsAnswered + (quizResult ? quizResult.total : 0),
          totalCorrect: prev.totalCorrect + (quizResult ? quizResult.correct : 0),
          lastPlayedDate: new Date().toISOString(),
          dailyStreak,
          currentStreak: quizResult
            ? quizResult.answers
              ? Math.max(
                  prev.currentStreak,
                  longestStreak(quizResult.answers)
                )
              : prev.currentStreak
            : prev.currentStreak,
          bestStreak: quizResult
            ? quizResult.answers
              ? Math.max(
                  prev.bestStreak,
                  longestStreak(quizResult.answers)
                )
              : prev.bestStreak
            : prev.bestStreak,
        };

        // Check achievements
        const newAchievements = checkNewAchievements(newState, quizResult);
        if (newAchievements.length > 0) {
          newState.achievements = [
            ...newState.achievements,
            ...newAchievements.map((a) => a.id),
          ];
        }

        return newState;
      });
    },
    [setGameState]
  );

  const getQuizById = useCallback(
    (id) => quizzes.find((q) => q.id === id),
    [quizzes]
  );

  const deleteQuiz = useCallback(
    (id) => setQuizzes((prev) => prev.filter((q) => q.id !== id)),
    [setQuizzes]
  );

  const resetProgress = useCallback(() => {
    setGameState(DEFAULT_GAME_STATE);
    setQuizzes([]);
  }, [setGameState, setQuizzes]);

  const value = {
    gameState,
    setGameState,
    quizzes,
    apiKey,
    setApiKey,
    profile,
    setProfile,
    levelInfo,
    addQuiz,
    updateQuizResult,
    addXP,
    getQuizById,
    deleteQuiz,
    resetProgress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}

function longestStreak(answers) {
  let max = 0;
  let current = 0;
  for (const a of answers) {
    if (a.isCorrect) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 0;
    }
  }
  return max;
}
