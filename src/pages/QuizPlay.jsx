import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, ArrowRight, XCircle } from 'lucide-react';
import ConfettiEffect from '../components/ConfettiEffect';
import { useGame } from '../context/GameContext';
import useTimer from '../hooks/useTimer';
import { TIME_PER_QUESTION } from '../utils/constants';
import { calculateQuestionXP } from '../utils/xpCalculator';

const optionLabels = ['A', 'B', 'C', 'D'];

export default function QuizPlay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuizById, updateQuizResult, addXP } = useGame();

  const quiz = getQuizById(id);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [pointsPopup, setPointsPopup] = useState(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleTimeUp = useCallback(() => {
    if (!showResult && selectedAnswer === null) {
      handleAnswer(-1);
    }
  }, [showResult, selectedAnswer]);

  const { timeLeft, restart, pause } = useTimer(TIME_PER_QUESTION, handleTimeUp);

  useEffect(() => {
    if (quiz && !quizFinished) {
      restart(TIME_PER_QUESTION);
    }
  }, [currentQ, quiz]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quiz Not Found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:shadow-lg transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const questions = quiz.questions;
  const question = questions[currentQ];
  const totalQuestions = questions.length;
  const progress = ((currentQ + (showResult ? 1 : 0)) / totalQuestions) * 100;

  const handleAnswer = (answerIndex) => {
    if (showResult) return;

    pause();
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === question.correctAnswer;

    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);

    const xpEarned = calculateQuestionXP(isCorrect, newStreak, timeLeft);

    if (isCorrect) {
      setConfettiTrigger((prev) => prev + 1);
      setPointsPopup(`+${xpEarned} XP`);
    } else {
      setPointsPopup(null);
    }

    const newAnswer = {
      questionIndex: currentQ,
      selected: answerIndex,
      correct: question.correctAnswer,
      isCorrect,
      timeRemaining: timeLeft,
      xpEarned,
    };

    setAnswers((prev) => [...prev, newAnswer]);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setPointsPopup(null);

    if (currentQ + 1 < totalQuestions) {
      setCurrentQ((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    const allAnswers = answers;
    const correct = allAnswers.filter((a) => a.isCorrect).length;
    const totalXP = allAnswers.reduce((sum, a) => sum + a.xpEarned, 0);
    const score = (correct / totalQuestions) * 100;

    const result = {
      correct,
      total: totalQuestions,
      score,
      totalXP,
      answers: allAnswers,
      completedAt: new Date().toISOString(),
    };

    updateQuizResult(id, result);
    addXP(totalXP, result);

    navigate(`/results/${id}`, { replace: true });
  };

  const timerColor =
    timeLeft > 20
      ? 'text-green-500'
      : timeLeft > 10
      ? 'text-warm-400'
      : 'text-red-500';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <ConfettiEffect trigger={confettiTrigger} />

      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Question {currentQ + 1} of {totalQuestions}
            </span>
            <div className="flex items-center gap-4">
              {streak > 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-bold"
                >
                  <Flame className="w-4 h-4" />
                  {streak}x
                </motion.div>
              )}
              <div className={`flex items-center gap-1 font-mono text-lg font-bold ${timerColor}`}>
                <Clock className="w-4 h-4" />
                {timeLeft}s
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-400 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Question Text */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-relaxed text-center">
              {question.question}
            </h2>

            {/* Options */}
            <div className="grid gap-4">
              {question.options.map((option, idx) => {
                let optionClass =
                  'glass-card p-5 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200';

                if (showResult) {
                  if (idx === question.correctAnswer) {
                    optionClass =
                      'p-5 rounded-2xl border-2 border-green-500 bg-green-500/10 shadow-lg shadow-green-500/10';
                  } else if (idx === selectedAnswer && !answers[answers.length - 1]?.isCorrect) {
                    optionClass =
                      'p-5 rounded-2xl border-2 border-red-500 bg-red-500/10 shadow-lg shadow-red-500/10';
                  } else {
                    optionClass =
                      'p-5 rounded-2xl border border-gray-200 dark:border-dark-500 opacity-50';
                  }
                } else if (selectedAnswer === idx) {
                  optionClass =
                    'glass-card p-5 ring-2 ring-primary-500 shadow-xl';
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!showResult ? { scale: 1.01 } : {}}
                    whileTap={!showResult ? { scale: 0.99 } : {}}
                    onClick={() => !showResult && handleAnswer(idx)}
                    disabled={showResult}
                    className={`${optionClass} text-left flex items-center gap-4 w-full`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                        showResult && idx === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : showResult && idx === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {optionLabels[idx]}
                    </div>
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Result feedback */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Points popup */}
                {pointsPopup && (
                  <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="text-center"
                  >
                    <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-500 font-bold text-lg">
                      {pointsPopup}
                    </span>
                  </motion.div>
                )}

                {/* Explanation */}
                {question.explanation && (
                  <div className="glass-card p-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">Explanation: </span>
                    {question.explanation}
                  </div>
                )}

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                >
                  {currentQ + 1 < totalQuestions ? (
                    <>
                      Next Question <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    'View Results'
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
