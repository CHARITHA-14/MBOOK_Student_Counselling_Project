import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import { getStudentsSync } from '../../lib/data';
import Card from '../../components/Card';
import { Save, ArrowLeft, User, Mail, Phone, Calendar, MapPin, BookOpen } from 'lucide-react';

export default function AddStudent() {
  const mentor = getCurrentUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    bloodGroup: '',
    address: '',
    branch: 'Computer Science Engineering',
    year: 2,
    section: 'A',
    cgpa: '',
    attendance: '',
    backlogs: 0,
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    localGuardianName: '',
    localGuardianPhone: '',
    localGuardianAddress: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a unique student ID
      const newStudentId = `STU${Date.now()}`;
      
      // Create new student object with default password
      const newStudent = {
        id: newStudentId,
        password: 'student123',
        name: formData.name,
        registrationNumber: formData.registrationNumber,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        branch: formData.branch,
        year: formData.year,
        section: formData.section,
        cgpa: parseFloat(formData.cgpa) || 0,
        attendance: parseInt(formData.attendance) || 0,
        backlogs: formData.backlogs,
        mentorId: mentor?.id,
        gender: 'Female',
        religion: 'Hindu',
        nationality: 'Indian',
        category: 'General',
        father: {
          name: formData.fatherName,
          phone: formData.fatherPhone,
          occupation: formData.fatherOccupation,
          qualification: 'B.Tech',
          annualIncome: 600000
        },
        mother: {
          name: formData.motherName,
          phone: formData.motherPhone,
          occupation: formData.motherOccupation,
          qualification: 'M.A.',
          annualIncome: 400000
        },
        localGuardian: {
          name: formData.localGuardianName,
          phone: formData.localGuardianPhone,
          address: formData.localGuardianAddress
        },
        academicPerformance: [
          {
            semester: 1,
            sgpa: 8,
            credits: 24,
            subjects: [
              {
                code: 'CS101',
                name: 'Programming',
                attendance: 85,
                midMarks: 40,
                internalMarks: 18,
                grade: 'A',
                credits: 4
              }
            ]
          }
        ],
        counsellingRecords: [],
        previousEducation: {
          classX: {
            institution: 'School',
            board: 'CBSE',
            year: 2019,
            percentage: 88
          },
          classXII: {
            institution: 'School',
            board: 'CBSE',
            year: 2021,
            percentage: 85
          }
        },
        interests: ['Technology', 'Coding'],
        strengths: ['Problem Solving'],
        weaknesses: [],
        achievements: [],
        healthInformation: 'None',
        backlogDetails: [],
        mentorRemarks: [],
        goals: {
          shortTerm: [],
          longTerm: [],
          careerPlans: 'Software Developer',
          actionPlan: []
        },
        counsellingSessions: 0,
        parentContact: formData.fatherPhone,
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=7c3aed&color=fff&size=128`
      };

      // Get current students and add the new one
      const students = getStudentsSync();
      students.push(newStudent);
      
      // Store in localStorage (in a real app, this would be saved to a database)
      localStorage.setItem('students', JSON.stringify(students));

      // Update mentor's assigned students list
      if (mentor && mentor.assignedStudents) {
        const updatedMentor = {
          ...mentor,
          assignedStudents: [...mentor.assignedStudents, newStudentId]
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedMentor));
      }

      alert('Student added successfully! The student can login with password: student123');
      navigate('/mentor/students');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mentor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/mentor/students')}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Add New Student</h1>
          <p className="text-slate-600">Fill in the student's information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-slate-800">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Enter student's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number *</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g., 23B01A12B7"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="student@college.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Enter full address"
              />
            </div>
          </div>
        </Card>

        {/* Academic Information */}
        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-slate-800">Academic Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Computer Science Engineering">Computer Science Engineering</option>
                <option value="Electronics Engineering">Electronics Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CGPA</label>
              <input
                type="number"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="8.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Attendance (%)</label>
              <input
                type="number"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="85"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Backlogs</label>
              <input
                type="number"
                name="backlogs"
                value={formData.backlogs}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </Card>

        {/* Parent Information */}
        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-slate-800">Parent Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Father's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Father's Phone</label>
              <input
                type="tel"
                name="fatherPhone"
                value={formData.fatherPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Father's Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Father's occupation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Mother's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mother's Phone</label>
              <input
                type="tel"
                name="motherPhone"
                value={formData.motherPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mother's Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Mother's occupation"
              />
            </div>
          </div>
        </Card>

        {/* Local Guardian Information */}
        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-slate-800">Local Guardian Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Guardian's Name</label>
              <input
                type="text"
                name="localGuardianName"
                value={formData.localGuardianName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Guardian's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Guardian's Phone</label>
              <input
                type="tel"
                name="localGuardianPhone"
                value={formData.localGuardianPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="+91 9876543210"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Guardian's Address</label>
              <textarea
                name="localGuardianAddress"
                value={formData.localGuardianAddress}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Guardian's address"
              />
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate('/mentor/students')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? 'Adding Student...' : 'Add Student'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
