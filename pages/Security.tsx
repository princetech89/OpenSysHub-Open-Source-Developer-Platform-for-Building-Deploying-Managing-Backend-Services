
import React from 'react';
import { Shield, Key, Users, History, CheckCircle2, AlertCircle } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Access & Security</h1>
        <p className="text-slate-500">Manage role-based access control and security tokens.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-indigo-600" />
            <h3 className="font-bold">Team Members</h3>
          </div>
          <p className="text-3xl font-bold">8 Active</p>
          <div className="flex gap-1 mt-3">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/${i}/32/32`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-500">+4</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Key className="text-emerald-600" />
            <h3 className="font-bold">Active API Keys</h3>
          </div>
          <p className="text-3xl font-bold">14</p>
          <p className="text-xs text-slate-400 mt-1">2 expiring within 30 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="text-amber-600" />
              <h3 className="font-bold">Security Posture</h3>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">Healthy</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-emerald-500" /> 2FA Enforced
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-emerald-500" /> IP Whitelisting
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-emerald-500" /> Audit Logging
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 text-amber-600 font-medium">
              <AlertCircle size={16} /> 1 Port Exposed
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Recent Audit Logs</h3>
          <button className="text-indigo-600 text-sm font-semibold">Download Trail</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { action: 'API Key Created', user: 'sarah.dev@org.com', ip: '192.168.1.1', time: '2 mins ago' },
            { action: 'RBAC Policy Modified', user: 'admin@org.com', ip: '10.0.0.4', time: '45 mins ago' },
            { action: 'Server Restart Initiated', user: 'jake.ops@org.com', ip: '172.16.2.1', time: '2 hours ago' },
            { action: 'Failed Login Attempt', user: 'unknown@web.com', ip: '45.122.1.3', time: '5 hours ago', risk: 'high' },
          ].map((log, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg ${log.risk === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                  <History size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{log.action}</p>
                  <p className="text-sm text-slate-500">{log.user}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-slate-400">{log.ip}</p>
                <p className="text-xs text-slate-400">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Security;
