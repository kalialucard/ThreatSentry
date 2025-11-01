
export type LogEntry = {
  id: string;
  timestamp: string;
  host: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  source: string;
  user?: string;
  src_ip?: string;
  os?: 'Windows' | 'Linux' | 'macOS' | 'Unknown';
  action?: 'login' | 'db_query' | 'read' | 'write';
  attempts?: number;
};

export const mockLogEntries: LogEntry[] = [
  { id: '1', timestamp: new Date(Date.now() - 2000).toISOString(), host: 'web-prod-01', severity: 'error', message: 'Failed to connect to database: Connection refused', source: 'app.log', os: 'Linux', action: 'db_query', attempts: 1, src_ip: '10.1.1.5' },
  { id: '2', timestamp: new Date(Date.now() - 5000).toISOString(), host: 'auth-svc-eu', severity: 'warning', message: 'Invalid login attempt for user: admin', source: 'auth.log', user: 'admin', src_ip: '198.51.100.12', os: 'Unknown', action: 'login', attempts: 1 },
  { id: '3', timestamp: new Date(Date.now() - 10000).toISOString(), host: 'db-master-us-east', severity: 'info', message: 'User alice successfully authenticated', source: 'syslog', user: 'alice', src_ip: '203.0.113.45', os: 'Windows', action: 'login', attempts: 1 },
  { id: '4', timestamp: new Date(Date.now() - 15000).toISOString(), host: 'web-prod-02', severity: 'critical', message: 'Service unavailable: 503 error on /api/v1/health', source: 'access.log', src_ip: '192.0.2.8', os: 'Linux', action: 'read', attempts: 1 },
  { id: '5', timestamp: new Date(Date.now() - 25000).toISOString(), host: 'auth-svc-eu', severity: 'warning', message: 'Multiple failed login attempts for user: root', source: 'auth.log', user: 'root', src_ip: '10.200.1.5', os: 'Linux', action: 'login', attempts: 25 },
  { id: '6', timestamp: new Date(Date.now() - 35000).toISOString(), host: 'k8s-worker-3', severity: 'info', message: 'Pod successfully scheduled on node', source: 'kubelet', os: 'Linux', action: 'write', attempts: 1 },
];

export const mockChartData = [
  { time: '12:00', logs: 4000, anomalies: 24 },
  { time: '12:05', logs: 3000, anomalies: 13 },
  { time: '12:10', logs: 2000, anomalies: 98 },
  { time: '12:15', logs: 2780, anomalies: 39 },
  { time: '12:20', logs: 1890, anomalies: 48 },
  { time: '12:25', logs: 2390, anomalies: 38 },
  { time: '12:30', logs: 3490, anomalies: 43 },
];

export const mockSeverityDistribution = [
    { name: 'Info', value: 400, fill: 'hsl(var(--chart-3))' },
    { name: 'Warning', value: 300, fill: 'hsl(var(--chart-4))' },
    { name: 'Error', value: 200, fill: 'hsl(var(--chart-5))' },
    { name: 'Critical', value: 100, fill: 'hsl(var(--destructive))' },
];

export type Incident = {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  events: number;
  status: 'open' | 'closed' | 'monitoring';
  details: string;
};

export const mockIncidents: Incident[] = [
    { id: 'INC-001', title: 'Brute-force attack detected on auth-svc-eu', severity: 'high', timestamp: new Date(Date.now() - 3600000).toISOString(), events: 142, status: 'open', details: 'Multiple failed login attempts from a single IP address (198.51.100.12) targeting multiple user accounts on auth-svc-eu. The attack started at...'},
    { id: 'INC-002', title: 'Potential data exfiltration from db-master', severity: 'high', timestamp: new Date(Date.now() - 7200000).toISOString(), events: 3, status: 'monitoring', details: 'Anomalous outbound traffic pattern observed from db-master-us-east to an unknown external IP (104.18.20.125). The volume of data transferred is significantly higher than baseline...'},
    { id: 'INC-003', title: 'Anomalous process execution on web-prod-01', severity: 'medium', timestamp: new Date(Date.now() - 86400000).toISOString(), events: 5, status: 'closed', details: 'A suspicious process `xmrig` was detected running on web-prod-01, indicative of potential cryptomining malware. The process was terminated and the machine was isolated for forensic analysis...'},
];
