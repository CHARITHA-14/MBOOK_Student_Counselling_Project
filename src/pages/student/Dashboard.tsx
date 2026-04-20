import { getCurrentUser } from '../../utils/auth';
import { getMentorsSync } from '../../lib/data';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../../components/Card';
import { TrendingUp, Users, BookOpen, MessageSquare } from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const mentors = getMentorsSync();
  const mentor = user?.mentorId ? mentors.find((m) => m.id === user.mentorId) : null;
  
  if (!user) {
    return <div>Loading...</div>;
  }

  // Check if accessed from admin context
  const adminSession = localStorage.getItem('adminSession');
  const isFromAdmin = !!adminSession;

  const handleReturnToAdmin = () => {
    if (adminSession) {
      const session = JSON.parse(adminSession);
      // Restore admin user context
      localStorage.setItem('currentUser', JSON.stringify({
        id: 'admin',
        name: 'Admin',
        email: 'admin@college.edu',
        role: 'admin'
      }));
      // Clear admin session
      localStorage.removeItem('adminSession');
      // Navigate back to admin
      navigate(session.returnPath || '/admin');
    }
  };

  const stats = [
    {
      label: 'CGPA',
      value: user.cgpa || 'N/A',
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      label: 'Attendance %',
      value: `${user.attendance || 0}%`,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      label: 'Backlogs',
      value: user.backlogs || 0,
      icon: BookOpen,
      color: 'bg-orange-500',
    },
    {
      label: 'Counselling Sessions',
      value: user.counsellingSessions || 0,
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Student Dashboard</h1>
          <p className="text-slate-600">Welcome back, {user.name}!</p>
        </div>
        {isFromAdmin && (
          <button
            onClick={handleReturnToAdmin}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Admin</span>
          </button>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&size=128`}
            alt={user.name}
            className="w-32 h-32 rounded-2xl border-4 border-indigo-100 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{user.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Registration Number:</span>
                <span className="ml-2 font-medium">{user.registrationNumber}</span>
              </div>
              <div>
                <span className="text-slate-600">Branch:</span>
                <span className="ml-2 font-medium">{user.branch}</span>
              </div>
              <div>
                <span className="text-slate-600">Year & Section:</span>
                <span className="ml-2 font-medium">Year {user.year} - Section {user.section}</span>
              </div>
              <div>
                <span className="text-slate-600">Student Contact:</span>
                <span className="ml-2 font-medium">{user.phone}</span>
              </div>
              <div>
                <span className="text-slate-600">Parent Contact:</span>
                <span className="ml-2 font-medium">{user.parentContact}</span>
              </div>
              <div>
                <span className="text-slate-600">Mentor:</span>
                <span className="ml-2 font-medium">{mentor?.name || '—'}</span>
              </div>
              <div>
                <span className="text-slate-600">Mentor Department:</span>
                <span className="ml-2 font-medium">{mentor?.department || '—'}</span>
              </div>
              <div>
                <span className="text-slate-600">Mentor Contact:</span>
                <span className="ml-2 font-medium">{mentor?.phone || '—'}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
<p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
