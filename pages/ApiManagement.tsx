
import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Code, ExternalLink, Trash2, Edit } from 'lucide-react';
import { ApiService } from '../types';

const ApiManagement: React.FC = () => {
  const [services, setServices] = useState<ApiService[]>([
    { id: '1', name: 'User Management', version: 'v1.4.2', status: 'active', env: 'prod', endpoints: 12 },
    { id: '2', name: 'Payment Gateway', version: 'v2.1.0', status: 'active', env: 'prod', endpoints: 8 },
    { id: '3', name: 'Auth Bridge', version: 'v0.9.4', status: 'error', env: 'dev', endpoints: 4 },
    { id: '4', name: 'Inventory Sync', version: 'v1.0.1', status: 'inactive', env: 'dev', endpoints: 15 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">API Services</h1>
          <p className="text-slate-500">Deploy and manage your microservice endpoints.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
          <Plus size={18} /> New Service
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-white transition-colors">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-white transition-colors">
              Sort
            </button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">Environment</th>
              <th className="px-6 py-4">Version</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Endpoints</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                      <Code size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{service.name}</p>
                      <p className="text-xs text-slate-400">ID: {service.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    service.env === 'prod' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 bg-slate-100'
                  }`}>
                    {service.env.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{service.version}</code>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      service.status === 'active' ? 'bg-emerald-500' : 
                      service.status === 'error' ? 'bg-rose-500' : 'bg-slate-300'
                    }`}></div>
                    <span className="text-sm text-slate-600 capitalize">{service.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{service.endpoints}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button title="Edit" className="p-2 hover:bg-slate-200 rounded-lg text-slate-500"><Edit size={16} /></button>
                    <button title="View Docs" className="p-2 hover:bg-slate-200 rounded-lg text-slate-500"><ExternalLink size={16} /></button>
                    <button title="Delete" className="p-2 hover:bg-rose-100 rounded-lg text-rose-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <p className="text-sm text-slate-500">Showing 4 of 4 services</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-white">Previous</button>
            <button className="px-3 py-1 border border-indigo-600 bg-indigo-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiManagement;
