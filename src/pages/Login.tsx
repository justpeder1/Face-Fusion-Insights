import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User, KeyRound } from 'lucide-react';

// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'demo@facefusion.com',
    password: 'demo1234',
    name: 'Demo User',
    subscription: 'premium',
    subscriptionEnd: '2025-05-15',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop'
  }
];

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if the URL has a tab parameter
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    
    if (tab === 'register') {
      setActiveTab('register');
    }
    
    // Check if user is already logged in
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      navigate('/dashboard');
    }
  }, [location, navigate]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Save user to localStorage for demo purposes
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try using demo@facefusion.com / demo1234",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a new user object
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        subscription: 'free',
        subscriptionEnd: null,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };
      
      // Save user to localStorage for demo purposes
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome to Face Fusion Insights, ${name}!`,
      });
      
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };
  
  const handleDemoLogin = () => {
    setEmail('demo@facefusion.com');
    setPassword('demo1234');
    
    setTimeout(() => {
      const demoUser = mockUsers[0];
      localStorage.setItem('currentUser', JSON.stringify(demoUser));
      
      toast({
        title: "Demo login successful",
        description: `Welcome to the demo, ${demoUser.name}!`,
      });
      
      navigate('/dashboard');
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="glass rounded-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Face Fusion Insights</h1>
            <p className="text-muted-foreground">Sign in to access your account and analysis tools</p>
          </div>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
              >
                Quick Demo Login
              </Button>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login; 