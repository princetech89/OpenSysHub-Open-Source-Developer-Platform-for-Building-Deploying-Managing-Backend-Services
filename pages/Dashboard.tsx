
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Activity, Server, Database, Globe, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active APIs', value: '12', trend: '+2', trendType: 'up', icon: <Server className="text-indigo-600" /> },
    { label: 'Avg Latency', value: '42ms', trend: '-4ms', trendType: 'up', icon: <Activity className="text-emerald-600" /> },
    { label: 'Memory Usage', value: '64%', trend: '+5%', trendType: 'down', icon: <Database className="text-amber-600" /> },
    { label: 'Deployments', value: '1,284', trend: '24h', trendType: 'none', icon: <Globe className="text-blue-600" /> },
  ];

  const chartData = [
    { time: '00:00', requests: 400, errors: 12 },
    { time: '04:00', requests: 300, errors: 8 },
    { time: '08:00', requests: 800, errors: 24 },
    { time: '12:00', requests: 1200, errors: 15 },
    { time: '16:00', requests: 1100, errors: 10 },
    { time: '20:00', requests: 600, errors: 5 },
  ];

  const recentLogs = [
    { id: '1', level: 'error', message: 'Auth service: 500 error on /v1/login', time: '2 min ago' },
    { id: '2', level: 'info', message: 'Deployment successful: user-api:v2.1.0', time: '15 min ago' },
    { id: '3', level: 'warn', message: 'Redis cache: High memory threshold reached', time: '42 min ago' },
    { id: '4', level: 'info', message: 'Systemd: Worker nodes scaled to 4', time: '1 hr ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500">Monitoring real-time health across all services.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all">
          <Zap size={18} /> Optimize Cluster
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              {stat.trendType !== 'none' && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  stat.trendType === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                }`}>
                  {stat.trendType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              )}
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            Traffic & Errors (24h)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Recent Logs</h3>
            <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  log.level === 'error' ? 'bg-rose-500' : log.level === 'warn' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-slate-800 leading-tight">{log.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
