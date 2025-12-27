
export type Page = 
  | 'landing' 
  | 'dashboard' 
  | 'auth' 
  | 'api-management' 
  | 'testing' 
  | 'linux-tools' 
  | 'deployment' 
  | 'logs' 
  | 'security' 
  | 'git';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Developer' | 'Viewer';
  avatar?: string;
}

export interface ApiService {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'inactive' | 'error';
  env: 'dev' | 'prod';
  endpoints: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  service: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  trace?: string;
}

export interface MetricData {
  time: string;
  cpu: number;
  memory: number;
  latency: number;
}
