import React from 'react';
import Card from '../components/Card';
import { Student } from '../data/studentData';

interface PerformanceChartsProps {
  student: Student;
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ student }) => {
  const maxSGPA = 10;

  return (
    <div className="space-y-6">
      <Card title="SGPA Trend">
        <div className="space-y-4">
          {student.academicPerformance.map((sem) => (
            <div key={sem.semester}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Semester {sem.semester}</span>
                <span className="text-sm font-semibold text-blue-600">{sem.sgpa}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${(sem.sgpa / maxSGPA) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="CGPA Progress">
        <div className="flex items-center justify-center py-8">
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="#e5e7eb"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="#3b82f6"
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${(student.academicPerformance[student.academicPerformance.length - 1].cgpa / maxSGPA) * 502.4} 502.4`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">
                {student.academicPerformance[student.academicPerformance.length - 1].cgpa}
              </span>
              <span className="text-sm text-gray-500">CGPA</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Credits Accumulated">
          <div className="space-y-4">
            {student.academicPerformance.map((sem) => (
              <div key={sem.semester} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Semester {sem.semester}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(sem.credits / 70) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-8">{sem.credits}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Performance Summary">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Highest SGPA</span>
              <span className="text-lg font-bold text-blue-600">
                {Math.max(...student.academicPerformance.map((s) => s.sgpa))}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Current CGPA</span>
              <span className="text-lg font-bold text-green-600">
                {student.academicPerformance[student.academicPerformance.length - 1].cgpa}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Total Credits</span>
              <span className="text-lg font-bold text-purple-600">
                {student.academicPerformance[student.academicPerformance.length - 1].credits}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm text-gray-700">Total Backlogs</span>
              <span className="text-lg font-bold text-yellow-600">{student.backlogs.length}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
