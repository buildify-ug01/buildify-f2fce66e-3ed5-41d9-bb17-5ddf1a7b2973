
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Navigate } from 'react-router-dom';

interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  hashRate: number;
  powerConsumption: number;
  purchaseDate: string;
  lastMaintenance: string;
}

const EquipmentPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock equipment data
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'TEOS Miner X1',
      type: 'ASIC',
      status: 'active',
      hashRate: 50,
      powerConsumption: 1500,
      purchaseDate: '2023-01-15',
      lastMaintenance: '2023-06-20',
    },
    {
      id: '2',
      name: 'TEOS Miner X2',
      type: 'ASIC',
      status: 'maintenance',
      hashRate: 75,
      powerConsumption: 2000,
      purchaseDate: '2023-03-10',
      lastMaintenance: '2023-07-05',
    },
    {
      id: '3',
      name: 'TEOS GPU Rig',
      type: 'GPU',
      status: 'inactive',
      hashRate: 30,
      powerConsumption: 1200,
      purchaseDate: '2022-11-20',
      lastMaintenance: '2023-05-15',
    },
  ]);

  const [newEquipment, setNewEquipment] = useState<Partial<Equipment>>({
    name: '',
    type: 'ASIC',
    status: 'inactive',
    hashRate: 0,
    powerConsumption: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    lastMaintenance: new Date().toISOString().split('T')[0],
  });

  const handleAddEquipment = () => {
    if (!newEquipment.name) {
      toast({
        title: "Error",
        description: "Equipment name is required",
        variant: "destructive",
      });
      return;
    }

    const equipmentToAdd: Equipment = {
      id: Date.now().toString(),
      name: newEquipment.name || '',
      type: newEquipment.type || 'ASIC',
      status: newEquipment.status || 'inactive',
      hashRate: newEquipment.hashRate || 0,
      powerConsumption: newEquipment.powerConsumption || 0,
      purchaseDate: newEquipment.purchaseDate || new Date().toISOString().split('T')[0],
      lastMaintenance: newEquipment.lastMaintenance || new Date().toISOString().split('T')[0],
    };

    setEquipment([...equipment, equipmentToAdd]);
    setNewEquipment({
      name: '',
      type: 'ASIC',
      status: 'inactive',
      hashRate: 0,
      powerConsumption: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      lastMaintenance: new Date().toISOString().split('T')[0],
    });

    toast({
      title: "Equipment Added",
      description: `${equipmentToAdd.name} has been added to your equipment list.`,
    });
  };

  const handleStatusChange = (id: string, status: 'active' | 'inactive' | 'maintenance') => {
    setEquipment(equipment.map(item => 
      item.id === id ? { ...item, status } : item
    ));

    toast({
      title: "Status Updated",
      description: `Equipment status has been updated to ${status}.`,
    });
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Equipment Management</h1>
      
      <Tabs defaultValue="list">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Equipment List</TabsTrigger>
          <TabsTrigger value="add">Add Equipment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>Type: {item.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium ${
                        item.status === 'active' ? 'text-green-500' : 
                        item.status === 'maintenance' ? 'text-amber-500' : 
                        'text-red-500'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hash Rate:</span>
                      <span>{item.hashRate} TH/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Power:</span>
                      <span>{item.powerConsumption} W</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Purchase Date:</span>
                      <span>{new Date(item.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Maintenance:</span>
                      <span>{new Date(item.lastMaintenance).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button 
                      variant={item.status === 'active' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleStatusChange(item.id, 'active')}
                    >
                      Activate
                    </Button>
                    <Button 
                      variant={item.status === 'maintenance' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleStatusChange(item.id, 'maintenance')}
                    >
                      Maintenance
                    </Button>
                    <Button 
                      variant={item.status === 'inactive' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleStatusChange(item.id, 'inactive')}
                    >
                      Deactivate
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Equipment</CardTitle>
              <CardDescription>Enter the details of your new mining equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Equipment Name</Label>
                  <Input 
                    id="name" 
                    value={newEquipment.name} 
                    onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <select 
                    id="type" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newEquipment.type} 
                    onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
                  >
                    <option value="ASIC">ASIC</option>
                    <option value="GPU">GPU</option>
                    <option value="CPU">CPU</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hashRate">Hash Rate (TH/s)</Label>
                    <Input 
                      id="hashRate" 
                      type="number" 
                      value={newEquipment.hashRate} 
                      onChange={(e) => setNewEquipment({...newEquipment, hashRate: Number(e.target.value)})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="powerConsumption">Power Consumption (W)</Label>
                    <Input 
                      id="powerConsumption" 
                      type="number" 
                      value={newEquipment.powerConsumption} 
                      onChange={(e) => setNewEquipment({...newEquipment, powerConsumption: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="purchaseDate">Purchase Date</Label>
                    <Input 
                      id="purchaseDate" 
                      type="date" 
                      value={newEquipment.purchaseDate} 
                      onChange={(e) => setNewEquipment({...newEquipment, purchaseDate: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastMaintenance">Last Maintenance</Label>
                    <Input 
                      id="lastMaintenance" 
                      type="date" 
                      value={newEquipment.lastMaintenance} 
                      onChange={(e) => setNewEquipment({...newEquipment, lastMaintenance: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddEquipment}>Add Equipment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentPage;