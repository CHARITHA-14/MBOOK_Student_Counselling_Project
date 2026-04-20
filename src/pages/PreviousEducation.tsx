import React from 'react';
import Card from '../components/Card';
import { InfoRow } from '../components/InfoRow';
import { Student } from '../data/studentData';

interface PreviousEducationProps {
  student: Student;
}

export const PreviousEducation: React.FC<PreviousEducationProps> = ({ student }) => {
  const { previousEducation } = student;

  return (
    <div className="space-y-6">
      <Card title="Class X Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Institution" value={previousEducation.classX.institution} />
            <InfoRow label="Year of Passing" value={previousEducation.classX.year} />
          </div>
          <div>
            <InfoRow label="Board" value={previousEducation.classX.board} />
            <InfoRow label="Percentage" value={`${previousEducation.classX.percentage}%`} />
          </div>
        </div>
      </Card>

      <Card title="Class XII / Diploma Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Institution" value={previousEducation.classXII.institution} />
            <InfoRow label="Year of Passing" value={previousEducation.classXII.year} />
          </div>
          <div>
            <InfoRow label="Board" value={previousEducation.classXII.board} />
            <InfoRow label="Percentage" value={`${previousEducation.classXII.percentage}%`} />
          </div>
        </div>
      </Card>
    </div>
  );
};
