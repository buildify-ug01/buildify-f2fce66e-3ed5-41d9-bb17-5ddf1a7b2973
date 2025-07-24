
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  HardHat, 
  BarChart3, 
  Settings, 
  LogOut,
  Pickaxe,
  Users
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Mine",
      path: "/mine",
      icon: Pickaxe,
    },
    {
      name: "Referrals",
      path: "/referrals",
      icon: Users,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Package,
    },
    {
      name: "Equipment",
      path: "/equipment",
      icon: HardHat,
    },
    {
      name: "Maintenance",
      path: "/maintenance",
      icon: Wrench,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarContent = (
    <>
      <div className="px-3 py-4">
        <Link to="/" className="flex items-center mb-6 px-2">
          <h1 className="text-2xl font-bold">TEOS Mining</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link key={route.path} to={route.path}>
              <Button
                variant={isActive(route.path) ? "default" : "ghost"}
                className={cn("w-full justify-start", {
                  "bg-primary text-primary-foreground": isActive(route.path),
                })}
              >
                <route.icon className="mr-2 h-5 w-5" />
                {route.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={() => logout && logout()}
        >
          <LogOut className="mr-2 h-5 w-5" />
          