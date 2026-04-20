import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}

export default function Card({ children, className = '', title, action }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8 transition-shadow hover:shadow-md ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
