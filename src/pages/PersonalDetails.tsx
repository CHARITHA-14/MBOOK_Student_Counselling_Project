import React from 'react';
import Card from '../components/Card';
import { InfoRow } from '../components/InfoRow';
import { Student } from '../data/studentData';

interface PersonalDetailsProps {
  student: Student;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ student }) => {
  const { personalDetails } = student;

  return (
    <div className="space-y-6">
      <Card title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Full Name" value={student.name} />
            <InfoRow label="Registration Number" value={student.regNo} />
            <InfoRow label="Date of Birth" value={personalDetails.dob} />
            <InfoRow label="Gender" value={personalDetails.gender} />
            <InfoRow label="Blood Group" value={personalDetails.bloodGroup} />
          </div>
          <div>
            <InfoRow label="Nationality" value={personalDetails.nationality} />
            <InfoRow label="Religion" value={personalDetails.religion} />
            <InfoRow label="Category" value={personalDetails.category} />
            <InfoRow label="Aadhar Number" value={personalDetails.aadharNumber} />
          </div>
        </div>
      </Card>

      <Card title="Contact Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Email" value={personalDetails.email} />
            <InfoRow label="Phone" value={personalDetails.phone} />
          </div>
          <div>
            <InfoRow label="Address" value={personalDetails.address} />
          </div>
        </div>
      </Card>
    </div>
  );
};
