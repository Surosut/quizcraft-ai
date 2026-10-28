import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Upload, Play, Trophy, BarChart3, Zap, BookOpen, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        {/* Animated background */}
        <div className="absolute inset-0 hero-gradient opacity-10 dark:opacity-20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-warm-300/10 rounded-full blur-3xl animate-float" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-warm-300" />
                <span className="text-gray-700 dark:text-gray-300">Powered by Google Gemini AI</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="gradient-text">QuizCraft</span>{' '}
              <span className="text-gray-900 dark:text-white">AI</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={fadeUp} custom={2} className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Upload your notes. Master any subject.
              <br />
              <span className="text-gray-500 dark:text-gray-500 text-lg">
                AI-powered quizzes with gamified learning to make studying fun.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/create')}
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold hover:shadow-2xl hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl glass text-gray-700 dark:text-gray-300 text-lg font-semibold hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
              >
                How It Works
              </button>
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-8 pt-6">
              {[
                { value: 'AI-Powered', label: 'Quiz Generation' },
                { value: 'Gamified', label: 'Learning Experience' },
                { value: 'Free', label: 'Open Source' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-lg font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why QuizCraft AI?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Transform your study notes into interactive quizzes in seconds
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Brain,
                title: 'AI Generation',
                description: 'Paste your notes and let Gemini AI create challenging, relevant quiz questions automatically.',
                color: 'from-primary-500/10 to-primary-500/5',
                iconColor: 'text-primary-500',
              },
              {
                icon: Trophy,
                title: 'Gamification',
                description: 'Earn XP, level up, unlock achievements, and track your streaks to stay motivated.',
                color: 'from-warm-300/10 to-warm-300/5',
                iconColor: 'text-warm-400',
              },
              {
                icon: BarChart3,
                title: 'Progress Tracking',
                description: 'Monitor your performance over time with detailed stats and review incorrect answers.',
                color: 'from-accent-400/10 to-accent-400/5',
                iconColor: 'text-accent-400',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                className="glass-card p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-5`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 bg-gray-50 dark:bg-dark-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-500 dark:text-gray-400">
              Three simple steps to ace your next exam
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                icon: Upload,
                title: 'Upload Notes',
                description: 'Paste your study notes or upload a text file. The more detailed, the better the quiz!',
              },
              {
                step: '02',
                icon: Zap,
                title: 'Generate Quiz',
                description: 'AI analyzes your notes and creates tailored multiple-choice questions with explanations.',
              },
              {
                step: '03',
                icon: BookOpen,
                title: 'Play & Learn',
                description: 'Take the quiz, earn XP, beat your high score, and review explanations for wrong answers.',
              },
            ].map((step, i) => (
              <motion.div key={step.step} variants={fadeUp} custom={i} className="relative">
                <div className="glass-card p-8 text-center h-full">
                  <span className="text-6xl font-black gradient-text opacity-20 absolute top-4 right-6">
                    {step.step}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to ace your exams?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              Start generating AI-powered quizzes from your notes today.
            </motion.p>
            <motion.button
              variants={fadeUp}
              custom={2}
              onClick={() => navigate('/create')}
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-primary-500 via-primary-600 to-accent-400 text-white text-lg font-semibold hover:shadow-2xl hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
