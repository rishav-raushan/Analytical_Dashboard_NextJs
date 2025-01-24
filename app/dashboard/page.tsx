'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { NavBar } from '@/components/nav-bar';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Line } from 'recharts';
import { Activity, Users, Clock, MousePointer } from 'lucide-react';
import type { AnalyticsData, ChartData } from '@/lib/types';

const mockChartData: ChartData[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: `${i}:00`,
  value: Math.floor(Math.random() * 100),
}));

const mockAnalytics: AnalyticsData = {
  activeUsers: 142,
  pageViews: 2847,
  avgSessionTime: 5.2,
  bounceRate: 32.5,
};

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics);
  const [chartData, setChartData] = useState<ChartData[]>(mockChartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        pageViews: prev.pageViews + Math.floor(Math.random() * 20) - 10,
      }));

      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastTimestamp = parseInt(prev[prev.length - 1].timestamp);
        newData.push({
          timestamp: `${(lastTimestamp + 1) % 24}:00`,
          value: Math.floor(Math.random() * 100),
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto p-4 space-y-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-medium">Active Users</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.activeUsers}</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <h3 className="text-sm font-medium">Page Views</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.pageViews}</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <h3 className="text-sm font-medium">Avg. Session Time</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.avgSessionTime}m</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <MousePointer className="h-4 w-4 text-red-500" />
              <h3 className="text-sm font-medium">Bounce Rate</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.bounceRate}%</p>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Active Users Over Time</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="timestamp" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--primary))' }}
                    axisLine={{ stroke: 'hsl(var(--primary))' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--primary))' }}
                    axisLine={{ stroke: 'hsl(var(--primary))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Activity Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--primary))' }}
                    axisLine={{ stroke: 'hsl(var(--primary))' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--primary))' }}
                    axisLine={{ stroke: 'hsl(var(--primary))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}