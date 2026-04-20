import React from 'react';
import Card from '../components/Card';
import { InfoRow } from '../components/InfoRow';
import { Student } from '../data/studentData';

interface ParentDetailsProps {
  student: Student;
}

export const ParentDetails: React.FC<ParentDetailsProps> = ({ student }) => {
  const { parentDetails } = student;

  return (
    <div className="space-y-6">
      <Card title="Father's Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Name" value={parentDetails.father.name} />
            <InfoRow label="Phone" value={parentDetails.father.phone} />
            <InfoRow label="Occupation" value={parentDetails.father.occupation} />
          </div>
          <div>
            <InfoRow label="Qualification" value={parentDetails.father.qualification} />
            <InfoRow label="Annual Income" value={`₹ ${parentDetails.father.income}`} />
          </div>
        </div>
      </Card>

      <Card title="Mother's Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Name" value={parentDetails.mother.name} />
            <InfoRow label="Phone" value={parentDetails.mother.phone} />
            <InfoRow label="Occupation" value={parentDetails.mother.occupation} />
          </div>
          <div>
            <InfoRow label="Qualification" value={parentDetails.mother.qualification} />
            <InfoRow label="Annual Income" value={`₹ ${parentDetails.mother.income}`} />
          </div>
        </div>
      </Card>

      <Card title="Local Guardian Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Name" value={parentDetails.localGuardian.name} />
            <InfoRow label="Phone" value={parentDetails.localGuardian.phone} />
          </div>
          <div>
            <InfoRow label="Relation" value={parentDetails.localGuardian.relation} />
            <InfoRow label="Address" value={parentDetails.localGuardian.address} />
          </div>
        </div>
      </Card>
    </div>
  );
};
