import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { getCurrentUser, getCurrentRole } from '../utils/auth';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getCurrentUser();
  const role = getCurrentRole();

  if (!user || !role) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar 
        user={{
          id: user.id,
          name: user.name,
          photo: user.photo,
          role: role
        }} 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
      />
      <div className="flex">
        <Sidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
