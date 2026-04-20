import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  ThumbsUp,
  MessageCircle,
  Trophy,
  Compass,
  Lightbulb,
  Handshake,
  Target,
  Dumbbell,
  Globe,
} from 'lucide-react';
import { getStudentsSync, getMentorsSync } from '../../lib/data';

const MENTORING_CONCEPTS = [
  { label: 'MOTIVATION', icon: ThumbsUp },
  { label: 'ADVICE', icon: MessageCircle },
  { label: 'SUCCESS', icon: Trophy },
  { label: 'DIRECTION', icon: Compass },
  { label: 'COACHING', icon: Lightbulb },
  { label: 'SUPPORT', icon: Handshake },
  { label: 'GOAL', icon: Target },
  { label: 'TRAINING', icon: Dumbbell },
];

export default function Login() {
  const [role, setRole] = useState<'student' | 'mentor'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const studentsData = getStudentsSync();
    const mentorsData = getMentorsSync();
    if (role === 'student') {
      const student = studentsData.find(
        (s) => s.email === email && s.password === password
      );
      if (student) {
        localStorage.setItem('user', JSON.stringify(student));
        localStorage.setItem('role', 'student');
        navigate('/student/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } else {
      const mentor = mentorsData.find(
        (m) => m.email === email && m.password === password
      );
      if (mentor) {
        localStorage.setItem('user', JSON.stringify(mentor));
        localStorage.setItem('role', 'mentor');
        navigate('/mentor/dashboard');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      {/* Header - College name & logo */}
      <header className="bg-blue-600 shadow-md border-b border-blue-700">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center text-blue-50">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            SHRI VISHNU ENGINEERING COLLEGE FOR WOMEN
          </h1>
          <p className="text-sm font-medium mt-0.5">(AUTONOMOUS)</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <img
              src="https://vishnu.edu.in/upload_news/newlogo.bmp"
              alt="SVECW"
              className="h-14 w-auto object-contain"
            />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Vishnu Universal Learning
            </span>
          </div>
          <p className="text-[10px] sm:text-xs mt-2 max-w-2xl mx-auto">
            Approved by AICTE & Permanently Affiliated to JNTUK, Kakinada, Accredited with 'A' Grade by NAAC & NBA
          </p>
          <p className="text-[10px] sm:text-xs mt-1">
            Vishnupur, Bhimavaram, West Godavari Dist., A.P., India, PIN-534 202
          </p>
        </div>
      </header>

      {/* Mentoring Record title bar - same blue as app */}
      <div className="bg-blue-700 py-3 shadow-md">
        <h2 className="text-center text-white text-xl sm:text-2xl font-bold tracking-wide">
          MENTORING RECORD
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Mentoring concept diagram only */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 mb-8">
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
            {MENTORING_CONCEPTS.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 border border-blue-100"
              >
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700 text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign in section */}
        {!showLogin ? (
          <div className="text-center py-4">
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
            >
              Sign in to your record
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Sign in</h3>
            <div className="mb-4">
              <div className="flex rounded-xl overflow-hidden border border-blue-200">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-2.5 text-sm font-medium ${
                    role === 'student' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('mentor')}
                  className={`flex-1 py-2.5 text-sm font-medium ${
                    role === 'mentor' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Mentor
                </button>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                    placeholder="you@college.edu"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                    placeholder="••••"
                    required
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="px-4 py-2 border border-blue-300 rounded-xl text-blue-700 text-sm font-medium hover:bg-blue-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="text-xs text-slate-500 mt-4">
              Demo: Student aaradhya.singh@college.edu / student123 · Mentor srikanth.p@college.edu / mentor123
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center border-t border-blue-200 bg-white/50">
        <a
          href="https://www.svecw.edu.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
        >
          <Globe className="h-4 w-4" />
          www.svecw.edu.in
        </a>
      </footer>
    </div>
  );
}
