
import React, { useState } from 'react';
import { Search, Filter, Download, Trash2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { LogEntry } from '../types';

const Logs: React.FC = () => {
  const [logs] = useState<LogEntry[]>([
    { id: '1', timestamp: '2023-11-20 14:23:01', service: 'auth-api', level: 'info', message: 'User logged in: developer@example.com' },
    { id: '2', timestamp: '2023-11-20 14:24:15', service: 'payment-svc', level: 'error', message: 'Connection timeout to Stripe API', trace: 'TimeoutError: Connection failed after 5000ms at /api/stripe.py line 42' },
    { id: '3', timestamp: '2023-11-20 14:25:30', service: 'user-db', level: 'warn', message: 'Slow query detected: SELECT * FROM users WHERE active = TRUE' },
    { id: '4', timestamp: '2023-11-20 14:26:00', service: 'nginx', level: 'info', message: 'GET /v1/status 200 12ms' },
    { id: '5', timestamp: '2023-11-20 14:27:12', service: 'worker-01', level: 'info', message: 'Image optimization job #424 completed' },
    { id: '6', timestamp: '2023-11-20 14:28:45', service: 'auth-api', level: 'error', message: 'Invalid JWT signature detected', trace: 'JWTError: Signature verification failed' },
  ]);

  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(l => 
    l.message.toLowerCase().includes(filter.toLowerCase()) || 
    l.service.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Log Explorer</h1>
          <p className="text-slate-500">Centralized log management and stack trace analysis.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium hover:bg-slate-50">
            <Download size={16} /> Export JSON
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium hover:text-rose-600 transition-colors">
            <Trash2 size={16} /> Clear
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)]">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by message, service name..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white">
            <Filter size={14} /> Level: All
          </button>
        </div>

        <div className="flex-1 overflow-auto font-mono text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-100 z-10">
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <th className="px-4 py-3 w-48">Timestamp</th>
                <th className="px-4 py-3 w-32">Level</th>
                <th className="px-4 py-3 w-40">Service</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr className="hover:bg-slate-50 group cursor-pointer transition-colors">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 font-bold ${
                        log.level === 'error' ? 'text-rose-600' : 
                        log.level === 'warn' ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {log.level === 'error' ? <AlertCircle size={14} /> : 
                         log.level === 'warn' ? <AlertTriangle size={14} /> : <Info size={14} />}
                        {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-semibold">{log.service}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium">{log.message}</td>
                  </tr>
                  {log.trace && (
                    <tr className="bg-slate-900">
                      <td colSpan={4} className="px-10 py-4">
                        <pre className="text-slate-400 overflow-x-auto whitespace-pre-wrap">{log.trace}</pre>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {filteredLogs.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              <p className="text-lg">No logs found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logs;
