import React, { useState } from 'react';
import Card from '../components/Card';
import Table, { TableRow, TableCell } from '../components/Table';
import { Student, SubjectRecord } from '../data/studentData';

interface AcademicPerformanceProps {
  student: Student;
}

export const AcademicPerformance: React.FC<AcademicPerformanceProps> = ({ student }) => {
  const [activeSemester, setActiveSemester] = useState(0);
  const semester = student.academicPerformance[activeSemester];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap gap-2 mb-6">
          {student.academicPerformance.map((sem, index) => (
            <button
              key={index}
              onClick={() => setActiveSemester(index)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeSemester === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semester {sem.semester}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">SGPA</p>
            <p className="text-2xl font-bold text-blue-600">{semester.sgpa}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">CGPA</p>
            <p className="text-2xl font-bold text-green-600">{semester.cgpa}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Credits</p>
            <p className="text-2xl font-bold text-purple-600">{semester.credits}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Backlogs</p>
            <p className="text-2xl font-bold text-yellow-600">{semester.backlogs}</p>
          </div>
        </div>

        <Table
          headers={['Subject Code', 'Subject Name', 'Attendance %', 'Mid Marks', 'Internal Marks', 'Grade']}
        >
          {semester.subjects?.map((sub: SubjectRecord, i: number) => (
            <TableRow key={i}>
              <TableCell>{sub.subjectCode}</TableCell>
              <TableCell>{sub.subjectName}</TableCell>
              <TableCell>{sub.attendance}%</TableCell>
              <TableCell>{sub.midMarks}</TableCell>
              <TableCell>{sub.internalMarks}</TableCell>
              <TableCell>{sub.grade}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
};
