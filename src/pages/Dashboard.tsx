import React from 'react';
import Card from '../components/Card';
import { InfoRow } from '../components/InfoRow';
import { Student } from '../data/studentData';
import { Mail, Phone, BookOpen, Award, User as UserIcon } from 'lucide-react';

interface DashboardProps {
  student: Student;
}

export const Dashboard: React.FC<DashboardProps> = ({ student }) => {
  const latestSemester = student.academicPerformance[student.academicPerformance.length - 1];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">{student.collegeName}</h1>
        <p className="text-blue-100">{student.mentoringTitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center">
            <img
              src={student.photo}
              alt={student.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-sm text-gray-500">{student.regNo}</p>
            <p className="text-sm text-blue-600 font-medium mt-1">{student.branch}</p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">{student.personalDetails.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">{student.studentContact}</span>
            </div>
          </div>
        </Card>

        <Card title="Contact Information" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoRow label="Student Contact" value={student.studentContact} />
              <InfoRow label="Parent Contact" value={student.parentContact} />
              <InfoRow label="Email" value={student.personalDetails.email} />
              <InfoRow label="Blood Group" value={student.personalDetails.bloodGroup} />
            </div>
            <div>
              <InfoRow label="Date of Birth" value={student.personalDetails.dob} />
              <InfoRow label="Gender" value={student.personalDetails.gender} />
              <InfoRow label="Nationality" value={student.personalDetails.nationality} />
              <InfoRow label="Category" value={student.personalDetails.category} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Mentor Information">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{student.mentorName}</h3>
              <p className="text-sm text-gray-500">Faculty Mentor</p>
            </div>
          </div>
          <InfoRow label="Mentor ID" value={student.mentorId} />
        </Card>

        <Card title="Academic Summary">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{latestSemester.cgpa}</p>
              <p className="text-sm text-gray-600">CGPA</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{latestSemester.credits}</p>
              <p className="text-sm text-gray-600">Credits Earned</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-gray-800">Sem {latestSemester.semester}</p>
              <p className="text-sm text-gray-600">Current Semester</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-gray-800">{latestSemester.backlogs}</p>
              <p className="text-sm text-gray-600">Backlogs</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Recent Achievements">
          <ul className="space-y-2">
            {student.interests.achievements.slice(0, 3).map((achievement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-sm text-gray-700">{achievement}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Latest Counselling" className="lg:col-span-2">
          {student.counsellingRecords.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">
                {student.counsellingRecords[student.counsellingRecords.length - 1].date}
              </p>
              <p className="text-sm font-medium text-gray-800 mb-2">
                {student.counsellingRecords[student.counsellingRecords.length - 1].purpose}
              </p>
              <p className="text-sm text-gray-600">
                {student.counsellingRecords[student.counsellingRecords.length - 1].outcome}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
