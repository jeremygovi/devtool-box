import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SystemMetricProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export default function SystemMetric({ icon: Icon, title, children }: SystemMetricProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-blue-400" />
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
