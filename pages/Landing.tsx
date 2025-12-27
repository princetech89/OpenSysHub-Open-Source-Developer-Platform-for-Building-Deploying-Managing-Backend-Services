
import React from 'react';
import { ArrowRight, Code, Shield, Terminal, Zap, Github, Layers } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const Landing: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500">
      {/* Hero Section */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2">
          <Layers className="text-indigo-500" size={32} />
          <span className="text-2xl font-bold tracking-tight">OpenSysHub</span>
        </div>
        <div className="hidden md:flex gap-8 text-slate-400 font-medium">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Open Source</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/20"
        >
          Get Started
        </button>
      </nav>

      <section className="px-10 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-6 animate-pulse">
          <Github size={16} />
          <span>Proudly Open Source — MIT Licensed</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          Build, Deploy & Manage <br /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Backend Services
          </span> at Scale
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
          The all-in-one developer platform for RESTful API orchestration, Linux system monitoring, and automated cloud deployments. Built for production, engineered for systems experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onStart}
            className="flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all group"
          >
            Launch Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all">
            <Github /> Star on GitHub
          </button>
        </div>

        {/* Mock Terminal Graphic */}
        <div className="mt-20 w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-left font-mono text-sm">
          <div className="bg-slate-800 px-4 py-2 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
          </div>
          <div className="p-6 text-slate-300">
            <p className="mb-2"><span className="text-green-400">$</span> opensyshub init backend-service</p>
            <p className="mb-2 text-slate-500">Initializing workspace...</p>
            <p className="mb-2 text-indigo-400">[OK] Repository linked (github.com/org/service)</p>
            <p className="mb-2 text-indigo-400">[OK] FastAPI boilerplate generated</p>
            <p className="mb-2"><span className="text-green-400">$</span> opensyshub deploy --env production</p>
            <p className="mb-2 text-slate-500">Building Docker image... 100%</p>
            <p className="mb-2 text-slate-500">Pushing to AWS EC2... Done</p>
            <p className="mb-2 text-green-400">✓ Service live at: https://api.opensyshub.io/v1/user</p>
            <p className="animate-pulse">_</p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-slate-900 py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                <Code className="text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">REST API Management</h3>
              <p className="text-slate-400">Visually architect, test, and version your FastAPI and Node.js microservices with built-in schema validation.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                <Terminal className="text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Linux System Tools</h3>
              <p className="text-slate-400">Real-time server health metrics, sandboxed shell execution, and automated systemd service management.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secured Infrastructure</h3>
              <p className="text-slate-400">JWT-based RBAC, audit trails, and automated SSL termination via NGINX and Certbot integration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
