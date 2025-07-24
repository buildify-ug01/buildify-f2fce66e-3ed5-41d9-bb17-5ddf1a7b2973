
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Mock data for maintenance records
const maintenanceData = [
  {
    id: 1,
    equipmentId: "EQ-001",
    equipmentName: "Mining Rig Alpha",
    maintenanceType: "Preventive",
    status: "Scheduled",
    date: new Date(2025, 6, 26), // July 26, 2025
    technician: "Ahmed Hassan",
    notes: "Regular cooling system check and dust cleaning"
  },
  {
    id: 2,
    equipmentId: "EQ-003",
    equipmentName: "Power Supply Unit B",
    maintenanceType: "Corrective",
    status: "Completed",
    date: new Date(2025, 6, 20), // July 20, 2025
    technician: "Fatima Ali",
    notes: "Replaced faulty power connector and tested stability"
  },
  {
    id: 3,
    equipmentId: "EQ-007",
    equipmentName: "Cooling System Delta",
    maintenanceType: "Preventive",
    status: "In Progress",
    date: new Date(2025, 6, 24), // July 24, 2025
    technician: "Mohamed Salah",
    notes: "Replacing coolant fluid and checking for leaks"
  },
  {
    id: 4,
    equipmentId: "EQ-012",
    equipmentName: "Mining Rig Gamma",
    maintenanceType: "Emergency",
    status: "Pending",
    date: new Date(2025, 6, 25), // July 25, 2025
    technician: "Unassigned",
    notes: "Overheating issue detected, requires immediate attention"
  }
];

const Maintenance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [maintenanceRecords, setMaintenanceRecords] = useState(maintenanceData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    equipmentId: "",
    equipmentName: "",
    maintenanceType: "Preventive",
    date: new Date(),
    technician: "",
    notes: ""
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter maintenance records based on search term and status
  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch = 
      record.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleAddMaintenance = () => {
    const newRecord = {
      id: maintenanceRecords.length + 1,
      ...newMaintenance,
      status: "Scheduled"
    };
    
    setMaintenanceRecords([...maintenanceRecords, newRecord]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewMaintenance({
      equipmentId: "",
      equipmentName: "",
      maintenanceType: "Preventive",
      date: new Date(),
      technician: "",
      notes: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-blue-500";
      case "scheduled":
        return "bg-yellow-500";
      case "pending":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Maintenance</DialogTitle>
              <DialogDescription>
                Create a new maintenance task for your mining equipment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipmentId">Equipment ID</Label>
                  <Input 
                    id="equipmentId" 
                    value={newMaintenance.equipmentId}
                    onChange={(e) => setNewMaintenance({...newMaintenance, equipmentId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipmentName">Equipment Name</Label>
                  <Input 
                    id="equipmentName" 
                    value={newMaintenance.equipmentName}
                    onChange={(e) => setNewMaintenance({...newMaintenance, equipmentName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenanceType">Maintenance Type</Label>
                  <Select 
                    value={newMaintenance.maintenanceType}
                    onValueChange={(value) => setNewMaintenance({...newMaintenance, maintenanceType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Preventive">Preventive</SelectItem>
                      <SelectItem value="Corrective">Corrective</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Scheduled Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newMaintenance.date ? format(newMaintenance.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newMaintenance.date}
                        onSelect={(date) => setNewMaintenance({...newMaintenance, date: date || new Date()})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="technician">Assigned Technician</Label>
                <Input 
                  id="technician" 
                  value={newMaintenance.technician}
                  onChange={(e) => setNewMaintenance({...newMaintenance, technician: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  value={newMaintenance.notes}
                  onChange={(e) => setNewMaintenance({...newMaintenance, notes: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddMaintenance}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>
                View and manage all scheduled and completed maintenance tasks.
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search equipment, technician..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment ID</TableHead>
                    <TableHead>Equipment Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.equipmentId}</TableCell>
                        <TableCell>{record.equipmentName}</TableCell>
                        <TableCell>{record.maintenanceType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(record.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No maintenance records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Calendar</CardTitle>
              <CardDescription>
                View scheduled maintenance by date.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-lg font-medium mb-4">
                    {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                  </h3>
                  <div className="space-y-4">
                    {date && maintenanceRecords
                      .filter(record => 
                        record.date.getDate() === date.getDate() &&
                        record.date.getMonth() === date.getMonth() &&
                        record.date.getFullYear() === date.getFullYear()
                      )
                      .map(record => (
                        <Card key={record.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{record.equipmentName}</h4>
                              <p className="text-sm text-muted-foreground">{record.equipmentId}</p>
                            </div>
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm"><span className="font-medium">Type:</span> {record.maintenanceType}</p>
                            <p className="text-sm"><span className="font-medium">Technician:</span> {record.technician}</p>
                            {record.notes && (
                              <p className="text-sm mt-2"><span className="font-medium">Notes:</span> {record.notes}</p>
                            )}
                          </div>
                        </Card>
                      ))}
                    {date && maintenanceRecords.filter(record => 
                      record.date.getDate() === date.getDate() &&
                      record.date.getMonth() === date.getMonth() &&
                      record.date.getFullYear() === date.getFullYear()
                    ).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No maintenance scheduled for this date
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Maintenance;