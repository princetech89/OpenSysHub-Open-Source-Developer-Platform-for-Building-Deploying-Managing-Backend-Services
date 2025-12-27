
import React, { useState } from 'react';
import { Rocket, Package, Globe, CheckCircle2, Loader2, Cloud, Terminal, Layers } from 'lucide-react';

const Deployment: React.FC = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);

  const steps = [
    'Pulling source from GitHub...',
    'Building Docker Image: opensyshub-v2.1.0',
    'Optimizing static assets...',
    'Pushing to ECR registry...',
    'Updating Kubernetes deployment...',
    'Performing health checks...',
  ];

  const triggerDeploy = () => {
    setIsDeploying(true);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setDeploymentStep(currentStep);
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setIsDeploying(false), 2000);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Deployment Engine</h1>
          <p className="text-slate-500">Automated CI/CD pipelines and production rollouts.</p>
        </div>
        <button 
          onClick={triggerDeploy}
          disabled={isDeploying}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/20 transition-all"
        >
          {isDeploying ? <Loader2 className="animate-spin" size={20} /> : <Rocket size={20} />}
          {isDeploying ? 'Deploying...' : 'Deploy to Production'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {isDeploying && (
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 font-mono text-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <span className="text-slate-400">Deployment Pipeline - Build #1284</span>
                <span className="text-indigo-400 animate-pulse">Running</span>
              </div>
              <div className="space-y-2">
                {steps.map((step, idx) => (
                  <div key={idx} className={`flex items-center gap-3 ${idx < deploymentStep ? 'text-emerald-400' : idx === deploymentStep ? 'text-white' : 'text-slate-600'}`}>
                    {idx < deploymentStep ? <CheckCircle2 size={16} /> : idx === deploymentStep ? <Loader2 size={16} className="animate-spin" /> : <div className="w-4 h-4 rounded-full border border-slate-700"></div>}
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Deployment History</h3>
              <button className="text-indigo-600 text-sm font-semibold">Rollback Service</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">Build</th>
                  <th className="px-6 py-4">Trigger</th>
                  <th className="px-6 py-4">Environment</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: '#1283', trigger: 'Commit: f2a81c', env: 'Production', duration: '2m 14s', status: 'success' },
                  { id: '#1282', trigger: 'Manual Rollout', env: 'Staging', duration: '1m 58s', status: 'success' },
                  { id: '#1281', trigger: 'Commit: b9d3e4', env: 'Production', duration: '45s', status: 'failed' },
                ].map((deploy, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-semibold">{deploy.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{deploy.trigger}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{deploy.env}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{deploy.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        deploy.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {deploy.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={18} /> Active Domains</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-semibold">api.opensyshub.io</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">HTTPS</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-semibold">dev.opensyshub.io</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">HTTPS</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Layers size={18} /> Docker Containers</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-slate-400" />
                  <span className="text-sm font-medium">backend-worker:v2</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-slate-400" />
                  <span className="text-sm font-medium">redis-cache:latest</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-slate-400" />
                  <span className="text-sm font-medium">postgres:14-alpine</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
