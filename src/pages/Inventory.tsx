
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Navigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minLevel: number;
  maxLevel: number;
  lastRestocked: string;
}

const InventoryPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock inventory data
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Cooling Fans',
      category: 'Hardware',
      quantity: 15,
      unit: 'pcs',
      minLevel: 5,
      maxLevel: 20,
      lastRestocked: '2023-05-10',
    },
    {
      id: '2',
      name: 'Thermal Paste',
      category: 'Maintenance',
      quantity: 8,
      unit: 'tubes',
      minLevel: 3,
      maxLevel: 10,
      lastRestocked: '2023-06-15',
    },
    {
      id: '3',
      name: 'Power Supplies',
      category: 'Hardware',
      quantity: 4,
      unit: 'pcs',
      minLevel: 2,
      maxLevel: 8,
      lastRestocked: '2023-04-20',
    },
  ]);

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    category: 'Hardware',
    quantity: 0,
    unit: 'pcs',
    minLevel: 0,
    maxLevel: 10,
    lastRestocked: new Date().toISOString().split('T')[0],
  });

  const handleAddItem = () => {
    if (!newItem.name) {
      toast({
        title: "Error",
        description: "Item name is required",
        variant: "destructive",
      });
      return;
    }

    const itemToAdd: InventoryItem = {
      id: Date.now().toString(),
      name: newItem.name || '',
      category: newItem.category || 'Hardware',
      quantity: newItem.quantity || 0,
      unit: newItem.unit || 'pcs',
      minLevel: newItem.minLevel || 0,
      maxLevel: newItem.maxLevel || 10,
      lastRestocked: newItem.lastRestocked || new Date().toISOString().split('T')[0],
    };

    setInventory([...inventory, itemToAdd]);
    setNewItem({
      name: '',
      category: 'Hardware',
      quantity: 0,
      unit: 'pcs',
      minLevel: 0,
      maxLevel: 10,
      lastRestocked: new Date().toISOString().split('T')[0],
    });

    toast({
      title: "Item Added",
      description: `${itemToAdd.name} has been added to your inventory.`,
    });
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));

    toast({
      title: "Inventory Updated",
      description: `Quantity has been ${change > 0 ? 'increased' : 'decreased'}.`,
    });
  };

  const getStockLevel = (item: InventoryItem) => {
    const percentage = (item.quantity / item.maxLevel) * 100;
    if (percentage <= 25) return 'low';
    if (percentage <= 75) return 'medium';
    return 'high';
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      
      <Tabs defaultValue="list">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Inventory List</TabsTrigger>
          <TabsTrigger value="add">Add Item</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item) => {
              const stockLevel = getStockLevel(item);
              const stockPercentage = (item.quantity / item.maxLevel) * 100;
              
              return (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>Category: {item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span>{item.quantity} {item.unit}</span>
                        </div>
                        <Progress 
                