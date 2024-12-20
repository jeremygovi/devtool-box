import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CodeExecutor from './pages/CodeExecutor';
import SystemInfo from './pages/SystemInfo';
import Version from './pages/Version';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code-executor" element={<CodeExecutor />} />
          <Route path="/info" element={<SystemInfo />} />
          <Route path="/version" element={<Version />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
