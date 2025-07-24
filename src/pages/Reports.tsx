
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample data - in a real app, this would come from your API/database
const miningData = [
  { date: "2025-07-18", tokens: 24, hours: 8, rewards: 28.8, efficiency: 85 },
  { date: "2025-07-19", tokens: 30, hours: 10, rewards: 36.0, efficiency: 90 },
  { date: "2025-07-20", tokens: 27, hours: 9, rewards: 32.4, efficiency: 88 },
  { date: "2025-07-21", tokens: 36, hours: 12, rewards: 43.2, efficiency: 92 },
  { date: "2025-07-22", tokens: 33, hours: 11, rewards: 39.6, efficiency: 89 },
  { date: "2025-07-23", tokens: 39, hours: 13, rewards: 46.8, efficiency: 94 },
  { date: "2025-07-24", tokens: 42, hours: 14, rewards: 50.4, efficiency: 95 },
];

const equipmentData = [
  { name: "Mining Rig A", status: "Active", uptime: 95 },
  { name: "Mining Rig B", status: "Maintenance", uptime: 78 },
  { name: "Mining Rig C", status: "Active", uptime: 92 },
  { name: "Mining Rig D", status: "Inactive", uptime: 0 },
];

const inventoryData = [
  { name: "GPUs", value: 24 },
  { name: "Power Supplies", value: 18 },
  { name: "Cooling Systems", value: 12 },
  { name: "Cables", value: 36 },
];

const walletData = [
  { name: "TEOS", balance: 1250.75, value: 3752.25, change: 12.5 },
  { name: "Solana", balance: 2.35, value: 423.00, change: -3.2 },
  { name: "Ethereum", balance: 0.12, value: 288.00, change: 5.7 },
  { name: "Pi Network", balance: 500.00, value: 150.00, change: 0.5 },
];

const growthData = [
  { month: "Jan", users: 1200, tokens: 15000 },
  { month: "Feb", users: 1800, tokens: 22500 },
  { month: "Mar", users: 2400, tokens: 30000 },
  { month: "Apr", users: 3200, tokens: 40000 },
  { month: "May", users: 4500, tokens: 56250 },
  { month: "Jun", users: 6000, tokens: 75000 },
  { month: "Jul", users: 8500, tokens: 106250 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("mining");

  return (
    