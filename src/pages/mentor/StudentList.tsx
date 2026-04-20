import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import { getStudentsSync } from '../../lib/data';
import Card from '../../components/Card';
import Table, { TableRow, TableCell } from '../../components/Table';
import { Search, Eye, Plus } from 'lucide-react';

export default function StudentList() {
  const mentor = getCurrentUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  if (!mentor) {
    return <div>Loading...</div>;
  }

  const studentsData = getStudentsSync();
  const assignedStudents = studentsData.filter((student) =>
    mentor.assignedStudents?.includes(student.id)
  );

  const secondYearStudents = assignedStudents.filter((s) => s.year === 2);
  const thirdYearStudents = assignedStudents.filter((s) => s.year === 3);

  const filteredSecondYear = secondYearStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredThirdYear = thirdYearStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Student List</h1>
          <p className="text-slate-600">View and manage your assigned students</p>
        </div>
        <button
          onClick={() => navigate('/mentor/add-student')}
          className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, registration number, or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </Card>

      {/* 2nd Year Students */}
      <Card>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800 mb-2">2nd Year Students</h3>
          <p className="text-slate-600">Students in their second year of study</p>
        </div>
        {filteredSecondYear.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No 2nd year students found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table
              headers={[
                'Photo',
                'Name',
                'Registration Number',
                'Branch',
                'Section',
                'CGPA',
                'Attendance %',
                'Backlogs',
                'Actions',
              ]}
            >
              {filteredSecondYear.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <img
                      src={student.photo || `https://ui-avatars.com/api/?name=${student.name}&background=2563eb&color=fff&size=64`}
                      alt={student.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.registrationNumber}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>Section {student.section}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-medium">
                      {student.cgpa || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded ${
                        (student.attendance || 0) >= 75
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.attendance || 0}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded ${
                        (student.backlogs || 0) === 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {student.backlogs || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => navigate(`/mentor/students/${student.id}`)}
                      className="bg-blue-900 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-blue-800 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </div>
        )}
      </Card>

      {/* 3rd Year Students */}
      <Card>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800 mb-2">3rd Year Students</h3>
          <p className="text-slate-600">Students in their third year of study</p>
        </div>
        {filteredThirdYear.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No 3rd year students found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table
              headers={[
                'Photo',
                'Name',
                'Registration Number',
                'Branch',
                'Section',
                'CGPA',
                'Attendance %',
                'Backlogs',
                'Actions',
              ]}
            >
              {filteredThirdYear.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <img
                      src={student.photo || `https://ui-avatars.com/api/?name=${student.name}&background=2563eb&color=fff&size=64`}
                      alt={student.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.registrationNumber}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>Section {student.section}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-medium">
                      {student.cgpa || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded ${
                        (student.attendance || 0) >= 75
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.attendance || 0}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded ${
                        (student.backlogs || 0) === 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {student.backlogs || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => navigate(`/mentor/students/${student.id}`)}
                      className="bg-blue-900 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-blue-800 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
