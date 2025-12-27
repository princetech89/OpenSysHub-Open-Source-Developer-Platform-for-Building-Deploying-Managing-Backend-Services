
import React, { useState } from 'react';
import { Play, Send, Copy, RefreshCw, ChevronRight, Activity, Globe, Lock } from 'lucide-react';

const ApiTesting: React.FC = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.opensyshub.io/v1/users');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResponse({
        status: 200,
        time: '42ms',
        size: '1.2kb',
        body: [
          { id: 1, name: 'Alice Developer', role: 'admin' },
          { id: 2, name: 'Bob Engineer', role: 'member' }
        ]
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">API Monitor & Tester</h1>
        <p className="text-slate-500">Test endpoints and monitor real-time performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex gap-2 mb-6">
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
                Send
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headers & Authentication</h4>
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Lock size={16} className="text-slate-400" />
                <span className="text-sm font-mono text-slate-600 flex-1">Authorization: Bearer ••••••••••••••••</span>
                <button className="text-xs font-bold text-indigo-600">Update</button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400">Response</span>
              {response && (
                <div className="flex gap-4 text-xs font-bold">
                  <span className="text-emerald-500">STATUS: {response.status}</span>
                  <span className="text-indigo-400">TIME: {response.time}</span>
                  <span className="text-slate-400">SIZE: {response.size}</span>
                </div>
              )}
            </div>
            <div className="p-6 min-h-[300px] max-h-[500px] overflow-auto font-mono text-sm">
              {response ? (
                <pre className="text-emerald-400">{JSON.stringify(response.body, null, 2)}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 py-20">
                  <Play size={48} className="mb-4 opacity-20" />
                  <p>Send a request to see the response</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Activity size={18} /> Live Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">P99 Latency</span>
                <span className="font-bold text-indigo-600">142ms</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Throughput</span>
                <span className="font-bold text-indigo-600">840 req/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Success Rate</span>
                <span className="font-bold text-emerald-600">99.98%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={18} /> Endpoint Summary</h3>
            <div className="space-y-3">
              {[
                { path: '/v1/users', method: 'GET', status: 'healthy' },
                { path: '/v1/auth', method: 'POST', status: 'healthy' },
                { path: '/v1/metrics', method: 'GET', status: 'degraded' },
              ].map((e, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      e.method === 'GET' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                    }`}>{e.method}</span>
                    <span className="text-xs font-mono font-medium text-slate-700">{e.path}</span>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full ${e.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTesting;
