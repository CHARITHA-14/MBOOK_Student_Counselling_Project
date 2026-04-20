import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Users,
  BookOpen,
  FileText,
  GraduationCap,
  Heart,
  AlertCircle,
  MessageSquare,
  Target,
  BarChart3,
  X,
} from 'lucide-react';

interface SidebarProps {
  role: 'student' | 'mentor';
  isOpen: boolean;
  onClose: () => void;
}

const studentMenuItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/personal-details', label: 'Personal Details', icon: User },
  { path: '/student/parent-details', label: 'Parent Details', icon: Users },
  { path: '/student/academic-performance', label: 'Academic Performance', icon: BookOpen },
  { path: '/student/counselling-records', label: 'Counselling Records', icon: FileText },
  { path: '/student/previous-education', label: 'Previous Education', icon: GraduationCap },
  { path: '/student/interests', label: 'Interests & Insights', icon: Heart },
  { path: '/student/backlogs', label: 'Backlog Details', icon: AlertCircle },
  { path: '/student/mentor-remarks', label: 'Mentor Remarks', icon: MessageSquare },
  { path: '/student/attendance-analytics', label: 'Attendance Analytics', icon: BarChart3 },
  { path: '/student/performance-charts', label: 'Performance Charts', icon: BarChart3 },
  { path: '/student/goals', label: 'Goal Setting', icon: Target },
];

const mentorMenuItems = [
  { path: '/mentor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/mentor/students', label: 'Student List', icon: Users },
  { path: '/mentor/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const menuItems = role === 'student' ? studentMenuItems : mentorMenuItems;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-100 z-50 transform transition-transform duration-300 ease-in-out shadow-sm ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 lg:hidden">
            <h2 className="text-lg font-semibold text-slate-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
