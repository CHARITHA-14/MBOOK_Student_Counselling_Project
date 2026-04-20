/**
 * Data service - fetches from Supabase when configured, else uses local JSON
 */
import { supabase, isSupabaseConfigured } from './supabase';

// Fallback to static data when Supabase not configured
import mentorsData from '../data/mentors.json';
import studentsData from '../data/students.json';

export interface Mentor {
  id: string;
  name: string;
  email: string;
  password?: string;
  photo?: string;
  department: string;
  phone?: string;
  qualification?: string;
  experience?: string;
  assignedStudents?: string[];
  totalCounsellingSessions?: number;
}

export interface ParentInfo {
  name?: string;
  phone?: string;
  occupation?: string;
  qualification?: string;
  annualIncome?: number;
}

export interface Subject {
  code: string;
  name: string;
  attendance?: number;
  midMarks?: number;
  internalMarks?: number;
  grade?: string;
  credits?: number;
}

export interface Semester {
  semester: number;
  sgpa?: number;
  credits?: number;
  subjects?: Subject[];
}

export interface CounsellingRecord {
  id: string;
  date: string;
  purpose: string;
  discussionSummary?: string;
  outcome?: string;
}

export interface MentorRemark {
  id: string;
  date: string;
  remark: string;
}

export interface BacklogDetail {
  subject: string;
  attemptNumber: number;
  monthYear: string;
  grade: string;
}

export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  email: string;
  password?: string;
  photo?: string;
  mentorId?: string;
  branch: string;
  year: number;
  section: string;
  cgpa?: number;
  attendance?: number;
  backlogs?: number;
  counsellingSessions?: number;
  phone?: string;
  parentContact?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  address?: string;
  father?: ParentInfo;
  mother?: ParentInfo;
  localGuardian?: { name?: string; phone?: string; address?: string };
  academicPerformance?: Semester[];
  counsellingRecords?: CounsellingRecord[];
  previousEducation?: unknown;
  interests?: string[] | string;
  strengths?: string[] | string;
  weaknesses?: string[];
  achievements?: string[];
  backlogDetails?: BacklogDetail[];
  mentorRemarks?: MentorRemark[];
  goals?: unknown;
  [key: string]: unknown;
}

export async function getMentors(): Promise<Mentor[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from('mentors').select('*');
    if (!error && data) return data as Mentor[];
  }
  return mentorsData as Mentor[];
}

export async function getStudents(): Promise<Student[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from('students').select('*');
    if (!error && data) return data as Student[];
  }
  return studentsData as Student[];
}

export async function getStudentById(id: string): Promise<Student | null> {
  const students = await getStudents();
  return students.find((s) => s.id === id) || null;
}

export async function getMentorById(id: string): Promise<Mentor | null> {
  const mentors = await getMentors();
  return mentors.find((m) => m.id === id) || null;
}

export async function getStudentsByMentorId(mentorId: string): Promise<Student[]> {
  const students = await getStudents();
  const mentor = await getMentorById(mentorId);
  const assignedIds = mentor?.assignedStudents || [];
  return students.filter((s) => assignedIds.includes(s.id));
}

// Sync helpers for components that need immediate data (login, etc.)
export function getMentorsSync(): Mentor[] {
  return mentorsData as Mentor[];
}

export function getStudentsSync(): Student[] {
  return studentsData as Student[];
}
