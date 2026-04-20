import { useState } from 'react';
import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import Table, { TableRow, TableCell } from '../../components/Table';

export default function AcademicPerformance() {
  const user = getCurrentUser();
  const [selectedSemester, setSelectedSemester] = useState(1);

  if (!user || !user.academicPerformance) {
    return <div>Loading...</div>;
  }

  const semesters = user.academicPerformance;
  const currentSemester = semesters.find((s: any) => s.semester === selectedSemester);

  // Calculate totals
  const totalCredits = semesters.reduce((sum: number, sem: any) => sum + (sem.credits || 0), 0);
  const totalSGPA = semesters.reduce((sum: number, sem: any) => sum + (sem.sgpa || 0), 0);
  const avgCGPA = totalSGPA / semesters.length;
  const totalBacklogs = user.backlogs || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Academic Performance</h1>
        <p className="text-gray-600">View your semester-wise academic records</p>
      </div>

      {/* Summary Card */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">CGPA</p>
            <p className="text-3xl font-bold text-blue-600">{avgCGPA.toFixed(2)}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">SGPA</p>
            <p className="text-3xl font-bold text-green-600">
              {currentSemester?.sgpa?.toFixed(2) || 'N/A'}
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Credits</p>
            <p className="text-3xl font-bold text-purple-600">{totalCredits}</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Backlogs</p>
            <p className="text-3xl font-bold text-orange-600">{totalBacklogs}</p>
          </div>
        </div>
      </Card>

      {/* Semester Tabs */}
      <Card>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {semesters.map((sem: any) => (
              <button
                key={sem.semester}
                onClick={() => setSelectedSemester(sem.semester)}
                className={`px-4 py-2 font-medium transition-colors ${
                  selectedSemester === sem.semester
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Semester {sem.semester}
              </button>
            ))}
          </div>
        </div>

        {currentSemester && (
          <div>
            <Table
              headers={[
                'Subject Code',
                'Subject Name',
                'Attendance %',
                'Mid Marks',
                'Internal Marks',
                'Grade',
                'Credits',
              ]}
            >
              {currentSemester.subjects.map((subject: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded ${
                        subject.attendance >= 75
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {subject.attendance}%
                    </span>
                  </TableCell>
                  <TableCell>{subject.midMarks}</TableCell>
                  <TableCell>{subject.internalMarks}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                      {subject.grade}
                    </span>
                  </TableCell>
                  <TableCell>{subject.credits}</TableCell>
                </TableRow>
              ))}
            </Table>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Semester SGPA:</span>
                <span className="text-xl font-bold text-blue-600">
                  {currentSemester.sgpa.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium text-gray-700">Total Credits:</span>
                <span className="text-xl font-bold text-blue-600">
                  {currentSemester.credits}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
