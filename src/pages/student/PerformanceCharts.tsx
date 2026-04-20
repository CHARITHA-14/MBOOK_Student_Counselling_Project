import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function PerformanceCharts() {
  const user = getCurrentUser();
  const academicPerformance = user?.academicPerformance || [];

  // Prepare SGPA progression data
  const sgpaData = academicPerformance.map((sem: any) => ({
    semester: `Sem ${sem.semester}`,
    sgpa: sem.sgpa,
  }));

  // Prepare subject performance data
  const subjectData: any[] = [];
  academicPerformance.forEach((sem: any) => {
    sem.subjects.forEach((subject: any) => {
      subjectData.push({
        subject: subject.name.length > 20 ? subject.name.substring(0, 20) + '...' : subject.name,
        marks: subject.midMarks + subject.internalMarks,
        grade: subject.grade,
      });
    });
  });

  // Prepare grade distribution
  const gradeCount: Record<string, number> = {};
  academicPerformance.forEach((sem: any) => {
    sem.subjects.forEach((subject: any) => {
      gradeCount[subject.grade] = (gradeCount[subject.grade] || 0) + 1;
    });
  });

  const gradeData = Object.entries(gradeCount).map(([grade, count]) => ({
    name: grade,
    value: count,
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Performance Charts</h1>
        <p className="text-gray-600">Visualize your academic performance</p>
      </div>

      {/* SGPA Progression */}
      <Card title="SGPA Progression">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sgpaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sgpa"
              stroke="#3b82f6"
              strokeWidth={2}
              name="SGPA"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Subject Performance */}
      <Card title="Subject Performance (Total Marks)">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={subjectData.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="marks" fill="#3b82f6" name="Total Marks" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Grade Distribution */}
      <Card title="Grade Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={gradeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {gradeData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
