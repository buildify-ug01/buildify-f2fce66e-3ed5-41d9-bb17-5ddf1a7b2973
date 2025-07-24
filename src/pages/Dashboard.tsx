
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Activity, CpuIcon, Coins, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mining Power</CardTitle>
            <CpuIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 TH/s</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TEOS Mined</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Equipment</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/30</div>
            <p className="text-xs text-muted-foreground">
              80% operational rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mining">Mining</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Mining Performance</CardTitle>
                <CardDescription>
                  Daily mining rate over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { name: "Week 1", value: 400 },
                    { name: "Week 2", value: 300 },
                    { name: "Week 3", value: 500 },
                    { name: "Week 4", value: 450 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Equipment Status</CardTitle>
                <CardDescription>
                  Current status of mining equipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Active", value: 24 },
                    { name: "Maintenance", value: 4 },
                    { name: "Offline", value: 2 },
                  ]}
                  nameKey="name"
                  valueKey="value"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="mining" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mining Distribution</CardTitle>
              <CardDescription>
                TEOS tokens mined by equipment type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { name: "ASIC Miners", value: 1200 },
                  { name: "GPU Rigs", value: 800 },
                  { name: "CPU Servers", value: 345 },
                ]}
                xAxisKey="name"
                yAxisKey="value"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Efficiency</CardTitle>
              <CardDescription>
                Performance metrics by equipment type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { name: "ASIC Miners", value: 95 },
                  { name: "GPU Rigs", value: 88 },
                  { name: "CPU Servers", value: 76 },
                ]}
                xAxisKey="name"
                yAxisKey="value"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;