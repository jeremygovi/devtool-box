import React from 'react';
import { Package } from 'lucide-react';

export default function Dashboard() {
  const version = import.meta.env.VITE_APP_VERSION || 'variable_VITE_APP_VERSION_not_defined';
  console.log('App Version:', version);
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <Package className="w-6 h-6 mr-2 text-blue-400" />
          System Information
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Version</h2>
            <p className="text-blue-400">{version}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
