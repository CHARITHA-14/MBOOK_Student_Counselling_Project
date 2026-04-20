import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';
import Table, { TableRow, TableCell } from '../components/Table';
import { Search, MessageSquare, FileText, UserPlus, Users, Eye } from 'lucide-react';
import { getStudentsSync, getMentorsSync } from '../lib/data';

const ADMIN_PASSWORD = 'admin123';

type Mentor = {
  id: string;
  name: string;
  email: string;
  password?: string;
  department: string;
  phone?: string;
  qualification?: string;
  experience?: string;
  assignedStudents?: string[];
  totalCounsellingSessions?: number;
};

type MentorRemark = {
  id: string;
  student_id: string;
  mentor_id: string;
  remark: string;
  created_at: string;
  date?: string;
};

type CounsellingRecord = {
  id: string;
  student_id: string;
  mentor_id: string;
  purpose: string;
  outcome?: string;
  discussion_summary?: string;
  created_at: string;
  date?: string;
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'remarks' | 'counselling' | 'mentors' | 'students' | 'add-mentor' | 'add-student'>('remarks');
  const [remarks, setRemarks] = useState<MentorRemark[]>([]);
  const [sessions, setSessions] = useState<CounsellingRecord[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [mentorForm, setMentorForm] = useState({
    name: '',
    email: '',
    password: 'mentor123',
    department: '',
    phone: '',
    qualification: '',
    experience: ''
  });
  const [studentForm, setStudentForm] = useState({
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

  const fetchAll = useCallback(async () => {
    setLoading(true);
    if (supabase) {
      const { data: remarksData } = await supabase
        .from('mentor_remarks')
        .select('*')
        .order('created_at', { ascending: false });
      const { data: sessionsData } = await supabase
        .from('counselling_records')
        .select('*')
        .order('created_at', { ascending: false });
      const { data: mentorsData } = await supabase
        .from('mentors')
        .select('*')
        .order('name', { ascending: true });
      setRemarks((remarksData || []) as MentorRemark[]);
      setSessions((sessionsData || []) as CounsellingRecord[]);
      setMentors((mentorsData || []) as Mentor[]);
    } else {
      const students = getStudentsSync();
      const mentorsList = getMentorsSync();
      const localRemarks: MentorRemark[] = [];
      const localSessions: CounsellingRecord[] = [];
      students.forEach((s) => {
        const r = JSON.parse(localStorage.getItem(`updates:mentor_remarks:${s.id}`) || '[]');
        const c = JSON.parse(localStorage.getItem(`updates:counselling_records:${s.id}`) || '[]');
        (r || []).forEach((x: any) =>
          localRemarks.push({
            id: x.id,
            student_id: s.id,
            mentor_id: x.mentor_id,
            remark: x.remark,
            created_at: x.created_at || x.date || new Date().toISOString(),
            date: x.date,
          })
        );
        (c || []).forEach((x: any) =>
          localSessions.push({
            id: x.id,
            student_id: s.id,
            mentor_id: x.mentor_id,
            purpose: x.purpose,
            outcome: x.outcome,
            discussion_summary: x.discussion_summary,
            created_at: x.created_at || x.date || new Date().toISOString(),
            date: x.date,
          })
        );
      });
      localRemarks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      localSessions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRemarks(localRemarks);
      setSessions(localSessions);
      setMentors(mentorsList as Mentor[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetchAll();
    if (supabase) {
      const ch1 = supabase
        .channel('public:mentor_remarks')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'mentor_remarks' }, fetchAll)
        .subscribe();
      const ch2 = supabase
        .channel('public:counselling_records')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'counselling_records' }, fetchAll)
        .subscribe();
      return () => {
        ch1.unsubscribe();
        ch2.unsubscribe();
      };
    }
  }, [authenticated, fetchAll]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Admin Login</h2>
          <div className="space-y-3">
            <label className="block text-xs font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
            />
            <button
              onClick={() => setAuthenticated(password === ADMIN_PASSWORD)}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Login
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const filteredRemarks = remarks.filter(
    r =>
      r.student_id.toLowerCase().includes(query.toLowerCase()) ||
      r.mentor_id.toLowerCase().includes(query.toLowerCase()) ||
      (r.remark || '').toLowerCase().includes(query.toLowerCase())
  );

  const filteredSessions = sessions.filter(
    s =>
      s.student_id.toLowerCase().includes(query.toLowerCase()) ||
      s.mentor_id.toLowerCase().includes(query.toLowerCase()) ||
      (s.purpose || '').toLowerCase().includes(query.toLowerCase()) ||
      (s.outcome || '').toLowerCase().includes(query.toLowerCase())
  );

  const filteredMentors = mentors.filter(
    m =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase()) ||
      m.department.toLowerCase().includes(query.toLowerCase())
  );

  const students = getStudentsSync();
  const filteredStudents = students.filter(
    s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.registrationNumber.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase()) ||
      s.branch.toLowerCase().includes(query.toLowerCase())
  );

  const handleMentorFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMentorForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewStudentDashboard = (student: any) => {
    // Store the current admin session to allow returning
    localStorage.setItem('adminSession', JSON.stringify({
      authenticated: true,
      returnPath: '/admin'
    }));
    
    // Set the student as the current user
    localStorage.setItem('currentUser', JSON.stringify(student));
    
    // Navigate to student dashboard
    navigate('/student/dashboard');
  };

  const handleViewMentorDashboard = (mentor: Mentor) => {
    // Store the current admin session to allow returning
    localStorage.setItem('adminSession', JSON.stringify({
      authenticated: true,
      returnPath: '/admin'
    }));
    
    // Set the mentor as the current user
    localStorage.setItem('currentUser', JSON.stringify(mentor));
    
    // Navigate to mentor dashboard
    navigate('/mentor/dashboard');
  };

  const handleAddMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newMentor: Mentor = {
        id: `MEN${Date.now()}`,
        name: mentorForm.name,
        email: mentorForm.email,
        password: mentorForm.password,
        department: mentorForm.department,
        phone: mentorForm.phone,
        qualification: mentorForm.qualification,
        experience: mentorForm.experience,
        assignedStudents: [],
        totalCounsellingSessions: 0
      };

      // Add mentor to the list
      const updatedMentors = [...mentors, newMentor];
      setMentors(updatedMentors);

      // Store in localStorage (in a real app, this would be saved to a database)
      const currentMentors = getMentorsSync();
      currentMentors.push(newMentor);
      localStorage.setItem('mentors', JSON.stringify(currentMentors));

      // Reset form and switch to mentors tab
      setMentorForm({
        name: '',
        email: '',
        password: 'mentor123',
        department: '',
        phone: '',
        qualification: '',
        experience: ''
      });
      setActiveTab('mentors');
      alert('Mentor added successfully! The mentor can login with password: mentor123');
    } catch (error) {
      console.error('Error adding mentor:', error);
      alert('Error adding mentor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a unique student ID
      const newStudentId = `STU${Date.now()}`;
      
      // Create new student object with default password
      const newStudent = {
        id: newStudentId,
        password: 'student123',
        name: studentForm.name,
        registrationNumber: studentForm.registrationNumber,
        email: studentForm.email,
        phone: studentForm.phone,
        dateOfBirth: studentForm.dateOfBirth,
        bloodGroup: studentForm.bloodGroup,
        address: studentForm.address,
        branch: studentForm.branch,
        year: studentForm.year,
        section: studentForm.section,
        cgpa: parseFloat(studentForm.cgpa) || 0,
        attendance: parseInt(studentForm.attendance) || 0,
        backlogs: studentForm.backlogs,
        mentorId: '', // Admin can leave empty or assign later
        gender: 'Female',
        religion: 'Hindu',
        nationality: 'Indian',
        category: 'General',
        father: {
          name: studentForm.fatherName,
          phone: studentForm.fatherPhone,
          occupation: studentForm.fatherOccupation,
          qualification: 'B.Tech',
          annualIncome: 600000
        },
        mother: {
          name: studentForm.motherName,
          phone: studentForm.motherPhone,
          occupation: studentForm.motherOccupation,
          qualification: 'M.A.',
          annualIncome: 400000
        },
        localGuardian: {
          name: studentForm.localGuardianName,
          phone: studentForm.localGuardianPhone,
          address: studentForm.localGuardianAddress
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
        parentContact: studentForm.fatherPhone,
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(studentForm.name)}&background=7c3aed&color=fff&size=128`
      };

      // Get current students and add the new one
      const currentStudents = getStudentsSync();
      currentStudents.push(newStudent);
      
      // Store in localStorage (in a real app, this would be saved to a database)
      localStorage.setItem('students', JSON.stringify(currentStudents));

      // Reset form and switch to students tab
      setStudentForm({
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
      setActiveTab('students');
      alert('Student added successfully! The student can login with password: student123');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Admin Panel</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('add-mentor')}
                className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="h-5 w-5" />
                <span>Add Mentor</span>
              </button>
              <button
                onClick={() => setActiveTab('add-student')}
                className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="h-5 w-5" />
                <span>Add Student</span>
              </button>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by student, mentor, text..."
                  className="pl-8 pr-3 py-2 border border-blue-200 rounded-lg text-sm bg-blue-50"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setActiveTab('remarks')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'remarks' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Mentor Remarks ({remarks.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('counselling')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'counselling' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FileText className="h-4 w-4" /> Counselling Records ({sessions.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('mentors')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'mentors' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" /> Mentors ({mentors.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'students' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" /> Students
              </span>
            </button>
            {activeTab === 'add-mentor' && (
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium bg-green-700 text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Add New Mentor
                </span>
              </button>
            )}
            {activeTab === 'add-student' && (
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-700 text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Add New Student
                </span>
              </button>
            )}
          </div>
        </Card>

        <Card>
          {loading ? (
            <div className="p-6 text-slate-600">Loading...</div>
          ) : activeTab === 'remarks' ? (
            <Table headers={['Student', 'Mentor', 'Remark', 'Created', '']}>
              {filteredRemarks.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{r.student_id}</TableCell>
                  <TableCell>{r.mentor_id}</TableCell>
                  <TableCell className="max-w-md">{r.remark}</TableCell>
                  <TableCell>{new Date(r.created_at || r.date || '').toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </Table>
          ) : activeTab === 'counselling' ? (
            <Table headers={['Student', 'Mentor', 'Purpose', 'Outcome', 'Created', '']}>
              {filteredSessions.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.student_id}</TableCell>
                  <TableCell>{s.mentor_id}</TableCell>
                  <TableCell className="max-w-md">{s.purpose}</TableCell>
                  <TableCell className="max-w-md">{s.outcome}</TableCell>
                  <TableCell>{new Date(s.created_at || s.date || '').toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </Table>
          ) : activeTab === 'students' ? (
            <Table headers={['Photo', 'Name', 'Registration Number', 'Email', 'Branch', 'Year', 'Section', 'CGPA', 'Actions']}>
              {filteredStudents.map(s => (
                <TableRow key={s.id}>
                  <TableCell>
                    <img
                      src={s.photo || `https://ui-avatars.com/api/?name=${s.name}&background=6366f1&color=fff&size=64`}
                      alt={s.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.registrationNumber}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.branch}</TableCell>
                  <TableCell>Year {s.year}</TableCell>
                  <TableCell>Section {s.section}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg font-medium">
                      {s.cgpa || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleViewStudentDashboard(s)}
                      className="bg-blue-900 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-blue-800 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Dashboard</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          ) : activeTab === 'add-mentor' ? (
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <UserPlus className="h-5 w-5 text-green-700" />
                <h2 className="text-xl font-semibold text-slate-800">Add New Mentor</h2>
              </div>
              <form onSubmit={handleAddMentor} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={mentorForm.name}
                      onChange={handleMentorFormChange}
                      required
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter mentor's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={mentorForm.email}
                      onChange={handleMentorFormChange}
                      required
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="mentor@college.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={mentorForm.department}
                      onChange={handleMentorFormChange}
                      required
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g., Computer Science Engineering"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={mentorForm.phone}
                      onChange={handleMentorFormChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={mentorForm.qualification}
                      onChange={handleMentorFormChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g., Ph.D, M.Tech"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={mentorForm.experience}
                      onChange={handleMentorFormChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g., 10 years"
                    />
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Default Password:</strong> mentor123
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    The mentor will be able to login with this default password and can change it later.
                  </p>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('mentors')}
                    className="px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>{loading ? 'Adding Mentor...' : 'Add Mentor'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === 'add-student' ? (
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <UserPlus className="h-5 w-5 text-blue-700" />
                <h2 className="text-xl font-semibold text-slate-800">Add New Student</h2>
              </div>
              <form onSubmit={handleAddStudent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={studentForm.name}
                      onChange={handleStudentFormChange}
                      required
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter student's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number *</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={studentForm.registrationNumber}
                      onChange={handleStudentFormChange}
                      required
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g., 23B01A12B7"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={studentForm.email}
                      onChange={handleStudentFormChange}
                      required
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="student@college.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={studentForm.phone}
                      onChange={handleStudentFormChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
                    <select
                      name="branch"
                      value={studentForm.branch}
                      onChange={handleStudentFormChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                      value={studentForm.year}
                      onChange={handleStudentFormChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value={1}>1st Year</option>
                      <option value={2}>2nd Year</option>
                      <option value={3}>3rd Year</option>
                      <option value={4}>4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                    <select
                      name="section"
                      value={studentForm.section}
                      onChange={handleStudentFormChange}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                      value={studentForm.cgpa}
                      onChange={handleStudentFormChange}
                      step="0.1"
                      min="0"
                      max="10"
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="8.5"
                    />
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Default Password:</strong> student123
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    The student will be able to login with this default password and can change it later.
                  </p>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('students')}
                    className="px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>{loading ? 'Adding Student...' : 'Add Student'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <Table headers={['Name', 'Email', 'Department', 'Phone', 'Assigned Students', 'Actions']}>
              {filteredMentors.map(m => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.email}</TableCell>
                  <TableCell>{m.department}</TableCell>
                  <TableCell>{m.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg font-medium">
                      {m.assignedStudents?.length || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleViewMentorDashboard(m)}
                      className="bg-blue-900 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-blue-800 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Dashboard</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}
