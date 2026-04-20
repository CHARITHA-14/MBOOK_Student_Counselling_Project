export interface Student {
  id: string;
  collegeName: string;
  mentoringTitle: string;
  photo: string;
  name: string;
  regNo: string;
  branch: string;
  studentContact: string;
  parentContact: string;
  mentorName: string;
  mentorId: string;
  personalDetails: PersonalDetails;
  parentDetails: ParentDetails;
  academicPerformance: AcademicPerformance[];
  counsellingRecords: CounsellingRecord[];
  previousEducation: PreviousEducation;
  interests: Interests;
  backlogs: Backlog[];
  mentorRemarks: MentorRemark[];
}

export interface PersonalDetails {
  dob: string;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  religion: string;
  nationality: string;
  category: string;
  aadharNumber: string;
}

export interface ParentDetails {
  father: ParentInfo;
  mother: ParentInfo;
  localGuardian: LocalGuardian;
}

export interface ParentInfo {
  name: string;
  phone: string;
  occupation: string;
  qualification: string;
  income: string;
}

export interface LocalGuardian {
  name: string;
  phone: string;
  address: string;
  relation: string;
}

export interface AcademicPerformance {
  semester: number;
  subjects: SubjectRecord[];
  sgpa: number;
  cgpa: number;
  credits: number;
  backlogs: number;
}

export interface SubjectRecord {
  subjectCode: string;
  subjectName: string;
  attendance: number;
  midMarks: number;
  internalMarks: number;
  grade: string;
}

export interface CounsellingRecord {
  id: string;
  date: string;
  purpose: string;
  outcome: string;
  studentSignature: string;
  mentorSignature: string;
}

export interface PreviousEducation {
  classX: EducationRecord;
  classXII: EducationRecord;
}

export interface EducationRecord {
  institution: string;
  year: string;
  board: string;
  percentage: number;
}

export interface Interests {
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  achievements: string[];
  healthInfo: string;
}

export interface Backlog {
  id: string;
  subject: string;
  subjectCode: string;
  attempt: number;
  monthYear: string;
  grade: string;
}

export interface MentorRemark {
  id: string;
  date: string;
  remark: string;
  mentorSignature: string;
}

export const dummyStudent: Student = {
  id: "STU001",
  collegeName: "Dr. Ambedkar Institute of Technology",
  mentoringTitle: "Mentoring & Counselling Record - Academic Year 2024-25",
  photo: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
  name: "Rajesh Kumar",
  regNo: "1DA21CS089",
  branch: "Computer Science & Engineering",
  studentContact: "+91 98765 43210",
  parentContact: "+91 98765 43211",
  mentorName: "Dr. Priya Sharma",
  mentorId: "MEN001",
  personalDetails: {
    dob: "15/08/2003",
    gender: "Male",
    bloodGroup: "O+",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
    religion: "Hindu",
    nationality: "Indian",
    category: "General",
    aadharNumber: "1234 5678 9012"
  },
  parentDetails: {
    father: {
      name: "Suresh Kumar",
      phone: "+91 98765 43211",
      occupation: "Software Engineer",
      qualification: "B.Tech",
      income: "12,00,000"
    },
    mother: {
      name: "Lakshmi Kumar",
      phone: "+91 98765 43212",
      occupation: "Teacher",
      qualification: "M.A.",
      income: "6,00,000"
    },
    localGuardian: {
      name: "Ramesh Patel",
      phone: "+91 98765 43213",
      address: "456, Brigade Road, Bangalore",
      relation: "Uncle"
    }
  },
  academicPerformance: [
    {
      semester: 1,
      subjects: [
        { subjectCode: "21CS11", subjectName: "Programming in C", attendance: 92, midMarks: 45, internalMarks: 48, grade: "A+" },
        { subjectCode: "21CS12", subjectName: "Mathematics-I", attendance: 88, midMarks: 42, internalMarks: 45, grade: "A" },
        { subjectCode: "21CS13", subjectName: "Engineering Physics", attendance: 85, midMarks: 38, internalMarks: 42, grade: "A" },
        { subjectCode: "21CS14", subjectName: "Engineering Chemistry", attendance: 90, midMarks: 44, internalMarks: 46, grade: "A+" },
        { subjectCode: "21CS15", subjectName: "Basic Electronics", attendance: 87, midMarks: 40, internalMarks: 43, grade: "A" }
      ],
      sgpa: 8.7,
      cgpa: 8.7,
      credits: 22,
      backlogs: 0
    },
    {
      semester: 2,
      subjects: [
        { subjectCode: "21CS21", subjectName: "Data Structures", attendance: 94, midMarks: 47, internalMarks: 49, grade: "A+" },
        { subjectCode: "21CS22", subjectName: "Mathematics-II", attendance: 86, midMarks: 41, internalMarks: 44, grade: "A" },
        { subjectCode: "21CS23", subjectName: "Digital Logic", attendance: 89, midMarks: 43, internalMarks: 45, grade: "A" },
        { subjectCode: "21CS24", subjectName: "Python Programming", attendance: 95, midMarks: 48, internalMarks: 50, grade: "S" },
        { subjectCode: "21CS25", subjectName: "Computer Organization", attendance: 91, midMarks: 44, internalMarks: 47, grade: "A+" }
      ],
      sgpa: 9.1,
      cgpa: 8.9,
      credits: 44,
      backlogs: 0
    },
    {
      semester: 3,
      subjects: [
        { subjectCode: "21CS31", subjectName: "Database Management", attendance: 90, midMarks: 43, internalMarks: 46, grade: "A+" },
        { subjectCode: "21CS32", subjectName: "Operating Systems", attendance: 88, midMarks: 42, internalMarks: 44, grade: "A" },
        { subjectCode: "21CS33", subjectName: "Computer Networks", attendance: 85, midMarks: 40, internalMarks: 42, grade: "A" },
        { subjectCode: "21CS34", subjectName: "Web Technologies", attendance: 93, midMarks: 46, internalMarks: 48, grade: "A+" },
        { subjectCode: "21CS35", subjectName: "Design & Analysis of Algorithms", attendance: 87, midMarks: 41, internalMarks: 43, grade: "A" }
      ],
      sgpa: 8.8,
      cgpa: 8.87,
      credits: 66,
      backlogs: 0
    }
  ],
  counsellingRecords: [
    {
      id: "CR001",
      date: "15/01/2024",
      purpose: "Academic Performance Review",
      outcome: "Student is performing well. Advised to focus more on practical implementation.",
      studentSignature: "Rajesh Kumar",
      mentorSignature: "Dr. Priya Sharma"
    },
    {
      id: "CR002",
      date: "20/03/2024",
      purpose: "Career Guidance",
      outcome: "Discussed internship opportunities and career paths in software development.",
      studentSignature: "Rajesh Kumar",
      mentorSignature: "Dr. Priya Sharma"
    },
    {
      id: "CR003",
      date: "10/05/2024",
      purpose: "Personal Development",
      outcome: "Encouraged participation in coding competitions and hackathons.",
      studentSignature: "Rajesh Kumar",
      mentorSignature: "Dr. Priya Sharma"
    }
  ],
  previousEducation: {
    classX: {
      institution: "Kendriya Vidyalaya, Bangalore",
      year: "2019",
      board: "CBSE",
      percentage: 92.4
    },
    classXII: {
      institution: "National Public School, Bangalore",
      year: "2021",
      board: "CBSE",
      percentage: 88.6
    }
  },
  interests: {
    interests: ["Coding", "Cricket", "Reading Tech Blogs", "Open Source Contribution"],
    strengths: ["Problem Solving", "Quick Learner", "Team Player", "Good Communication"],
    weaknesses: ["Time Management", "Public Speaking"],
    achievements: [
      "Winner - College Hackathon 2023",
      "Rank 1 in Department - Semester 2",
      "Published Research Paper in IEEE Conference",
      "Completed Google Cloud Certification"
    ],
    healthInfo: "No significant health issues. Wears spectacles."
  },
  backlogs: [],
  mentorRemarks: [
    {
      id: "MR001",
      date: "30/01/2024",
      remark: "Rajesh is a dedicated student with excellent academic performance. He shows great interest in programming and actively participates in college activities.",
      mentorSignature: "Dr. Priya Sharma"
    },
    {
      id: "MR002",
      date: "30/04/2024",
      remark: "Continues to perform well. Needs to work on soft skills and leadership qualities. Recommended for placement training.",
      mentorSignature: "Dr. Priya Sharma"
    }
  ]
};

export const mentorData = {
  id: "MEN001",
  name: "Dr. Priya Sharma",
  designation: "Associate Professor",
  department: "Computer Science & Engineering",
  email: "priya.sharma@example.com",
  phone: "+91 98765 00001",
  photo: "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=400",
  experience: "12 years",
  qualification: "Ph.D. in Computer Science",
  specialization: "Artificial Intelligence, Machine Learning",
  mentees: 15
};
