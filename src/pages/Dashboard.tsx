import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Info, Tag } from 'lucide-react';

interface QuickLinkProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const QuickLink = ({ to, icon, title, description }: QuickLinkProps) => (
  <Link 
    to={to}
    className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors group"
  >
    <div className="flex items-center space-x-4">
      <div className="text-blue-400 group-hover:text-blue-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold group-hover:text-blue-300">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  </Link>
);

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Welcome to DevToolbox
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickLink
          to="/code-executor"
          icon={<Code className="w-8 h-8" />}
          title="Code Executor"
          description="Execute code in multiple languages with real-time output"
        />
        
        <QuickLink
          to="/info"
          icon={<Info className="w-8 h-8" />}
          title="System Info"
          description="View detailed system information and resources"
        />
        
        <QuickLink
          to="/version"
          icon={<Tag className="w-8 h-8" />}
          title="Version Info"
          description="Check application version and build details"
        />
      </div>
    </div>
  );
}
