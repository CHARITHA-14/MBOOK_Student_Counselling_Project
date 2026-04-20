import React from 'react';
import Card from '../components/Card';
import Table, { TableRow, TableCell } from '../components/Table';
import { Student } from '../data/studentData';
import { AlertCircle } from 'lucide-react';

interface BacklogDetailsProps {
  student: Student;
}

export const BacklogDetails: React.FC<BacklogDetailsProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <Card title="Backlog Details">
        {student.backlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Backlogs</h3>
            <p className="text-sm text-gray-600">
              Excellent! The student has no pending backlogs.
            </p>
          </div>
        ) : (
          <Table headers={['Subject Code', 'Subject Name', 'Attempt', 'Month/Year', 'Grade']}>
            {student.backlogs.map((b: { subjectCode?: string; subject?: string; attempt?: number; monthYear?: string; grade?: string }, i: number) => (
              <TableRow key={i}>
                <TableCell>{b.subjectCode ?? '-'}</TableCell>
                <TableCell>{b.subject ?? '-'}</TableCell>
                <TableCell>{b.attempt ?? '-'}</TableCell>
                <TableCell>{b.monthYear ?? '-'}</TableCell>
                <TableCell>{b.grade ?? '-'}</TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};
