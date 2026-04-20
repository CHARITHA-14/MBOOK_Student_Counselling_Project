import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/Admin';
import { Notifications as NotificationsPage } from './pages/Notifications';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import PersonalDetails from './pages/student/PersonalDetails';
import ParentDetails from './pages/student/ParentDetails';
import AcademicPerformance from './pages/student/AcademicPerformance';
import CounsellingRecords from './pages/student/CounsellingRecords';
import PreviousEducation from './pages/student/PreviousEducation';
import Interests from './pages/student/Interests';
import Backlogs from './pages/student/Backlogs';
import MentorRemarks from './pages/student/MentorRemarks';
import AttendanceAnalytics from './pages/student/AttendanceAnalytics';
import PerformanceCharts from './pages/student/PerformanceCharts';
import Goals from './pages/student/Goals';

// Mentor pages
import MentorDashboard from './pages/mentor/Dashboard';
import StudentList from './pages/mentor/StudentList';
import StudentDetails from './pages/mentor/StudentDetails';
import MentorProfile from './pages/mentor/Profile';
import AddStudent from './pages/mentor/AddStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/personal-details"
          element={
            <ProtectedRoute requiredRole="student">
              <PersonalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/parent-details"
          element={
            <ProtectedRoute requiredRole="student">
              <ParentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/academic-performance"
          element={
            <ProtectedRoute requiredRole="student">
              <AcademicPerformance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/counselling-records"
          element={
            <ProtectedRoute requiredRole="student">
              <CounsellingRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/previous-education"
          element={
            <ProtectedRoute requiredRole="student">
              <PreviousEducation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/interests"
          element={
            <ProtectedRoute requiredRole="student">
              <Interests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/backlogs"
          element={
            <ProtectedRoute requiredRole="student">
              <Backlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/mentor-remarks"
          element={
            <ProtectedRoute requiredRole="student">
              <MentorRemarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance-analytics"
          element={
            <ProtectedRoute requiredRole="student">
              <AttendanceAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/performance-charts"
          element={
            <ProtectedRoute requiredRole="student">
              <PerformanceCharts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/goals"
          element={
            <ProtectedRoute requiredRole="student">
              <Goals />
            </ProtectedRoute>
          }
        />

        {/* Mentor Routes */}
        <Route
          path="/mentor/dashboard"
          element={
            <ProtectedRoute requiredRole="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/students"
          element={
            <ProtectedRoute requiredRole="mentor">
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/students/:id"
          element={
            <ProtectedRoute requiredRole="mentor">
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/profile"
          element={
            <ProtectedRoute requiredRole="mentor">
              <MentorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/add-student"
          element={
            <ProtectedRoute requiredRole="mentor">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
