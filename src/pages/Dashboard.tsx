import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DropZone } from "@/components/DropZone";
import { AnalysisResult } from "@/components/AnalysisResult";
import { AnalysisHistory } from "@/components/AnalysisHistory";
import { Button } from "@/components/ui/button";
import { Share2, Download, Loader2, Camera, Lock, Heart, Globe, PieChart, BarChart, Activity, 
  LineChart, TrendingUp, Users, Calendar, Filter, Zap, ChevronRight, ArrowUpDown, 
  RefreshCw, BookOpen, Lightbulb } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Crown, User, Shield } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Info, History, Trash, Settings as SettingsIcon, Save, PieChart as PieChartIcon, BarChart as BarChartIcon, Activity as ActivityIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Settings } from 'lucide-react';

// Mock history data
const mockHistoryData = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    date: 'April 2, 2025',
    primaryEthnicity: 'European',
    age: 28,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    date: 'March 28, 2025',
    primaryEthnicity: 'East Asian',
    age: 34,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919',
    date: 'March 15, 2025',
    primaryEthnicity: 'South Asian',
    age: 31,
  },
];

// Mock analysis result data
const mockAnalysisResult = {
  age: 28,
  gender: { male: 0.92, female: 0.08 },
  ethnicity: {
    european: 0.72,
    eastAsian: 0.12,
    african: 0.08,
    hispanic: 0.06,
    middleEastern: 0.02,
  },
  emotion: {
    neutral: 0.65,
    happy: 0.25,
    surprised: 0.05,
    sad: 0.03,
    angry: 0.02,
  },
  features: {
    eyes: 'Blue',
    hair: 'Light Brown',
    faceShape: 'Oval',
  },
};

const Dashboard = () => {
  const [historyItems, setHistoryItems] = useState(mockHistoryData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("facenet");
  const [selectedGender, setSelectedGender] = useState<string>("auto");
  const [analysisMode, setAnalysisMode] = useState<string>("phenotypic");
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  // Add new statistics state
  const [stats, setStats] = useState({
    totalAnalyses: mockHistoryData.length,
    averageAge: 31,
    topEthnicity: "European",
    lastAnalysisDate: "March 28, 2025",
    remainingQuota: user?.subscription === 'free' ? 7 : 'Unlimited',
  });

  // Add new insights data
  const [insightsData, setInsightsData] = useState({
    // Ethnicity distribution over time (last 6 months)
    ethnicityTrends: [
      { month: 'Nov', european: 65, eastAsian: 15, african: 10, hispanic: 7, middleEastern: 3 },
      { month: 'Dec', european: 68, eastAsian: 12, african: 12, hispanic: 5, middleEastern: 3 },
      { month: 'Jan', european: 70, eastAsian: 10, african: 12, hispanic: 6, middleEastern: 2 },
      { month: 'Feb', european: 72, eastAsian: 12, african: 8, hispanic: 6, middleEastern: 2 },
      { month: 'Mar', european: 75, eastAsian: 10, african: 8, hispanic: 5, middleEastern: 2 },
      { month: 'Apr', european: 72, eastAsian: 12, african: 8, hispanic: 6, middleEastern: 2 },
    ],
    // Age distribution
    ageDistribution: {
      '18-24': 15,
      '25-34': 35,
      '35-44': 25,
      '45-54': 15,
      '55+': 10
    },
    // Gender distribution
    genderDistribution: {
      male: 58,
      female: 42
    },
    // Emotion trends
    emotionTrends: {
      neutral: 65,
      happy: 20,
      surprised: 5,
      sad: 5,
      angry: 5
    },
    // Analysis frequency (last 6 months)
    analysisFrequency: [
      { month: 'Nov', count: 12 },
      { month: 'Dec', count: 15 },
      { month: 'Jan', count: 10 },
      { month: 'Feb', count: 18 },
      { month: 'Mar', count: 22 },
      { month: 'Apr', count: 16 },
    ],
    // Top detected features
    topFeatures: [
      { feature: 'Eye Color', value: 'Brown', percentage: 45 },
      { feature: 'Hair Color', value: 'Black', percentage: 38 },
      { feature: 'Face Shape', value: 'Oval', percentage: 32 },
      { feature: 'Skin Tone', value: 'Medium', percentage: 40 },
    ],
    // Insights and recommendations
    insights: [
      { id: 1, title: 'Age Trend', description: 'Your analyzed subjects are trending younger in recent months.', icon: 'trending-down' },
      { id: 2, title: 'Diverse Sampling', description: 'Your dataset shows good diversity across different ethnicities.', icon: 'users' },
      { id: 3, title: 'Consistency', description: 'Your analysis settings have been consistent, providing reliable data.', icon: 'check-circle' },
    ]
  });

  // Add active tab state for insights
  const [activeInsightsTab, setActiveInsightsTab] = useState('trends');

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    setResults(null);
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setResults(mockAnalysisResult);
      setAnalyzing(false);
      
      // Add to history
      const newHistoryItem = {
        id: Date.now().toString(),
        imageUrl: URL.createObjectURL(selectedImage),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        primaryEthnicity: 'European',
        age: 28,
        model: selectedModel,
        gender: selectedGender,
        mode: analysisMode,
      };
      
      setHistoryItems([newHistoryItem, ...historyItems]);
      
      toast({
        title: "Analysis complete",
        description: "View your results below",
      });
    }, 2500);
  };

  const handleDownloadResults = () => {
    if (!results) return;
    
    // Create a JSON object with the results
    const resultsData = {
      timestamp: new Date().toISOString(),
      analysis: {
        age: results.age,
        gender: results.gender,
        ethnicity: results.ethnicity,
        emotion: results.emotion,
        features: results.features
      },
      settings: {
        model: selectedModel,
        gender: selectedGender,
        mode: analysisMode
      }
    };
    
    // Convert to JSON string
    const jsonString = JSON.stringify(resultsData, null, 2);
    
    // Create a blob with the data
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `face-analysis-results-${new Date().getTime()}.json`;
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Click the link to trigger the download
    link.click();
    
    // Remove the link from the body
    document.body.removeChild(link);
    
    // Release the URL object
    URL.revokeObjectURL(url);
    
    toast({
      title: "Results downloaded",
      description: "Your analysis results have been downloaded as JSON.",
    });
  };

  const handleShareResults = () => {
    if (!results) return;
    
    // In a real app, this would generate a shareable link
    // For now, we'll simulate copying a link to clipboard
    
    const dummyLink = `https://facefusion-insights.com/shared/analysis/${Date.now().toString(36)}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(dummyLink).then(() => {
      toast({
        title: "Share link copied",
        description: "A shareable link has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Failed to copy link",
        description: "Please try again or share the results manually.",
        variant: "destructive",
      });
    });
  };

  // Add new function to download full report
  const handleDownloadFullReport = () => {
    if (!results) return;
    
    // Create HTML content for the report
    const reportContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FaceFusion Insights - Analysis Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #6d28d9;
          }
          h1, h2, h3 {
            color: #6d28d9;
          }
          .section {
            margin-bottom: 30px;
          }
          .result-item {
            margin-bottom: 15px;
          }
          .result-label {
            font-weight: bold;
          }
          .bar {
            height: 20px;
            background-color: #6d28d9;
            border-radius: 4px;
            margin-top: 5px;
          }
          .timestamp {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 50px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">FaceFusion Insights</div>
          <h1>Facial Analysis Report</h1>
          <p>Comprehensive analysis results and insights</p>
        </div>
        
        <div class="section">
          <h2>Analysis Summary</h2>
          <p>This report contains the results of facial analysis performed on ${new Date().toLocaleDateString()} using the ${selectedModel} model.</p>
          
          <div class="result-item">
            <div class="result-label">Age Estimation:</div>
            <div>${results.age} years</div>
          </div>
          
          <div class="result-item">
            <div class="result-label">Gender Prediction:</div>
            <div>${results.gender.male > results.gender.female ? 'Male' : 'Female'} (${(Math.max(results.gender.male, results.gender.female) * 100).toFixed(1)}% confidence)</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Ethnicity Analysis</h2>
          <table>
            <tr>
              <th>Ethnicity</th>
              <th>Confidence</th>
            </tr>
            ${Object.entries(results.ethnicity)
              .sort((a, b) => Number(b[1]) - Number(a[1]))
              .map(([ethnicity, confidence]) => `
                <tr>
                  <td>${ethnicity.charAt(0).toUpperCase() + ethnicity.slice(1)}</td>
                  <td>${(Number(confidence) * 100).toFixed(2)}%</td>
                </tr>
              `).join('')}
          </table>
        </div>
        
        <div class="section">
          <h2>Emotion Detection</h2>
          <table>
            <tr>
              <th>Emotion</th>
              <th>Confidence</th>
            </tr>
            ${Object.entries(results.emotion)
              .sort((a, b) => Number(b[1]) - Number(a[1]))
              .map(([emotion, confidence]) => `
                <tr>
                  <td>${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</td>
                  <td>${(Number(confidence) * 100).toFixed(2)}%</td>
                </tr>
              `).join('')}
          </table>
        </div>
        
        <div class="section">
          <h2>Facial Features</h2>
          <table>
            <tr>
              <th>Feature</th>
              <th>Value</th>
            </tr>
            ${Object.entries(results.features)
              .map(([feature, value]) => `
                <tr>
                  <td>${feature.charAt(0).toUpperCase() + feature.slice(1)}</td>
                  <td>${value}</td>
                </tr>
              `).join('')}
          </table>
        </div>
        
        <div class="section">
          <h2>Analysis Settings</h2>
          <table>
            <tr>
              <th>Setting</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Model</td>
              <td>${selectedModel}</td>
            </tr>
            <tr>
              <td>Gender Selection</td>
              <td>${selectedGender}</td>
            </tr>
            <tr>
              <td>Analysis Mode</td>
              <td>${analysisMode}</td>
            </tr>
          </table>
        </div>
        
        <div class="timestamp">
          Report generated on ${new Date().toLocaleString()} by FaceFusion Insights
        </div>
      </body>
      </html>
    `;
    
    // Create a blob with the HTML content
    const blob = new Blob([reportContent], { type: 'text/html' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `face-analysis-report-${new Date().getTime()}.html`;
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Click the link to trigger the download
    link.click();
    
    // Remove the link from the body
    document.body.removeChild(link);
    
    // Release the URL object
    URL.revokeObjectURL(url);
    
    toast({
      title: "Full report downloaded",
      description: "Your comprehensive analysis report has been downloaded as HTML.",
    });
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistoryItems(historyItems.filter(item => item.id !== id));
    
    toast({
      title: "Analysis deleted",
      description: "The analysis has been removed from your history.",
    });
  };

  const handleViewHistoryItem = (id: string) => {
    toast({
      title: "Viewing past analysis",
      description: "Loading previous analysis results.",
    });
  };

  // Function to get subscription badge component
  const getSubscriptionBadge = () => {
    if (!user) return null;
    
    switch(user.subscription) {
      case 'premium':
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">
            <Crown className="mr-1 h-3 w-3" /> Premium
          </Badge>
        );
      case 'enterprise':
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Shield className="mr-1 h-3 w-3" /> Enterprise
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <User className="mr-1 h-3 w-3" /> Free Plan
          </Badge>
        );
    }
  };

  // Helper function for remaining quota display
  const getRemainingQuotaDisplay = () => {
    if (user?.subscription === 'free') {
      return (
        <div className="flex items-center">
          <span className="text-lg font-medium">{stats.remainingQuota}</span>
          <span className="text-xs text-muted-foreground ml-1">/ 10</span>
        </div>
      );
    } else {
      return <span className="text-lg font-medium">Unlimited</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">Face Analysis Dashboard</h1>
          
          {user && (
            <div className="glass px-4 py-2 rounded-lg flex items-center gap-3 text-sm">
              <span>Welcome, <span className="font-medium">{user.name}</span></span>
              {getSubscriptionBadge()}
              {user.subscription !== 'free' && user.subscriptionEnd && (
                <span className="text-xs text-muted-foreground">
                  Subscription ends: {new Date(user.subscriptionEnd).toLocaleDateString()}
                </span>
              )}
              {user.subscription === 'free' && (
                <Link to="/pricing" className="text-xs text-primary hover:underline">
                  Upgrade now
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Add Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Activity className="h-5 w-5 mr-2" />
                Analysis Statistics
              </CardTitle>
              <CardDescription>
                Summary of your facial analysis activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-2 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold">{stats.totalAnalyses}</p>
                  <p className="text-sm text-muted-foreground">Total Analyses</p>
                </div>
                <div className="text-center p-2 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold">{stats.averageAge}</p>
                  <p className="text-sm text-muted-foreground">Average Age</p>
                </div>
                <div className="text-center p-2 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold capitalize">{stats.topEthnicity}</p>
                  <p className="text-sm text-muted-foreground">Top Ethnicity</p>
                </div>
                <div className="text-center p-2 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold">{getRemainingQuotaDisplay()}</div>
                  <p className="text-sm text-muted-foreground">Analyses Left</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last analysis:</span>
                <span>{stats.lastAnalysisDate}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass md:h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <SettingsIcon className="h-5 w-5 mr-2" />
                Quick Settings
              </CardTitle>
              <CardDescription>
                Frequently used settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Default Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dlib">dlib</SelectItem>
                      <SelectItem value="facenet">facenet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Analysis Mode</Label>
                  <Select value={analysisMode} onValueChange={setAnalysisMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Analysis mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phenotypic">Phenotypic</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Trash className="h-4 w-4 mr-2" />
                  Clear History
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <Card className="glass mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Upload a high-quality facial image for the best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <DropZone onImageUpload={handleImageUpload} className="mb-2" />
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <SettingsIcon className="h-5 w-5 mr-2" />
                    Analysis Settings
                  </CardTitle>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Customize your analysis parameters for more accurate results</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>
                  Fine-tune your analysis parameters for more accurate results
                </CardDescription>
              </CardHeader>
              <CardContent>                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="model">Model Selection</Label>
                      <Badge variant="outline" className="text-xs">
                        {user?.subscription !== 'free' ? 'Premium Models' : 'Basic Models'}
                      </Badge>
                    </div>
                    
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger id="model" className="w-full">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dlib">dlib</SelectItem>
                        <SelectItem value="facenet">facenet</SelectItem>
                        {user?.subscription !== 'free' && (
                          <>
                            <SelectItem value="deepface">deepface (Premium)</SelectItem>
                            <SelectItem value="efficientnet">efficientnet (Premium)</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Different models may produce varying results for the same image
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Gender Selection</Label>
                    <RadioGroup value={selectedGender} onValueChange={setSelectedGender} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="auto" id="auto" />
                        <Label htmlFor="auto" className="cursor-pointer">Auto-detect</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Analysis Mode</Label>
                      
                      {user?.subscription === 'free' && (
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Some features require Premium
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <Tabs defaultValue={analysisMode} onValueChange={setAnalysisMode} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="phenotypic">Phenotypic</TabsTrigger>
                        <TabsTrigger value="country" disabled={user?.subscription === 'free'}>Country</TabsTrigger>
                        <TabsTrigger value="detailed" disabled={user?.subscription === 'free'}>Detailed</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <p className="text-xs text-muted-foreground mt-2">
                      {analysisMode === "phenotypic" && "Analyzes general phenotypic features and characteristics"}
                      {analysisMode === "country" && "Estimates country of origin based on facial features"}
                      {analysisMode === "detailed" && "Provides detailed breakdown of phenotypic traits"}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={!selectedImage || analyzing}
                    className="w-full"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : "Analyze Image"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {results ? (
            <div>
              <AnalysisResult results={results} />
              
              <div className="flex space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleDownloadResults}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Results
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleDownloadFullReport}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleShareResults}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Results
                </Button>
              </div>
            </div>
          ) : (
            <Card className="glass flex flex-col items-center justify-center text-center h-full">
              <CardContent className="pt-10 pb-10 flex flex-col items-center">
                <div className="mb-6">
                  <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">No Analysis Yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Upload an image and customize your analysis settings, then click "Analyze Image" to see your results here.
                </p>
                {analyzing && (
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p>Analyzing your image...</p>
                    <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
                  </div>
                )}
                
                {!analyzing && (
                  <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                    <Card className="bg-primary/5 border-primary/10">
                      <CardContent className="p-3 text-center">
                        <BarChartIcon className="h-6 w-6 mx-auto mb-1 text-primary" />
                        <p className="text-xs">Ethnicity Analysis</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/5 border-primary/10">
                      <CardContent className="p-3 text-center">
                        <User className="h-6 w-6 mx-auto mb-1 text-primary" />
                        <p className="text-xs">Age & Gender</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/5 border-primary/10">
                      <CardContent className="p-3 text-center">
                        <Heart className="h-6 w-6 mx-auto mb-1 text-primary" />
                        <p className="text-xs">Emotion Detection</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/5 border-primary/10">
                      <CardContent className="p-3 text-center">
                        <Globe className="h-6 w-6 mx-auto mb-1 text-primary" />
                        <p className="text-xs">Geographic Origin</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        <Card className="glass mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Analysis History
              </CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <CardDescription>
              Review and manage your previous facial analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalysisHistory 
              items={historyItems}
              onDelete={handleDeleteHistoryItem}
              onView={handleViewHistoryItem}
            />
          </CardContent>
        </Card>
        
        {/* Add Insights Section */}
        {user?.subscription !== 'free' && (
          <Card className="glass mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2" />
                  Analysis Insights
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Insights are generated based on your analysis history and patterns</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardDescription>
                Discover trends and patterns from your facial analysis data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeInsightsTab} onValueChange={setActiveInsightsTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="trends">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trends
                  </TabsTrigger>
                  <TabsTrigger value="demographics">
                    <Users className="h-4 w-4 mr-2" />
                    Demographics
                  </TabsTrigger>
                  <TabsTrigger value="recommendations">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Recommendations
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="trends" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Analysis Frequency Chart */}
                    <Card className="border border-primary/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Analysis Frequency</CardTitle>
                        <CardDescription>Last 6 months</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="h-[200px] w-full">
                          {/* Mock chart - in real app, use a chart library */}
                          <div className="flex h-full items-end justify-between gap-2">
                            {insightsData.analysisFrequency.map((item, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <div 
                                  className="w-10 bg-primary/80 hover:bg-primary transition-colors rounded-t-sm" 
                                  style={{ height: `${(item.count / 25) * 100}%` }}
                                ></div>
                                <span className="text-xs mt-2">{item.month}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Ethnicity Trends */}
                    <Card className="border border-primary/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Ethnicity Trends</CardTitle>
                        <CardDescription>Distribution over time</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="h-[200px] w-full">
                          {/* Mock stacked area chart - in real app, use a chart library */}
                          <div className="flex h-full items-end justify-between">
                            {insightsData.ethnicityTrends.map((item, index) => (
                              <div key={index} className="flex flex-col items-center w-full">
                                <div className="w-full flex flex-col-reverse h-full">
                                  <div className="w-full bg-blue-500/70 h-[72%]"></div>
                                  <div className="w-full bg-green-500/70 h-[12%]"></div>
                                  <div className="w-full bg-yellow-500/70 h-[8%]"></div>
                                  <div className="w-full bg-red-500/70 h-[6%]"></div>
                                  <div className="w-full bg-purple-500/70 h-[2%]"></div>
                                </div>
                                <span className="text-xs mt-2">{item.month}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge className="bg-blue-500/70">European</Badge>
                          <Badge className="bg-green-500/70">East Asian</Badge>
                          <Badge className="bg-yellow-500/70">African</Badge>
                          <Badge className="bg-red-500/70">Hispanic</Badge>
                          <Badge className="bg-purple-500/70">Middle Eastern</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="border border-primary/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Key Observations</CardTitle>
                      <CardDescription>Automatically detected patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <div className="flex items-center mb-2">
                            <TrendingUp className="h-5 w-5 text-primary mr-2" />
                            <h3 className="font-medium">Increasing European Percentage</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            European ethnicity detection has increased by 7% over the last 6 months.
                          </p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-5 w-5 text-primary mr-2" />
                            <h3 className="font-medium">Peak Analysis Month</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            March was your most active month with 22 analyses performed.
                          </p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Filter className="h-5 w-5 text-primary mr-2" />
                            <h3 className="font-medium">Consistent Features</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Brown eyes and black hair are your most consistently detected features.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="demographics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age Distribution */}
                    <Card className="border border-primary/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Age Distribution</CardTitle>
                        <CardDescription>By age groups</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-4 mt-4">
                          {Object.entries(insightsData.ageDistribution).map(([range, percentage], index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{range}</span>
                                <span>{percentage}%</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Gender Distribution */}
                    <Card className="border border-primary/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Gender Distribution</CardTitle>
                        <CardDescription>Overall percentage</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="h-[200px] flex items-center justify-center">
                          {/* Mock donut chart - in real app, use a chart library */}
                          <div className="relative h-40 w-40">
                            <div className="absolute inset-0 rounded-full border-8 border-blue-500/70"></div>
                            <div 
                              className="absolute inset-0 rounded-full border-8 border-pink-500/70"
                              style={{ 
                                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI * 2 * (insightsData.genderDistribution.female / 100))}% ${50 - 50 * Math.sin(Math.PI * 2 * (insightsData.genderDistribution.female / 100))}%, 50% 50%)` 
                              }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold">{insightsData.genderDistribution.male}%</div>
                                <div className="text-xs text-muted-foreground">Male</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500/70 mr-2"></div>
                            <span className="text-sm">Male ({insightsData.genderDistribution.male}%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-pink-500/70 mr-2"></div>
                            <span className="text-sm">Female ({insightsData.genderDistribution.female}%)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Top Features */}
                  <Card className="border border-primary/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Top Detected Features</CardTitle>
                      <CardDescription>Most common characteristics</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {insightsData.topFeatures.map((feature, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{feature.feature}</span>
                              <span className="font-medium">{feature.value} ({feature.percentage}%)</span>
                            </div>
                            <Progress value={feature.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-6">
                  <Card className="border border-primary/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Analysis Recommendations</CardTitle>
                      <CardDescription>Based on your history and patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4 mt-4">
                        <div className="p-4 border border-primary/10 rounded-lg">
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <Zap className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Try Different Analysis Models</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                You've primarily used the facenet model. For more diverse results, try the deepface or efficientnet models.
                              </p>
                              <Button size="sm" variant="outline" className="h-8">
                                <RefreshCw className="h-3 w-3 mr-2" />
                                Switch Models
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-primary/10 rounded-lg">
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Expand Ethnic Diversity</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                Your dataset is skewed towards European ethnicities. Consider analyzing more diverse subjects for balanced insights.
                              </p>
                              <Button size="sm" variant="outline" className="h-8">
                                <BookOpen className="h-3 w-3 mr-2" />
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-primary/10 rounded-lg">
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <ArrowUpDown className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Try Detailed Analysis Mode</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                You've mostly used the basic phenotypic mode. The detailed mode can provide more granular insights about facial features.
                              </p>
                              <Button size="sm" variant="outline" className="h-8">
                                <ChevronRight className="h-3 w-3 mr-2" />
                                Enable Detailed Mode
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-primary/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Accuracy Improvements</CardTitle>
                      <CardDescription>Ways to enhance your analysis results</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center p-3 bg-primary/5 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <Camera className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Use high-resolution images</h4>
                            <p className="text-xs text-muted-foreground">
                              Images with at least 500x500 pixels provide the best results
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-primary/5 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Ensure clear facial visibility</h4>
                            <p className="text-xs text-muted-foreground">
                              Avoid images with obstructions, poor lighting, or extreme angles
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-primary/5 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <Settings className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Manually set gender when known</h4>
                            <p className="text-xs text-muted-foreground">
                              Pre-selecting gender can improve ethnicity and age detection accuracy
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
        
        {user?.subscription === 'free' && (
          <Card className="glass mb-6 border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Unlock Advanced Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Upgrade to Premium to access detailed analysis trends and recommendations
                    </p>
                  </div>
                </div>
                <Link to="/pricing">
                  <Button>
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
