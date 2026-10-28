import {
  XP_BASE,
  XP_STREAK_BONUS,
  XP_TIME_BONUS,
  XP_TIME_BONUS_THRESHOLD,
  LEVEL_MULTIPLIER,
} from './constants';

export function calculateQuestionXP(isCorrect, streakCount, timeRemaining) {
  if (!isCorrect) return 0;

  let xp = XP_BASE;

  // Streak bonus: +5 for each consecutive correct answer
  if (streakCount > 1) {
    xp += XP_STREAK_BONUS * (streakCount - 1);
  }

  // Time bonus: if answered within threshold seconds
  if (timeRemaining >= XP_TIME_BONUS_THRESHOLD) {
    xp += XP_TIME_BONUS;
  }

  return xp;
}

export function calculateLevel(totalXP) {
  let level = 1;
  let xpNeeded = LEVEL_MULTIPLIER;
  let xpAccumulated = 0;

  while (xpAccumulated + xpNeeded <= totalXP) {
    xpAccumulated += xpNeeded;
    level++;
    xpNeeded = level * LEVEL_MULTIPLIER;
  }

  return {
    level,
    currentLevelXP: totalXP - xpAccumulated,
    xpForNextLevel: xpNeeded,
    totalXP,
  };
}

export function getXPBreakdown(answers) {
  let baseXP = 0;
  let streakBonus = 0;
  let timeBonus = 0;
  let streak = 0;

  for (const answer of answers) {
    if (answer.isCorrect) {
      baseXP += XP_BASE;
      streak++;
      if (streak > 1) {
        streakBonus += XP_STREAK_BONUS * (streak - 1);
      }
      if (answer.timeRemaining >= XP_TIME_BONUS_THRESHOLD) {
        timeBonus += XP_TIME_BONUS;
      }
    } else {
      streak = 0;
    }
  }

  return {
    baseXP,
    streakBonus,
    timeBonus,
    totalXP: baseXP + streakBonus + timeBonus,
  };
}
