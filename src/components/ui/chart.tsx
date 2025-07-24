
import React from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface ChartProps {
  data: any[];
  xAxisKey?: string;
  yAxisKey?: string;
  nameKey?: string;
  valueKey?: string;
  height?: number;
}

export const LineChart: React.FC<ChartProps> = ({
  data,
  xAxisKey = "name",
  yAxisKey = "value",
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={yAxisKey}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export const BarChart: React.FC<ChartProps> = ({
  data,
  xAxisKey = "name",
  yAxisKey = "value",
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yAxisKey} fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const PieChart: React.FC<ChartProps> = ({
  data,
  nameKey = "name",
  valueKey = "value",
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey={valueKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};