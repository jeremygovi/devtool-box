import React, { useState, useEffect } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import Editor from '@monaco-editor/react';

const detectLanguage = (code: string): string => {
  // Simple language detection based on common patterns
  if (code.includes('#!/bin/bash') || code.includes('echo $')) return 'shell';
  if (code.includes('def ') || code.includes('import ') || code.includes('print(')) return 'python';
  if (code.includes('console.log') || code.includes('const ') || code.includes('let ')) return 'javascript';
  if (code.includes('interface ') || code.includes(':') || code.includes('type ')) return 'typescript';
  return 'javascript'; // default
};

export default function CodeExecutor() {
  const [code, setCode] = useState('// Type or paste your code here...');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    setLanguage(detectLanguage(code));
  }, [code]);

  const handleExecute = async () => {
    setIsExecuting(true);
    setOutput('Executing code...\n');
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // This is where you'd integrate with your actual execution backend
      setOutput(`[${new Date().toLocaleTimeString()}] Executed ${language} code:\n${code}`);
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Code Executor
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Detected: {language}</span>
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            {isExecuting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isExecuting ? 'Running...' : 'Execute'}</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <Editor
            height="500px"
            defaultLanguage="javascript"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: 'smooth',
            }}
          />
        </div>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <Editor
            height="500px"
            defaultLanguage="plaintext"
            value={output}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              lineNumbers: 'off',
            }}
          />
        </div>
      </div>
    </div>
  );
}
