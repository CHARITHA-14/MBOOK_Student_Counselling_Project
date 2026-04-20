import React from 'react';
import Card from '../components/Card';
import { Student } from '../data/studentData';
import { Heart, TrendingUp, TrendingDown, Award, Activity } from 'lucide-react';

interface InterestsProps {
  student: Student;
}

export const Interests: React.FC<InterestsProps> = ({ student }) => {
  const { interests } = student;

  return (
    <div className="space-y-6">
      <Card title="Interests & Hobbies">
        <div className="flex items-start space-x-3 mb-3">
          <Heart className="w-5 h-5 text-blue-600 mt-1" />
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {interests.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Strengths">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
            <ul className="space-y-2 flex-1">
              {interests.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card title="Areas for Improvement">
          <div className="flex items-start space-x-3">
            <TrendingDown className="w-5 h-5 text-orange-600 mt-1" />
            <ul className="space-y-2 flex-1">
              {interests.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-sm text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <Card title="Achievements">
        <div className="flex items-start space-x-3">
          <Award className="w-5 h-5 text-yellow-600 mt-1" />
          <ul className="space-y-2 flex-1">
            {interests.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span className="text-sm text-gray-700">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card title="Health Information">
        <div className="flex items-start space-x-3">
          <Activity className="w-5 h-5 text-red-600" />
          <p className="text-sm text-gray-700">{interests.healthInfo}</p>
        </div>
      </Card>
    </div>
  );
};
