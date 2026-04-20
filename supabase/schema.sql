-- Table for storing mentor remarks on students
create table if not exists remarks (
  id uuid primary key default gen_random_uuid(),
  student_id text references students(id) on delete cascade,
  mentor_id text references mentors(id) on delete set null,
  content text not null,
  created_at timestamp with time zone default timezone('utc', now()),
  created_by_role text check (created_by_role in ('mentor', 'admin')),
  is_deleted boolean default false
);
-- Student Counselling & Mentoring System - Database Schema
-- Women mentors (IT & CSE) and women students only

-- Mentors table (women only, IT and CSE branches)
CREATE TABLE IF NOT EXISTS mentors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  photo TEXT,
  department TEXT NOT NULL CHECK (department IN ('Information Technology', 'Computer Science Engineering')),
  phone TEXT,
  qualification TEXT,
  experience TEXT,
  total_counselling_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table (women only, IT and CSE branches)
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  registration_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  photo TEXT,
  mentor_id TEXT REFERENCES mentors(id),
  branch TEXT NOT NULL CHECK (branch IN ('Information Technology', 'Computer Science Engineering')),
  year INTEGER NOT NULL CHECK (year IN (2, 3, 4)),
  section TEXT NOT NULL,
  cgpa NUMERIC,
  attendance NUMERIC,
  backlogs INTEGER DEFAULT 0,
  counselling_sessions INTEGER DEFAULT 0,
  phone TEXT,
  parent_contact TEXT,
  date_of_birth DATE,
  gender TEXT DEFAULT 'Female',
  blood_group TEXT,
  address TEXT,
  religion TEXT,
  nationality TEXT,
  category TEXT,
  aadhar_number TEXT,
  father_json JSONB,
  mother_json JSONB,
  local_guardian_json JSONB,
  academic_performance_json JSONB DEFAULT '[]',
  counselling_records_json JSONB DEFAULT '[]',
  previous_education_json JSONB,
  interests JSONB DEFAULT '[]',
  strengths JSONB DEFAULT '[]',
  weaknesses JSONB DEFAULT '[]',
  achievements JSONB DEFAULT '[]',
  health_information TEXT,
  backlog_details_json JSONB DEFAULT '[]',
  mentor_remarks_json JSONB DEFAULT '[]',
  goals_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship assignments (20 students per mentor: 10 from year 2, 10 from year 3)
CREATE TABLE IF NOT EXISTS mentor_student_assignments (
  mentor_id TEXT REFERENCES mentors(id),
  student_id TEXT REFERENCES students(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (mentor_id, student_id)
);

-- Counselling records (for tracking sessions)
CREATE TABLE IF NOT EXISTS counselling_records (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  mentor_id TEXT REFERENCES mentors(id),
  date DATE NOT NULL,
  purpose TEXT NOT NULL,
  discussion_summary TEXT,
  outcome TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentor remarks
CREATE TABLE IF NOT EXISTS mentor_remarks (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  mentor_id TEXT REFERENCES mentors(id),
  date DATE NOT NULL,
  remark TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_students_mentor ON students(mentor_id);
CREATE INDEX IF NOT EXISTS idx_students_branch_year ON students(branch, year);
CREATE INDEX IF NOT EXISTS idx_mentors_department ON mentors(department);
CREATE INDEX IF NOT EXISTS idx_counselling_student ON counselling_records(student_id);
CREATE INDEX IF NOT EXISTS idx_remarks_student ON mentor_remarks(student_id);

-- Row Level Security (RLS) - enable for production
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE counselling_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_remarks ENABLE ROW LEVEL SECURITY;
