import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import Table, { TableRow, TableCell } from '../../components/Table';
import { AlertCircle } from 'lucide-react';

export default function Backlogs() {
  const user = getCurrentUser();
  const backlogs = user?.backlogDetails || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Backlog Details</h1>
        <p className="text-gray-600">View your backlog subjects and attempts</p>
      </div>

      <Card>
        {backlogs.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-xl font-medium text-gray-700 mb-2">No Backlogs!</p>
            <p className="text-gray-600">Congratulations! You have cleared all subjects.</p>
          </div>
        ) : (
          <Table headers={['Subject', 'Attempt Number', 'Month/Year', 'Grade']}>
            {backlogs.map((backlog: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{backlog.subject}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                    Attempt {backlog.attemptNumber}
                  </span>
                </TableCell>
                <TableCell>{backlog.monthYear}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded font-medium ${
                      backlog.grade === 'F'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {backlog.grade}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}
