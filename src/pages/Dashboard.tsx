
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import MiningStats from "@/components/MiningStats";
import UserProfile from "@/components/UserProfile";
import EquipmentList from "@/components/EquipmentList";
import { Clock, Pickaxe, Users, Zap } from "lucide-react";

const Dashboard = () => {
  const [tokens, setTokens] = useState(0);
  const [lastMined, setLastMined] = useState<Date | null>(null);
  const [referrals, setReferrals] = useState(0);
  const [miningPower, setMiningPower] = useState(1);
  const [cooldownProgress, setCooldownProgress] = useState(100);
  const [isMining, setIsMining] = useState(false);
  const { toast } = useToast();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedTokens = localStorage.getItem("teosTokens");
    const savedLastMined = localStorage.getItem("teosLastMined");
    const savedReferrals = localStorage.getItem("teosReferrals");
    const savedMiningPower = localStorage.getItem("teosMiningPower");

    if (savedTokens) setTokens(parseFloat(savedTokens));
    if (savedLastMined) setLastMined(new Date(savedLastMined));
    if (savedReferrals) setReferrals(parseInt(savedReferrals));
    if (savedMiningPower) setMiningPower(parseFloat(savedMiningPower));
  }, []);

  // Update cooldown progress
  useEffect(() => {
    if (!lastMined) return;

    const updateCooldown = () => {
      const now = new Date();
      const elapsed = now.getTime() - lastMined.getTime();
      const hourInMs = 3600000; // 1 hour in milliseconds
      
      if (elapsed >= hourInMs) {
        setCooldownProgress(100);
        return;
      }
      
      const progress = (elapsed / hourInMs) * 100;
      setCooldownProgress(progress);
    };

    updateCooldown();
    const interval = setInterval(updateCooldown, 1000);
    
    return () => clearInterval(interval);
  }, [lastMined]);

  const canMine = !lastMined || (new Date().getTime() - lastMined.getTime() >= 3600000);

  const mineToken = () => {
    if (!canMine) {
      const timeLeft = Math.ceil((3600000 - (new Date().getTime() - (lastMined?.getTime() || 0))) / 60000);
      toast({
        variant: "destructive",
        title: "Mining cooldown active",
        description: `You can mine again in ${timeLeft} minute${timeLeft !== 1 ? 's' : ''}.`,
      });
      return;
    }

    setIsMining(true);

    // Simulate mining process
    setTimeout(() => {
      const referralBonus = referrals * 0.05; // 5% bonus per referral
      const tokensEarned = miningPower + (miningPower * referralBonus);
      const newTotal = tokens + tokensEarned;
      const now = new Date();
      
      setTokens(newTotal);
      setLastMined(now);
      setIsMining(false);
      
      // Save to localStorage
      localStorage.setItem("teosTokens", newTotal.toString());
      localStorage.setItem("teosLastMined", now.toString());
      
      toast({
        title: "Mining successful!",
        description: `You earned ${tokensEarned.toFixed(2)} $TEOS tokens.`,
      });
    }, 2000);
  };

  const handleReferral = () => {
    const referralLink = `${window.location.origin}?ref=${Date.now()}`;
    navigator.clipboard.writeText(referralLink);
    
    toast({
      title: "Referral link copied!",
      description: "Share this link with friends to earn 5% bonus per referral.",
    });
    
    // For demo purposes, increment referrals
    const newReferrals = referrals + 1;
    setReferrals(newReferrals);
    localStorage.setItem("teosReferrals", newReferrals.toString());
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">TEOS Egypt Mining Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokens.toFixed(2)} $TEOS</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mining Power</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{miningPower.toFixed(2)} $TEOS/hr</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Referral Bonus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(referrals * 5).toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">{referrals} active referrals</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cooldown</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={cooldownProgress} className="h-2 mb-2" />
            <div className="text-sm text-muted-foreground">
              {canMine ? "Ready to mine!" : "Cooling down..."}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mining Operations</CardTitle>
            <CardDescription>Mine $TEOS tokens once per hour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Current Mining Rate</h3>
                <p className="text-3xl font-bold">
                  {miningPower.toFixed(2)} $TEOS/hr
                  {referrals > 0 && (
                    <span className="text-green-600 text-lg ml-2">
                      +{(referrals * 5).toFixed(0)}%
                    </span>
                  )}
                </p>
              </div>
              
              <Button 
                size="lg" 
                onClick={mineToken} 
                disabled={isMining || !canMine}
                className="w-full max-w-xs h-16 text-lg"
              >
                {isMining ? "Mining..." : "Mine $TEOS"}
              </Button>
              
              {!canMine && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Mining cooldown active. Please wait until the cooldown completes.
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={handleReferral}
                className="h-12"
              >
                <Users className="mr-2 h-4 w-4" />
                Share Referral Link
              </Button>
              
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Equipment upgrades will be available in the next update!",
                  });
                }}
              >
                <Pickaxe className="mr-2 h-4 w-4" />
                Upgrade Equipment
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mining Activity</CardTitle>
            <CardDescription>Your recent mining operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lastMined ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Mining Operation</p>
                      <p className="text-xs text-muted-foreground">
                        {lastMined.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">
                    +{(miningPower + (miningPower * (referrals * 0.05))).toFixed(2)} $TEOS
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No mining activity yet</p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Next Mining Available</p>
                    <p className="text-xs text-muted-foreground">
                      {canMine 
                        ? "Now" 
                        : new Date(
                            (lastMined?.getTime() || 0) + 3600000
                          ).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  {canMine ? "Ready" : "Cooling down"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="stats" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="stats">Mining Stats</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats">
          <MiningStats tokens={tokens} miningPower={miningPower} referrals={referrals} />
        </TabsContent>
        
        <TabsContent value="equipment">
          <EquipmentList />
        </TabsContent>
        
        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;