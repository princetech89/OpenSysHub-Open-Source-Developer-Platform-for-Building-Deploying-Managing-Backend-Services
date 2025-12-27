
import React from 'react';
import { Github, GitPullRequest, GitMerge, Clock, CheckCircle, ExternalLink, MessageSquare } from 'lucide-react';

const GitIntegration: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Git & Collaboration</h1>
          <p className="text-slate-500">Sync with your source control and manage team reviews.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
          <Github size={18} /> Link Repository
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">opensyshub/backend-core</h3>
                  <p className="text-sm text-slate-500">Connected to main branch</p>
                </div>
              </div>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><ExternalLink size={20} /></a>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Commits</h4>
              {[
                { author: 'alex-dev', hash: '8f2a1b4', message: 'feat: add rbac middleware to auth service', time: '1h ago' },
                { author: 'sarah-qa', hash: '5c3d2e1', message: 'test: fix flakey integration tests for worker pool', time: '3h ago' },
                { author: 'mike-ops', hash: '2a4b6c8', message: 'chore: update docker-compose for prod stability', time: '1d ago' },
              ].map((commit, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${commit.author}&background=random`} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{commit.message}</p>
                      <p className="text-xs text-slate-500">{commit.author} committed {commit.time}</p>
                    </div>
                  </div>
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">{commit.hash}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <GitPullRequest size={20} className="text-emerald-500" /> Active Pull Requests
            </h3>
            <div className="space-y-4">
              {[
                { id: '#452', title: 'Implement Stripe Webhook support', reviews: 2, status: 'ready' },
                { id: '#449', title: 'Refactor system monitoring data pipeline', reviews: 1, status: 'pending' },
              ].map((pr, i) => (
                <div key={i} className="p-4 border border-slate-100 rounded-xl hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900">{pr.title}</h4>
                      <p className="text-sm text-slate-500">{pr.id} opened yesterday</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      pr.status === 'ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {pr.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <MessageSquare size={14} /> {pr.reviews} comments
                      <div className="w-1 h-1 bg-slate-300 rounded-full mx-1"></div>
                      <CheckCircle size={14} className="text-emerald-500" /> Checks passed
                    </div>
                    <button className="text-sm font-bold text-indigo-600">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Clock size={18} /> Repository Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Test Coverage</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[92%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Build Success Rate</span>
                  <span className="font-bold">98.5%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[98.5%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-xl text-white">
            <h3 className="font-bold text-lg mb-2">Automated Deployments</h3>
            <p className="text-indigo-100 text-sm mb-6">Connect your repo to automatically deploy on every push to main.</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
              Configure Webhooks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitIntegration;
