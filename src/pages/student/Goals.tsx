import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { CheckCircle2, Circle } from 'lucide-react';

export default function Goals() {
  const user = getCurrentUser();
  const goals = user?.goals || {
    shortTerm: [],
    longTerm: [],
    careerPlans: '',
    actionPlan: [],
  };

  const toggleActionPlan = (id: string) => {
    // In a real app, this would update the backend
    console.log('Toggle action plan:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Goal Setting</h1>
        <p className="text-gray-600">Set and track your academic and career goals</p>
      </div>

      {/* Short-term Goals */}
      <Card title="Short-term Goals">
        <div className="space-y-4">
          {goals.shortTerm && goals.shortTerm.length > 0 ? (
            goals.shortTerm.map((goal: any) => (
              <div
                key={goal.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{goal.goal}</h4>
                    <p className="text-sm text-gray-600">
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      goal.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-4">No short-term goals set yet.</p>
          )}
        </div>
      </Card>

      {/* Long-term Goals */}
      <Card title="Long-term Goals">
        <div className="space-y-4">
          {goals.longTerm && goals.longTerm.length > 0 ? (
            goals.longTerm.map((goal: any) => (
              <div
                key={goal.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{goal.goal}</h4>
                    <p className="text-sm text-gray-600">
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      goal.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-4">No long-term goals set yet.</p>
          )}
        </div>
      </Card>

      {/* Career Plans */}
      <Card title="Career Plans">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-800">
            {goals.careerPlans || 'No career plans specified yet.'}
          </p>
        </div>
      </Card>

      {/* Action Plan */}
      <Card title="Action Plan Checklist">
        <div className="space-y-3">
          {goals.actionPlan && goals.actionPlan.length > 0 ? (
            goals.actionPlan.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer"
                onClick={() => toggleActionPlan(item.id)}
              >
                {item.status === 'Completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <span
                  className={`flex-1 ${
                    item.status === 'Completed'
                      ? 'line-through text-gray-500'
                      : 'text-gray-800'
                  }`}
                >
                  {item.task}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-4">No action items yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
