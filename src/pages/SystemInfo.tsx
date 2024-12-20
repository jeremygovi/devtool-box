import React, { useEffect, useState } from 'react';
import { HardDrive, Terminal, Variable, Activity } from 'lucide-react';
import SystemMetric from '../components/SystemMetric';

interface SystemStats {
  hostname: string;
  platform: string;
  arch: string;
  cpuUsage: number;
  memoryUsage: {
    total: number;
    used: number;
    free: number;
  };
}

export default function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<SystemStats | null>(null);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await fetch('/api/system-info');
        const data = await response.json();
        setSystemInfo(data);
      } catch (error) {
        console.error('Failed to fetch system info:', error);
      }
    };

    fetchSystemInfo();
  }, []);

  if (!systemInfo) {
    return <div>Loading system information...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        System Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SystemMetric icon={Terminal} title="System Details">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Hostname:</span>
            <span>{systemInfo.hostname}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Platform:</span>
            <span>{systemInfo.platform}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Architecture:</span>
            <span>{systemInfo.arch}</span>
          </div>
        </SystemMetric>

        <SystemMetric icon={Activity} title="CPU Usage">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
              <div
                style={{ width: `${systemInfo.cpuUsage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
              />
            </div>
          </div>
        </SystemMetric>

        <SystemMetric icon={HardDrive} title="Memory Usage">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Total:</span>
            <span>{systemInfo.memoryUsage.total} MB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Used:</span>
            <span>{systemInfo.memoryUsage.used} MB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Free:</span>
            <span>{systemInfo.memoryUsage.free} MB</span>
          </div>
        </SystemMetric>
      </div>
    </div>
  );
}
