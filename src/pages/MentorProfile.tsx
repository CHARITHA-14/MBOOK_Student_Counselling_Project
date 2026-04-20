import React from 'react';
import Card from '../components/Card';
import { InfoRow } from '../components/InfoRow';
import { mentorData } from '../data/studentData';
import { Mail, Phone, Award, BookOpen, Users } from 'lucide-react';

export const MentorProfile: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={mentorData.photo}
            alt={mentorData.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{mentorData.name}</h2>
            <p className="text-blue-600 font-medium">{mentorData.designation}</p>
            <p className="text-gray-600 text-sm">{mentorData.department}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{mentorData.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{mentorData.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-800">{mentorData.experience}</p>
          <p className="text-sm text-gray-600">Experience</p>
        </Card>

        <Card className="text-center">
          <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-800">{mentorData.qualification}</p>
          <p className="text-sm text-gray-600">Qualification</p>
        </Card>

        <Card className="text-center">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-800">{mentorData.mentees}</p>
          <p className="text-sm text-gray-600">Mentees</p>
        </Card>
      </div>

      <Card title="Professional Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Designation" value={mentorData.designation} />
            <InfoRow label="Department" value={mentorData.department} />
            <InfoRow label="Experience" value={mentorData.experience} />
          </div>
          <div>
            <InfoRow label="Qualification" value={mentorData.qualification} />
            <InfoRow label="Specialization" value={mentorData.specialization} />
            <InfoRow label="Total Mentees" value={mentorData.mentees} />
          </div>
        </div>
      </Card>

      <Card title="Specialization & Expertise">
        <div className="flex flex-wrap gap-2">
          {mentorData.specialization.split(',').map((spec, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              {spec.trim()}
            </span>
          ))}
        </div>
      </Card>

      <Card title="Contact Information">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-800">{mentorData.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm text-gray-800">{mentorData.phone}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
