/**
 * Seed script for women-only mentors (IT & CSE) and students
 * 4 mentors: 2 IT + 2 CSE | 80 students: 20 per mentor (10 year 2, 10 year 3)
 */

const womenMentors = [
  { id: 'MEN001', name: 'Dr. Kavitha Reddy', email: 'kavitha.reddy@college.edu', department: 'Computer Science Engineering', phone: '+91 9876543300', qualification: 'Ph.D. in Computer Science', experience: '14 years' },
  { id: 'MEN002', name: 'Dr. Ananya Sharma', email: 'ananya.sharma@college.edu', department: 'Computer Science Engineering', phone: '+91 9876543301', qualification: 'Ph.D. in Machine Learning', experience: '11 years' },
  { id: 'MEN003', name: 'Dr. Priya Venkatesh', email: 'priya.venkatesh@college.edu', department: 'Information Technology', phone: '+91 9876543302', qualification: 'Ph.D. in Information Technology', experience: '13 years' },
  { id: 'MEN004', name: 'Dr. Meera Krishnan', email: 'meera.krishnan@college.edu', department: 'Information Technology', phone: '+91 9876543303', qualification: 'Ph.D. in Data Science', experience: '12 years' },
];

const womenNames = [
  'Aaradhya Singh', 'Aditi Nair', 'Anjali Menon', 'Bhavya Iyer', 'Charulatha Rao', 'Divya Kumar', 'Esha Gupta', 'Gayatri Pillai', 'Ishita Reddy', 'Jyotsna Das',
  'Kavya Nambiar', 'Lakshmi Venkat', 'Madhuri Sharma', 'Neha Patel', 'Pooja Krishnan', 'Rekha Mohan', 'Sanjana Rao', 'Tanisha Singh', 'Uma Krishnan', 'Vidya Nair',
  'Yamini Gupta', 'Zara Khan', 'Adya Menon', 'Bhumika Iyer', 'Chitra Das', 'Disha Reddy', 'Ekta Sharma', 'Farah Patel', 'Gitanjali Rao', 'Hema Krishnan',
  'Indira Nair', 'Jaya Venkat', 'Kriti Singh', 'Lalita Kumar', 'Maya Iyer', 'Nithya Menon', 'Oormila Das', 'Parvati Reddy', 'Queen Gupta', 'Radhika Sharma',
  'Shruti Patel', 'Tulasi Rao', 'Urvashi Krishnan', 'Vandana Nair', 'Wendy Singh', 'Xena Iyer', 'Yasmin Menon', 'Zeenat Das', 'Amrita Reddy', 'Brinda Kumar',
  'Chandrika Gupta', 'Deepika Sharma', 'Eesha Patel', 'Fathima Rao', 'Gowri Krishnan', 'Harini Nair', 'Inika Singh', 'Janani Iyer', 'Kaveri Menon', 'Lavanya Das',
  'Mrunal Reddy', 'Nandini Kumar', 'Oviya Gupta', 'Pallavi Sharma', 'Riya Patel', 'Sneha Rao', 'Trisha Krishnan', 'Usha Nair', 'Varsha Singh', 'Wriddhi Iyer',
  'Ximena Menon', 'Yukta Das', 'Zara Reddy', 'Aisha Kumar', 'Bindiya Gupta', 'Chaya Sharma', 'Dhwani Patel', 'Ela Rao', 'Fiza Krishnan', 'Gauri Nair',
];

const baseStudent = {
  password: 'student123',
  gender: 'Female',
  religion: 'Hindu',
  nationality: 'Indian',
  category: 'General',
  father: { name: 'Parent', phone: '+91 9876543211', occupation: 'Professional', qualification: 'B.Tech', annualIncome: 600000 },
  mother: { name: 'Parent', phone: '+91 9876543212', occupation: 'Teacher', qualification: 'M.A.', annualIncome: 400000 },
  localGuardian: { name: 'Guardian', phone: '+91 9876543213', address: 'College Road, City' },
  academicPerformance: [{ semester: 1, sgpa: 8.0, credits: 24, subjects: [{ code: 'CS101', name: 'Programming', attendance: 85, midMarks: 40, internalMarks: 18, grade: 'A', credits: 4 }] }],
  counsellingRecords: [],
  previousEducation: { classX: { institution: 'School', board: 'CBSE', year: 2019, percentage: 88 }, classXII: { institution: 'School', board: 'CBSE', year: 2021, percentage: 85 } },
  interests: ['Technology', 'Coding'],
  strengths: ['Problem Solving'],
  weaknesses: [],
  achievements: [],
  healthInformation: 'None',
  backlogDetails: [],
  mentorRemarks: [],
  goals: { shortTerm: [], longTerm: [], careerPlans: 'Software Developer', actionPlan: [] },
};

function generateStudents() {
  const students = [];
  let idx = 0;
  const branches = ['Computer Science Engineering', 'Information Technology'];
  const mentorAssignments = {
    MEN001: [], MEN002: [], MEN003: [], MEN004: [],
  };

  // 20 students per mentor: 10 year 2, 10 year 3
  for (const mentor of womenMentors) {
    const mentorBranch = mentor.department;
    for (let y = 0; y < 2; y++) {
      const year = y === 0 ? 2 : 3;
      for (let i = 0; i < 10; i++) {
        const stuId = `STU${String(++idx).padStart(3, '0')}`;
        const name = womenNames[(idx - 1) % womenNames.length];
        // IT: 23B01A12XX, 23B01A05XX | CSE: 23B01A04XX | AI: 23B01A45XX
        let regNum;
        if (mentorBranch.includes('Information Technology')) {
          const series = mentor.id === 'MEN003' ? '12' : '05'; // first IT mentor 12xx, second 05xx
          const serial = String((y * 10) + (i + 1)).padStart(2, '0');
          regNum = `23B01A${series}${serial}`;
        } else if (mentorBranch.includes('Artificial Intelligence') || mentorBranch.includes('AI')) {
          const serial = String((y * 10) + (i + 1)).padStart(2, '0');
          regNum = `23B01A45${serial}`;
        } else {
          const mentorOffset = mentor.id === 'MEN001' ? 0 : 20;
          const serial = String(mentorOffset + (y * 10) + (i + 1)).padStart(2, '0');
          regNum = `23B01A04${serial}`; // CSE 01-40
        }
        const student = {
          ...baseStudent,
          id: stuId,
          name,
          registrationNumber: regNum,
          email: `${name.toLowerCase().replace(/\s/g, '.')}@college.edu`,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&size=128`,
          branch: mentorBranch,
          year,
          section: String.fromCharCode(65 + (i % 3)),
          cgpa: 7.5 + Math.random() * 1.5,
          attendance: 75 + Math.floor(Math.random() * 20),
          backlogs: Math.random() > 0.85 ? 1 : 0,
          counsellingSessions: Math.floor(Math.random() * 6),
          phone: `+91 ${9}${Math.floor(Math.random() * 1e9).toString().padStart(9, '0')}`,
          parentContact: `+91 ${9}${Math.floor(Math.random() * 1e9).toString().padStart(9, '0')}`,
          mentorId: mentor.id,
          dateOfBirth: `200${year}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
          bloodGroup: ['O+', 'B+', 'A+', 'AB+'][Math.floor(Math.random() * 4)],
          address: `${100 + idx} Street, City, State - 12345${idx}`,
          aadharNumber: `${idx}234 5678 9012`,
        };
        student.cgpa = Math.round(student.cgpa * 10) / 10;
        students.push(student);
        mentorAssignments[mentor.id].push(stuId);
      }
    }
  }

  return { students, mentorAssignments };
}

const { students, mentorAssignments } = generateStudents();
const mentors = womenMentors.map((m, i) => ({
  ...m,
  password: 'mentor123',
  photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=5b21b6&color=fff&size=128`,
  assignedStudents: mentorAssignments[m.id],
  totalCounsellingSessions: 80 + Math.floor(Math.random() * 80),
}));

// Write to data files (run from project root: node scripts/seed-data.js)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../src/data');
fs.writeFileSync(path.join(dataDir, 'mentors.json'), JSON.stringify(mentors, null, 2));
fs.writeFileSync(path.join(dataDir, 'students.json'), JSON.stringify(students, null, 2));
console.log('Generated:', mentors.length, 'mentors,', students.length, 'students');
console.log('Per mentor:', mentors.map(m => ({ name: m.name, count: m.assignedStudents.length })));
