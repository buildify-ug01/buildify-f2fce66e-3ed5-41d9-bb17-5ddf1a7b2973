
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MiningStatsProps {
  tokens: number;
  miningPower: number;
  referrals: number;
}

const MiningStats = ({ tokens, miningPower, referrals }: MiningStatsProps) => {
  // Generate mock data for the chart
  const generate