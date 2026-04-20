# M-Book: Student Counselling & Mentoring Record System

A comprehensive web application for managing student counselling and mentoring records, featuring **women mentors** from IT & CSE branches mentoring **women students**. Inspired by traditional college counselling record books.

## Features

### Student Module
- **Dashboard**: View profile, stats (CGPA, Attendance, Backlogs, Counselling Sessions)
- **Personal Details**: Manage personal information
- **Parent Details**: Store father, mother, and guardian information
- **Academic Performance**: Semester-wise academic records with subject details
- **Counselling Records**: View and add counselling session records
- **Previous Education**: Class X and XII/Diploma details
- **Interests & Personal Insights**: Track interests, strengths, weaknesses, achievements
- **Backlog Details**: View backlog subjects and attempts
- **Mentor Remarks**: Read feedback from mentors
- **Attendance Analytics**: Visual attendance tracking with warnings
- **Performance Charts**: SGPA progression, subject performance, grade distribution
- **Goal Setting**: Short-term, long-term goals, career plans, and action items

### Mentor Module
- **Dashboard**: Overview with assigned students statistics
- **Student List**: View all assigned students with search functionality
- **Student Details**: Complete digital counselling record view
  - Basic student info
  - Personal and parent details
  - Academic performance (semester-wise)
  - Counselling history
  - Backlogs
  - Interests & strengths
  - Add counselling records and remarks
- **Profile**: Manage mentor profile information

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **Vite** as build tool
- **Supabase** for database (optional, with JSON fallback)

## Data & Mentorship Model

- **Mentors**: Women only, from IT and CSE branches (4 mentors: 2 CSE, 2 IT)
- **Students**: Women only, from IT and CSE branches (80 students)
- **Assignment**: 20 students per mentor (10 from 2nd year, 10 from 3rd year)

## Design

- **Theme**: Indigo + Slate color scheme with Plus Jakarta Sans font
- **Layout**: Card-based design with soft shadows and rounded corners
- **Responsive**: Mobile and desktop support
- **Navigation**: Sidebar navigation with top navbar

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Demo Credentials

### Student Login
- **Email**: `aaradhya.singh@college.edu`
- **Password**: `student123`

### Mentor Login
- **Email**: `srikanth.p@college.edu`
- **Password**: `mentor123`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Card.tsx
│   ├── Table.tsx
│   ├── FormInput.tsx
│   ├── Modal.tsx
│   ├── Layout.tsx
│   └── ProtectedRoute.tsx
├── pages/
│   ├── auth/
│   │   └── Login.tsx
│   ├── student/        # Student module pages
│   └── mentor/         # Mentor module pages
├── data/               # Seed data (women mentors & students)
│   ├── students.json
│   └── mentors.json
├── lib/                # Data service & Supabase client
│   ├── data.ts
│   └── supabase.ts
├── utils/              # Utility functions
│   └── auth.ts
├── App.tsx             # Main app component with routing
└── main.tsx            # Entry point
```

## Features Ready for Backend Integration

The application is structured to easily integrate with a backend:

- **API Integration Points**: All data operations are ready for API calls
- **Authentication**: Protected routes ready for JWT/token-based auth
- **State Management**: Can be extended with Redux/Context API
- **Form Handling**: Forms ready for backend submission
- **Data Models**: JSON structure matches typical database schemas

## Future Enhancements

- **Mobile App**: Develop a native/cross-platform app (React Native/Flutter) for the same mentoring features—student dashboard, counselling records, mentor remarks, and goal tracking on mobile devices
- Backend API integration (Node.js/Django/etc.)
- Database integration (Supabase/PostgreSQL—schema in `supabase/schema.sql`)
- Real authentication and authorization
- ML features:
  - At-risk student prediction
  - Performance trend analysis
  - Attendance risk alerts
- File uploads (photos, documents)
- Email notifications
- Export to PDF functionality
- Advanced analytics and reporting

## License

This project is created for academic purposes.

## Contributing

This is a frontend-only application. Contributions for backend integration, improvements, and feature additions are welcome.
