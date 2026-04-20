import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  user: {
    id: string;
    name: string;
    photo?: string;
    role: 'student' | 'mentor';
  };
  onMenuClick?: () => void;
}

export default function Navbar({ user, onMenuClick }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const computeUnread = (items: { created_at?: string; createdAt?: string; date?: string }[]) => {
    const key = `notifications:lastSeen:${user.role}:${user.id}`;
    const lastSeen = localStorage.getItem(key);
    if (!lastSeen) return items.length;
    const ts = new Date(lastSeen).getTime();
    return items.filter((i) => new Date(i.created_at || i.createdAt || i.date || '').getTime() > ts).length;
  };

  type Item = { created_at?: string; createdAt?: string; date?: string; type: 'remark' | 'counselling'; content: string };
  const fetchNotifications = async () => {
    if (!supabase) {
      return;
    }
    const filters =
      user.role === 'student'
        ? { column: 'student_id', value: user.id }
        : { column: 'mentor_id', value: user.id };
    const { data: remarks } = await supabase
      .from('mentor_remarks')
      .select('*')
      .eq(filters.column, filters.value)
      .order('created_at', { ascending: false })
      .limit(20);
    const { data: sessions } = await supabase
      .from('counselling_records')
      .select('*')
      .eq(filters.column, filters.value)
      .order('created_at', { ascending: false })
      .limit(20);
    const combined: Item[] = [
      ...(remarks || []).map((r: { created_at?: string; remark?: string }): Item => ({
        created_at: r.created_at,
        type: 'remark',
        content: r.remark || '',
      })),
      ...(sessions || []).map((s: { created_at?: string; outcome?: string; purpose?: string }): Item => ({
        created_at: s.created_at,
        type: 'counselling',
        content: s.outcome || s.purpose || '',
      })),
    ].sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    setUnreadCount(computeUnread(combined));
  };

  useEffect(() => {
    if (!supabase || !user?.id) return;
    fetchNotifications();
    const ch1 = supabase
      .channel('public:mentor_remarks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mentor_remarks' }, fetchNotifications)
      .subscribe();
    const ch2 = supabase
      .channel('public:counselling_records')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'counselling_records' }, fetchNotifications)
      .subscribe();
    return () => {
      ch1.unsubscribe();
      ch2.unsubscribe();
    };
  }, [user?.id, user?.role]);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <img
              src="https://vishnu.edu.in/upload_news/newlogo.bmp"
              alt="SVECW"
              className="h-10 w-auto object-contain hidden sm:block"
            />
            <h1 className="ml-2 text-lg font-bold text-slate-800">
              M-Book Mentoring
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => {
                const key = `notifications:lastSeen:${user.role}:${user.id}`;
                localStorage.setItem(key, new Date().toISOString());
                navigate('/notifications');
              }}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium text-slate-700">
                  {user.name}
                </span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      navigate(`/${user.role}/profile`);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
