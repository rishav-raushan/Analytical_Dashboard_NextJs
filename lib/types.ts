export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'bot';
}

export interface AnalyticsData {
  activeUsers: number;
  pageViews: number;
  avgSessionTime: number;
  bounceRate: number;
}

export interface ChartData {
  timestamp: string;
  value: number;
}

export interface WebSocketMessage {
  type: 'analytics' | 'chat' | 'status';
  payload: any;
}