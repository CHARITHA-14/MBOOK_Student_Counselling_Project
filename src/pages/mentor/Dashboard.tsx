import { getCurrentUser } from '../../utils/auth';
import { getStudentsSync } from '../../lib/data';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const studentsData = getStudentsSync();
import Card from '../../components/Card';
import { Users, GraduationCap, MessageSquare } from 'lucide-react';

export default function MentorDashboard() {
  const navigate = useNavigate();
  const mentor = getCurrentUser();
  
  if (!mentor) {
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

  // Get assigned students
  const assignedStudents = studentsData.filter((student) =>
    mentor.assignedStudents?.includes(student.id)
  );

  const secondYearStudents = assignedStudents.filter((s) => s.year === 2);
  const thirdYearStudents = assignedStudents.filter((s) => s.year === 3);
  const fourthYearStudents = assignedStudents.filter((s) => s.year === 4);

  const stats = [
    {
      label: 'Total Students',
      value: assignedStudents.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: '2nd Year Students',
      value: secondYearStudents.length,
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      label: '3rd Year Students',
      value: thirdYearStudents.length,
      icon: GraduationCap,
      color: 'bg-purple-500',
    },
    {
      label: '4th Year Students',
      value: fourthYearStudents.length,
      icon: GraduationCap,
      color: 'bg-pink-500',
    },
    {
      label: 'Total Sessions',
      value: mentor.totalCounsellingSessions || 0,
      icon: MessageSquare,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Mentor Dashboard</h1>
          <p className="text-slate-600">Welcome back, {mentor.name}!</p>
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
            src={mentor.photo || `https://ui-avatars.com/api/?name=${mentor.name}&background=6366f1&color=fff&size=128`}
            alt={mentor.name}
            className="w-32 h-32 rounded-2xl border-4 border-indigo-100 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{mentor.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Department:</span>
                <span className="ml-2 font-medium">{mentor.department}</span>
              </div>
              <div>
                <span className="text-slate-600">Email:</span>
                <span className="ml-2 font-medium">{mentor.email}</span>
              </div>
              <div>
                <span className="text-slate-600">Phone:</span>
                <span className="ml-2 font-medium">{mentor.phone}</span>
              </div>
              <div>
                <span className="text-slate-600">Qualification:</span>
                <span className="ml-2 font-medium">{mentor.qualification}</span>
              </div>
              <div>
                <span className="text-slate-600">Experience:</span>
                <span className="ml-2 font-medium">{mentor.experience}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
