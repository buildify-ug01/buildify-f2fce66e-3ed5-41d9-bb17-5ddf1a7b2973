
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export default function Mine() {
  const [tokens, setTokens] = useState(0);
  const [lastMined, setLastMined] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [miningBonus, setMiningBonus] = useState(0);
  const { toast } = useToast();

  // Load mining data from localStorage on component mount
  useEffect(() => {
    const savedTokens = localStorage.getItem('teosTokens');
    const savedLastMined = localStorage.getItem('teosLastMined');
    const savedReferrals = localStorage.getItem('teosReferrals');
    
    if (savedTokens) setTokens(parseInt(savedTokens));
    if (savedLastMined) setLastMined(new Date(savedLastMined));
    if (savedReferrals) {
      const referrals = parseInt(savedReferrals);
      setMiningBonus(referrals * 5); // 5% bonus per referral
    }
  }, []);

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (lastMined) {
        const now = new Date();
        const miningCooldown = 3600000; // 1 hour in milliseconds
        const elapsed = now.getTime() - lastMined.getTime();
        const remaining = Math.max(0, miningCooldown - elapsed);
        
        setTimeLeft(Math.floor(remaining / 1000));
        
        // If cooldown is complete, clear the interval
        if (remaining <= 0) {
          clearInterval(timer);
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [lastMined]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!lastMined) return 100;
    
    const now = new Date();
    const miningCooldown = 3600000; // 1 hour in milliseconds
    const elapsed = now.getTime() - lastMined.getTime();
    const progress = Math.min(100, (elapsed / miningCooldown) * 100);
    
    return progress;
  };

  const mineToken = () => {
    const now = new Date();
    
    if (!lastMined || (now.getTime() - lastMined.getTime() >= 3600000)) { // 1 hour cooldown
      const baseReward = 1;
      const bonusReward = baseReward * (miningBonus / 100);
      const totalReward = baseReward + bonusReward;
      
      const newTokens = tokens + totalReward;
      setTokens(newTokens);
      setLastMined(now);
      setTimeLeft(3600);
      
      localStorage.setItem('teosTokens', newTokens.toString());
      localStorage.setItem('teosLastMined', now.toString());
      
      toast({
        title: "Mining Successful!",
        description: `You mined ${totalReward.toFixed(2)} $TEOS tokens!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Mining Cooldown",
        description: "You can only mine once per hour!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>TEOS Mining</CardTitle>
            <CardDescription>Mine $TEOS tokens once per hour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Mining Cooldown</span>
              <span className="text-sm font-medium">
                {timeLeft > 0 ? formatTime(timeLeft) : "Ready to mine!"}
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
            
            <div className="pt-4">
              <div className="flex justify-between mb-2">
                <span>Current Balance</span>
                <span className="font-bold">{tokens.toFixed(2)} $TEOS</span>
              </div>
              
              {miningBonus > 0 && (
                <div className="flex justify-between mb-2 text-sm text-green-600">
                  <span>Referral Bonus</span>
                  <span>+{miningBonus}%</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              size="lg"
              disabled={timeLeft > 0}
              onClick={mineToken}
            >
              {timeLeft > 0 ? `Mine Again in ${formatTime(timeLeft)}` : "Mine $TEOS"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="flex-1">
          <Car