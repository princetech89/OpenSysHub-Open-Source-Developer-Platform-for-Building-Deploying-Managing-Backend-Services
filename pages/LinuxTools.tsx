
import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, HardDrive, Cpu as Memory, List, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

const LinuxTools: React.FC = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([
    'OpenSysHub Linux Shell v2.4.0 (Ubuntu 22.04 LTS)',
    'Type "help" for a list of available commands.',
    '',
  ]);

  const runCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const newHistory = [...history, `developer@opensyshub:~$ ${command}`];
    
    // Simple command handling mock
    switch(command.toLowerCase()) {
      case 'help':
        newHistory.push('Available commands: status, top, ls, systemctl status nginx, whoami, clear');
        break;
      case 'status':
        newHistory.push('System: Operational', 'Uptime: 14 days, 3:12', 'Load Average: 0.15, 0.22, 0.18');
        break;
      case 'whoami':
        newHistory.push('opensyshub-service-account');
        break;
      case 'ls':
        newHistory.push('backend/', 'frontend/', 'docker-compose.yml', 'nginx.conf');
        break;
      case 'clear':
        setHistory([]);
        setCommand('');
        return;
      default:
        newHistory.push(`bash: ${command}: command not found`);
    }

    setHistory(newHistory);
    setCommand('');
  };

  const [sysMetrics, setSysMetrics] = useState({
    cpu: 45,
    mem: 62,
    disk: 28
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSysMetrics({
        cpu: Math.floor(Math.random() * 40) + 20,
        mem: Math.floor(Math.random() * 10) + 60,
        disk: 28
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System & Linux Tools</h1>
          <p className="text-slate-500">Low-level operating system monitoring and control.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            <RefreshCw size={14} /> Restart Services
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-indigo-600" />
            <h3 className="font-bold">CPU Usage</h3>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full transition-all duration-1000 ${sysMetrics.cpu > 80 ? 'bg-rose-500' : 'bg-indigo-600'}`} 
              style={{ width: `${sysMetrics.cpu}%` }}
            ></div>
          </div>
          <p className="text-3xl font-bold">{sysMetrics.cpu}%</p>
          <p className="text-xs text-slate-400 mt-1">4 Cores Virtualized (AWS t3.medium)</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Memory className="text-emerald-600" />
            <h3 className="font-bold">Memory Usage</h3>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-4">
            <div 
              className="bg-emerald-600 h-full transition-all duration-1000" 
              style={{ width: `${sysMetrics.mem}%` }}
            ></div>
          </div>
          <p className="text-3xl font-bold">{sysMetrics.mem}%</p>
          <p className="text-xs text-slate-400 mt-1">2.4GB / 4GB Utilized</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="text-amber-600" />
            <h3 className="font-bold">Disk Health</h3>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-4">
            <div className="bg-amber-600 h-full" style={{ width: `${sysMetrics.disk}%` }}></div>
          </div>
          <p className="text-3xl font-bold">{sysMetrics.disk}%</p>
          <p className="text-xs text-slate-400 mt-1">28GB / 100GB (NVMe SSD)</p>
        </div>
      </div>

      {/* Terminal UI */}
      <div className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-xs font-mono text-slate-400 ml-4 flex items-center gap-2">
              <Terminal size={14} /> ssh: developer@opensyshub-prod-01
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
            <CheckCircle2 size={12} /> CONNECTED
          </span>
        </div>
        <div className="p-6 h-[400px] font-mono text-sm overflow-y-auto bg-slate-950 scroll-smooth">
          {history.map((line, i) => (
            <p key={i} className="mb-1 text-slate-300 leading-relaxed min-h-[1.5rem]">{line}</p>
          ))}
          <form onSubmit={runCommand} className="flex mt-2">
            <span className="text-emerald-400 mr-2 shrink-0">developer@opensyshub:~$</span>
            <input 
              type="text"
              autoFocus
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="bg-transparent border-none outline-none text-white w-full caret-indigo-500"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LinuxTools;
