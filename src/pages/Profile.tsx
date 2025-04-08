import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { 
  User, Settings, CreditCard, LogOut, Shield, Bell, 
  Edit, Save, CalendarClock, CheckCircle, Loader2, Crown
} from 'lucide-react';
import { cn } from "@/lib/utils";

// Subscription plan data
const subscriptionPlans = [
  { 
    id: 'free', 
    name: 'Free', 
    price: '$0', 
    features: ['Basic face analysis', '10 analyses per month', 'Standard accuracy'],
    color: 'bg-green-500',
    icon: <User className="h-5 w-5" />
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: '$9.99', 
    features: ['Advanced face analysis', 'Unlimited analyses', 'High accuracy models', 'Country detection', 'Detailed phenotype analysis'],
    color: 'bg-purple-500',
    icon: <Crown className="h-5 w-5" />
  },
  { 
    id: 'enterprise', 
    name: 'Enterprise', 
    price: '$49.99', 
    features: ['Everything in Premium', 'API access', 'Batch processing', 'Custom models', '24/7 support'],
    color: 'bg-blue-500',
    icon: <Shield className="h-5 w-5" />
  }
];

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('currentUser');
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email,
      });
    } else {
      // Redirect to login if no user found
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to login
    navigate('/login');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      };
      
      // Update localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };
  
  const getCurrentPlan = () => {
    if (!user) return subscriptionPlans[0];
    return subscriptionPlans.find(plan => plan.id === user.subscription) || subscriptionPlans[0];
  };
  
  const getSubscriptionTimeLeft = () => {
    if (!user || !user.subscriptionEnd) return 0;
    
    const endDate = new Date(user.subscriptionEnd);
    const now = new Date();
    const totalDays = 30; // Assuming 30-day subscription
    
    const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    return (daysLeft / totalDays) * 100;
  };
  
  const handleUpgrade = () => {
    // Show upgrade confirmation toast
    toast({
      title: "Upgrade initiated",
      description: "You'll be redirected to the payment page.",
    });
    
    // Navigate to pricing page
    navigate('/pricing');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }
  
  if (!user) return null;
  
  const currentPlan = getCurrentPlan();
  
  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="px-2 py-1 text-xs flex items-center gap-1">
                {currentPlan.icon}
                <span>{currentPlan.name} Plan</span>
              </Badge>
              
              {user.subscription !== 'free' && user.subscriptionEnd && (
                <Badge variant="outline" className="px-2 py-1 text-xs flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" />
                  <span>Expires: {new Date(user.subscriptionEnd).toLocaleDateString()}</span>
                </Badge>
              )}
            </div>
          </div>
          
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex mb-8">
            <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="subscription"><CreditCard className="mr-2 h-4 w-4" /> Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isLoading}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing || isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing || isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password"
                    value="••••••••"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Password changes not available in demo mode
                  </p>
                </div>
              </CardContent>
              
              {isEditing && (
                <CardFooter className="border-t pt-6 flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {subscriptionPlans.map(plan => (
                <Card 
                  key={plan.id} 
                  className={cn(
                    "glass border-2 transition-all", 
                    user.subscription === plan.id ? "border-primary" : "border-transparent hover:border-primary/50"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.price}/month</CardDescription>
                      </div>
                      <div className={`h-10 w-10 rounded-full ${plan.color} flex items-center justify-center`}>
                        {plan.icon}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    {user.subscription === plan.id ? (
                      <Button variant="outline" className="w-full" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Current Plan
                      </Button>
                    ) : (
                      <Button 
                        variant={plan.id === 'premium' ? "default" : "outline"} 
                        className="w-full"
                        onClick={handleUpgrade}
                      >
                        {plan.id === 'free' ? "Downgrade" : "Upgrade"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {user.subscription !== 'free' && user.subscriptionEnd && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Subscription Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Current Period</span>
                        <span>Expires {new Date(user.subscriptionEnd).toLocaleDateString()}</span>
                      </div>
                      <Progress value={getSubscriptionTimeLeft()} className="h-2" />
                    </div>
                    
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Billing cycle</span>
                        <span className="text-sm">Monthly</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payment method</span>
                        <span className="text-sm">•••• 4242</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Next billing date</span>
                        <span className="text-sm">{new Date(user.subscriptionEnd).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">Update Payment</Button>
                      <Button variant="outline" size="sm" className="text-destructive">Cancel Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile; 