import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Terminal className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">DevToolbox</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700">
              <Terminal className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/code-executor" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700">
              <Code className="w-5 h-5" />
              <span>Code Executor</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
