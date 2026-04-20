import React from 'react';
import Card from '../components/Card';
import { Target, Plus, CheckCircle, Circle } from 'lucide-react';

const dummyGoals = [
  {
    id: 1,
    title: 'Improve CGPA to 9.0',
    description: 'Focus on core subjects and maintain consistent study schedule',
    deadline: '31/12/2024',
    status: 'in_progress',
    progress: 75
  },
  {
    id: 2,
    title: 'Complete Internship',
    description: 'Secure and complete a 3-month internship in software development',
    deadline: '30/06/2024',
    status: 'completed',
    progress: 100
  },
  {
    id: 3,
    title: 'Learn React.js',
    description: 'Complete online course and build 2 projects',
    deadline: '15/08/2024',
    status: 'in_progress',
    progress: 60
  },
  {
    id: 4,
    title: 'Participate in Hackathon',
    description: 'Join at least 2 hackathons this semester',
    deadline: '30/11/2024',
    status: 'pending',
    progress: 0
  }
];

export const GoalSetting: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Goal Setting</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="text-center">
          <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-800">{dummyGoals.length}</p>
          <p className="text-sm text-gray-600">Total Goals</p>
        </Card>

        <Card className="text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-800">
            {dummyGoals.filter((g) => g.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-600">Completed</p>
        </Card>

        <Card className="text-center">
          <Circle className="w-12 h-12 text-orange-600 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-800">
            {dummyGoals.filter((g) => g.status === 'in_progress').length}
          </p>
          <p className="text-sm text-gray-600">In Progress</p>
        </Card>
      </div>

      <div className="space-y-4">
        {dummyGoals.map((goal) => (
          <Card key={goal.id}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}
                >
                  {goal.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Deadline: {goal.deadline}</span>
                <span className="font-semibold text-gray-700">{goal.progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    goal.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
