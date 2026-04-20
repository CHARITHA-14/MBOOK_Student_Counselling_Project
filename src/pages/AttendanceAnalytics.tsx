import React from 'react';
import Card from '../components/Card';
import { Student } from '../data/studentData';
import { TrendingUp } from 'lucide-react';

interface AttendanceAnalyticsProps {
  student: Student;
}

export const AttendanceAnalytics: React.FC<AttendanceAnalyticsProps> = ({ student }) => {
  const latestSemester = student.academicPerformance[student.academicPerformance.length - 1];

  const getColorClass = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-500';
    if (attendance >= 75) return 'bg-blue-500';
    if (attendance >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const overallAttendance =
    latestSemester.subjects.reduce((sum, subject) => sum + subject.attendance, 0) /
    latestSemester.subjects.length;

  return (
    <div className="space-y-6">
      <Card title="Overall Attendance Summary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Current Semester Average</p>
            <p className="text-4xl font-bold text-gray-800">{overallAttendance.toFixed(1)}%</p>
          </div>
          <TrendingUp className="w-12 h-12 text-green-500" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`${getColorClass(overallAttendance)} h-4 rounded-full transition-all`}
            style={{ width: `${overallAttendance}%` }}
          ></div>
        </div>
      </Card>

      <Card title="Subject-wise Attendance">
        <div className="space-y-4">
          {latestSemester.subjects.map((subject, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{subject.subjectName}</p>
                  <p className="text-xs text-gray-500">{subject.subjectCode}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">{subject.attendance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${getColorClass(subject.attendance)} h-3 rounded-full transition-all`}
                  style={{ width: `${subject.attendance}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">
                {latestSemester.subjects.filter((s) => s.attendance >= 90).length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Excellent Attendance</p>
            <p className="text-xs text-gray-500">(≥90%)</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600">
                {latestSemester.subjects.filter((s) => s.attendance >= 75 && s.attendance < 90).length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Good Attendance</p>
            <p className="text-xs text-gray-500">(75-89%)</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-red-600">
                {latestSemester.subjects.filter((s) => s.attendance < 75).length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Below Requirement</p>
            <p className="text-xs text-gray-500">(&lt;75%)</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
