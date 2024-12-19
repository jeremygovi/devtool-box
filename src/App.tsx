import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CodeExecutor from './pages/CodeExecutor';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code-executor" element={<CodeExecutor />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
