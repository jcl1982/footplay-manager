
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard = ({ title, value, change, icon, className }: StatsCardProps) => {
  return (
    <div className={cn("glass-card p-4 rounded-xl animate-fade-in", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      {typeof change !== 'undefined' && (
        <div className={cn(
          "mt-2 text-xs font-medium",
          change >= 0 ? "text-green-600" : "text-red-600"
        )}>
          <span>{change >= 0 ? '+' : ''}{change}%</span>
          <span className="ml-1 text-gray-500">vs dernier mois</span>
        </div>
      )}
    </div>
  );
};

interface BarChartCardProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
  className?: string;
}

export const StatsBarChart = ({ title, data, color = "#1E88E5", className }: BarChartCardProps) => {
  return (
    <div className={cn("glass-card p-4 rounded-xl animate-fade-in", className)}>
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              hide={true}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            <Bar 
              dataKey="value" 
              fill={color}
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface PieChartCardProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  colors?: string[];
  className?: string;
}

export const StatsPieChart = ({ 
  title, 
  data, 
  colors = ["#1E88E5", "#689F38", "#E53935", "#FB8C00", "#8E24AA"], 
  className 
}: PieChartCardProps) => {
  return (
    <div className={cn("glass-card p-4 rounded-xl animate-fade-in", className)}>
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="h-48 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center text-sm">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
