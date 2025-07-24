
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Share2, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Referral {
  id: string;
  username: string;
  date: Date;
  status: 'active' | 'pending';
}

export default function Referrals() {
  const { toast } = useToast();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralBonus, setReferralBonus] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedReferrals = localStorage.getItem('teosReferrals');
    const savedReferralBonus = localStorage.getItem('teosReferralBonus');
    const savedTotalEarnings = localStorage.getItem('teosReferralEarnings');
    
    if (savedReferrals) setReferrals(JSON.parse(savedReferrals));
    if (savedReferralBonus) setReferralBonus(parseFloat(savedReferralBonus));
    if (savedTotalEarnings) setTotalEarnings(parseFloat(savedTotalEarnings));
    
    // If no saved referrals, create sample data for demonstration
    if (!savedReferrals) {
      const sampleReferrals: Referral[] = [
        {
          id: '1',
          username: 'ahmed_123',
          date: new Date(2023, 5, 15),
          status: 'active',
        },
        {
          id: '2',
          username: 'cairo_miner',
          date: new Date(2023, 6, 22),
          status: 'active',
        },
        {
          id: '3',
          username: 'nile_crypto',
          date: new Date(2023, 7, 3),
          status: 'pending',
        },
      ];
      
      setReferrals(sampleReferrals);
      localStorage.setItem('teosReferrals', JSON.stringify(sampleReferrals));
      
      // Set sample bonus and earnings
      setReferralBonus(10); // 10% bonus (2 active referrals * 5%)
      setTotalEarnings(25.5);
      localStorage.setItem('teosReferralBonus', '10');
      localStorage.setItem('teosReferralEarnings', '25.5');
    }
  }, []);

  const copyReferralLink = () => {
    // Generate a unique referral link
    const referralLink = `${window.location.origin}?ref=${btoa(Date.now().toString())}`;
    navigator.clipboard.writeText(referralLink);
    
    toast({
      title: "Referral Link Copied!",
      description: "Share this link with friends to earn bonus mining rewards!",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Referral Program</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Referrals</CardTitle>
            <CardDescription>Your network size</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{referrals.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mining Bonus</CardTitle>
            <CardDescription>Your current mining boost</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{referralBonus}%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
            <CardDescription>From referral bonuses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalEarnings.toFixed(2)} $TEOS</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Your Referrals
          </CardTitle>
          <CardDescription>
            Earn 5% mining bonus for each active referral
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bonus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>{referral.username}</TableCell>
                    <TableCell>{formatDate(referral.date)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status === 'active' ? 'Active' : 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell>{referral.status === 'active' ? '5%' : '0%'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">You haven't referred anyone yet.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={copyReferralLink}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Your Referral Link
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Share your unique referral link with friends and on social media</li>
            <li>When someone signs up using your link, they become your referral</li>
            <li>Once they start mining, you earn a permanent 5% boost to your mining rewards</li>
            <li>There's no limit to how many people you can refer - build your network!</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}