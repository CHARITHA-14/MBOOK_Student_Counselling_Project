import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { AlertTriangle } from 'lucide-react';

export default function AttendanceAnalytics() {
  const user = getCurrentUser();
  const attendance = user?.attendance || 0;
  const academicPerformance = user?.academicPerformance || [];

  const isLowAttendance = attendance < 75;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance Analytics</h1>
        <p className="text-gray-600">Track your attendance across semesters</p>
      </div>

      {/* Overall Attendance */}
      <Card>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Overall Attendance</h3>
            <span
              className={`text-2xl font-bold ${
                attendance >= 75 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {attendance}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${
                attendance >= 75 ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${attendance}%` }}
            />
          </div>
          {isLowAttendance && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Low Attendance Warning</p>
                <p className="text-sm text-red-700">
                  Your attendance is below 75%. Please ensure regular attendance to avoid
                  detention.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Semester-wise Attendance */}
      <Card title="Semester-wise Attendance">
        <div className="space-y-6">
          {academicPerformance.map((semester: any) => {
            const avgAttendance =
              semester.subjects.reduce(
                (sum: number, subj: any) => sum + (subj.attendance || 0),
                0
              ) / (semester.subjects.length || 1);

            return (
              <div key={semester.semester}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">
                    Semester {semester.semester}
                  </span>
                  <span
                    className={`font-bold ${
                      avgAttendance >= 75 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {avgAttendance.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      avgAttendance >= 75 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${avgAttendance}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {semester.subjects.map((subject: any, idx: number) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {subject.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Attendance</span>
                        <span
                          className={`text-sm font-bold ${
                            subject.attendance >= 75
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {subject.attendance}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
