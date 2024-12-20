import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Code, Info, Tag } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-600' : 'hover:bg-gray-700';
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <Terminal className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-xl font-bold group-hover:text-blue-300 transition-colors">DevToolbox</span>
          </Link>
          <div className="flex space-x-2">
            <Link 
              to="/info" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive('/info')}`}
            >
              <Info className="w-5 h-5" />
              <span>System Info</span>
            </Link>
            <Link 
              to="/version" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive('/version')}`}
            >
              <Tag className="w-5 h-5" />
              <span>Version</span>
            </Link>
            <Link 
              to="/code-executor" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive('/code-executor')}`}
            >
              <Code className="w-5 h-5" />
              <span>Code Executor</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
