import { Link, useLocation } from 'react-router-dom';
import { Brain, Heart } from 'lucide-react';

export default function Footer() {
  const location = useLocation();

  // Hide footer during quiz play
  if (location.pathname.startsWith('/quiz/')) return null;

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">QuizCraft AI</span>
          </Link>

          <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for learners everywhere
          </p>

          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/dashboard" className="hover:text-primary-500 transition-colors">
              Dashboard
            </Link>
            <Link to="/create" className="hover:text-primary-500 transition-colors">
              Create
            </Link>
            <Link to="/settings" className="hover:text-primary-500 transition-colors">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
