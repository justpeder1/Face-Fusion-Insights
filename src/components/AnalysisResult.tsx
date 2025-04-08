import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Globe, 
  User, 
  Calendar, 
  SmilePlus,
  Heart,
  EyeIcon,
  Flag,
  BadgeInfo,
  Brain,
  LineChart,
  Camera,
  AlertCircle,
  ChevronDown,
  Download,
  Share2,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AnalysisResultProps {
  results: {
    age: number;
    gender: { male: number; female: number };
    ethnicity: Record<string, number>;
    emotion: Record<string, number>;
    features: {
      eyes: string;
      hair: string;
      faceShape: string;
    };
  };
  className?: string;
}

export const AnalysisResult = ({ results, className }: AnalysisResultProps) => {
  const [currentTab, setCurrentTab] = useState("ethnicity");
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const getTopEthnicity = () => {
    return Object.entries(results.ethnicity)
      .sort((a, b) => b[1] - a[1])[0][0];
  };

  const getTopEmotion = () => {
    return Object.entries(results.emotion)
      .sort((a, b) => b[1] - a[1])[0][0];
  };

  const getDominantGender = () => {
    return results.gender.male > results.gender.female ? 'Male' : 'Female';
  };

  const getGenderConfidence = () => {
    return Math.max(results.gender.male, results.gender.female) * 100;
  };

  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };
  
  // Mock prediction intervals for age
  const getAgePredictionInterval = () => {
    const age = results.age;
    return { lower: age - 2, upper: age + 2 };
  };
  
  // Mock countries associated with the top ethnicities
  const getCountriesByEthnicity = () => {
    const topEthnicity = getTopEthnicity();
    
    const countriesByEthnicity: Record<string, { name: string; probability: number }[]> = {
      european: [
        { name: 'United Kingdom', probability: 0.32 },
        { name: 'Germany', probability: 0.28 },
        { name: 'France', probability: 0.18 },
        { name: 'Italy', probability: 0.12 },
        { name: 'Other European', probability: 0.10 }
      ],
      eastAsian: [
        { name: 'China', probability: 0.40 },
        { name: 'Japan', probability: 0.25 },
        { name: 'Korea', probability: 0.20 },
        { name: 'Other East Asian', probability: 0.15 }
      ],
      african: [
        { name: 'Nigeria', probability: 0.25 },
        { name: 'Ethiopia', probability: 0.20 },
        { name: 'Kenya', probability: 0.15 },
        { name: 'South Africa', probability: 0.15 },
        { name: 'Other African', probability: 0.25 }
      ],
      hispanic: [
        { name: 'Mexico', probability: 0.35 },
        { name: 'Colombia', probability: 0.20 },
        { name: 'Brazil', probability: 0.15 },
        { name: 'Other Hispanic/Latino', probability: 0.30 }
      ],
      middleEastern: [
        { name: 'Turkey', probability: 0.30 },
        { name: 'Iran', probability: 0.25 },
        { name: 'Saudi Arabia', probability: 0.15 },
        { name: 'Other Middle Eastern', probability: 0.30 }
      ],
    };
    
    return countriesByEthnicity[topEthnicity as keyof typeof countriesByEthnicity] || [];
  };
  
  const getGenderBar = () => {
    const malePercentage = results.gender.male * 100;
    const femalePercentage = results.gender.female * 100;
    
    return (
      <div className="h-6 w-full rounded-full overflow-hidden flex">
        <div 
          className="bg-blue-500 h-full flex items-center justify-center text-[10px] font-medium text-white"
          style={{ width: `${malePercentage}%` }}
        >
          {malePercentage > 15 && `${Math.round(malePercentage)}%`}
        </div>
        <div 
          className="bg-pink-500 h-full flex items-center justify-center text-[10px] font-medium text-white"
          style={{ width: `${femalePercentage}%` }}
        >
          {femalePercentage > 15 && `${Math.round(femalePercentage)}%`}
        </div>
      </div>
    );
  };
  
  // Calculate the confidence score based on all analysis factors
  const getOverallConfidence = () => {
    // In a real app, this would be provided by the API
    return 96;
  };

  return (
    <div className={cn("glass p-6 rounded-xl", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold">Analysis Results</h2>
        
        <div className="flex items-center mt-4 md:mt-0">
          <div className="flex items-center mr-4">
            <AlertCircle className="h-4 w-4 text-primary mr-1" />
            <span className="text-sm">Confidence Score: <span className="font-medium">{getOverallConfidence()}%</span></span>
          </div>
          <Badge variant="outline" className="ml-2 bg-primary/10">
            <Camera className="h-3 w-3 mr-1" />
            High Quality Image
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <Badge variant={getDominantGender() === 'Male' ? 'default' : 'outline'} className="bg-blue-500/80 hover:bg-blue-500 text-[10px]">M</Badge>
                  <Badge variant={getDominantGender() === 'Female' ? 'default' : 'outline'} className="bg-pink-500/80 hover:bg-pink-500 text-[10px]">F</Badge>
                </div>
                <p className="text-lg font-medium">{getDominantGender()}</p>
                <div className="mt-1">
                  {getGenderBar()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Age</p>
                <div className="flex items-end">
                  <p className="text-2xl font-medium mr-2">{results.age}</p>
                  <p className="text-xs text-muted-foreground mb-1">years</p>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    Range: {getAgePredictionInterval().lower}-{getAgePredictionInterval().upper}
                  </span>
                  <Progress value={90} className="h-1 w-12 ml-auto" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <SmilePlus className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Emotion</p>
                <p className="text-lg font-medium capitalize">{getTopEmotion()}</p>
                <div className="flex text-xs text-muted-foreground mt-1">
                  <span>{formatPercentage(Object.entries(results.emotion).sort((a, b) => b[1] - a[1])[0][1])}</span>
                  <Progress value={Object.entries(results.emotion).sort((a, b) => b[1] - a[1])[0][1] * 100} className="h-1 w-12 ml-auto mt-1.5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs 
        defaultValue="ethnicity" 
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="ethnicity"><Globe className="mr-2 h-4 w-4" /> Ethnicity</TabsTrigger>
          <TabsTrigger value="emotions"><Heart className="mr-2 h-4 w-4" /> Emotions</TabsTrigger>
          <TabsTrigger value="features"><EyeIcon className="mr-2 h-4 w-4" /> Features</TabsTrigger>
          <TabsTrigger value="detailed"><BadgeInfo className="mr-2 h-4 w-4" /> Detailed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ethnicity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Predominant Ethnicity</p>
                    <h3 className="text-xl font-medium capitalize">{getTopEthnicity()}</h3>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {Object.entries(results.ethnicity)
                  .sort((a, b) => b[1] - a[1])
                  .map(([name, value]) => (
                    <div key={name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm capitalize font-medium">{name}</span>
                        <span className="text-sm font-medium">{formatPercentage(value)}</span>
                      </div>
                      <div className="relative">
                        <Progress value={value * 100} className="h-2.5 rounded-full" />
                        {value > 0.5 && (
                          <Badge className="absolute -top-1 -right-1 bg-primary">
                            Primary
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div>
              <Collapsible
                open={isCountryOpen}
                onOpenChange={setIsCountryOpen}
                className="border rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Flag className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">Country Prediction</h3>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <ChevronDown className={`h-5 w-5 transition-transform ${isCountryOpen ? 'transform rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <div className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Potential countries based on predominant ethnicity
                  </p>
                </div>
                
                <CollapsibleContent className="mt-2">
                  <div className="space-y-3">
                    {getCountriesByEthnicity().map((country, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{country.name}</span>
                          <span className="text-sm font-medium">{Math.round(country.probability * 100)}%</span>
                        </div>
                        <Progress value={country.probability * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="mt-4 p-4 border rounded-xl">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-medium">Analysis Insights</h3>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  The analysis shows a strong confidence in the ethnicity prediction. The facial features are highly consistent with {getTopEthnicity()} characteristics.
                </p>
                
                <Separator className="my-3" />
                
                <div className="text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">Note</Badge>
                    <span>Ethnicity prediction is based on phenotypic features only.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="emotions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Primary Emotion</p>
                    <h3 className="text-xl font-medium capitalize">{getTopEmotion()}</h3>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {Object.entries(results.emotion)
                  .sort((a, b) => b[1] - a[1])
                  .map(([name, value], index) => (
                    <div key={name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm capitalize font-medium">{name}</span>
                        <span className="text-sm font-medium">{formatPercentage(value)}</span>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={value * 100} 
                          className={cn(
                            "h-2.5 rounded-full",
                            index === 0 ? "bg-primary/20" : ""
                          )} 
                        />
                        {index === 0 && (
                          <Badge className="absolute -top-1 -right-1 bg-primary">
                            Primary
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div>
              <div className="border rounded-xl p-4 h-full">
                <div className="flex items-center mb-3">
                  <Brain className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-medium">Emotion Analysis</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  The facial expression shows a predominant {getTopEmotion()} emotion with subtle traces of {
                    Object.entries(results.emotion)
                      .sort((a, b) => b[1] - a[1])[1][0]
                  }.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Card className="border-primary/20">
                    <CardContent className="p-3">
                      <p className="text-xs text-muted-foreground">Emotion Intensity</p>
                      <p className="text-lg font-medium">Medium</p>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardContent className="p-3">
                      <p className="text-xs text-muted-foreground">Confidence</p>
                      <p className="text-lg font-medium">High</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">Tip</Badge>
                    <span>Emotions can affect the accuracy of other analyses.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <EyeIcon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-center mb-1">Eye Color</h3>
                <p className="text-center font-medium text-xl">{results.features.eyes}</p>
                <div className="flex justify-center mt-3">
                  <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white"></div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 7.5v9l-4-2.25L12 18l-4-2.25L4 18v-9"></path>
                    <path d="M4 7.5 8 5 l4 2.25 l4-2.25 l4 2.25"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-center mb-1">Hair Type</h3>
                <p className="text-center font-medium text-xl">{results.features.hair}</p>
                <div className="flex justify-center gap-1 mt-3">
                  <Badge variant="outline">Straight</Badge>
                  <Badge variant="outline">Medium</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M7 16.3c0-1 2.25-2.3 5-2.3s5 1.3 5 2.3"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-center mb-1">Face Shape</h3>
                <p className="text-center font-medium text-xl">{results.features.faceShape}</p>
                <div className="flex justify-center mt-3">
                  <Badge variant="outline">Balanced Proportions</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Additional Features</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Skin Tone</p>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-amber-200 mr-2"></div>
                    <p className="font-medium">Light</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Eyebrow Type</p>
                  <p className="font-medium">Arched</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nose Shape</p>
                  <p className="font-medium">Straight</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Lip Shape</p>
                  <p className="font-medium">Medium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Detailed Phenotype Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Facial Symmetry</p>
                      <p className="text-sm">{formatPercentage(0.93)}</p>
                    </div>
                    <Progress value={93} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Eye Distance</p>
                      <p className="text-sm">Average</p>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Face Width-to-Height Ratio</p>
                      <p className="text-sm">1.78</p>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Nose-to-Mouth Ratio</p>
                      <p className="text-sm">0.42</p>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Chin Prominence</p>
                      <p className="text-sm">Medium</p>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Analysis Metadata</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Overall Confidence</p>
                    <p className="text-sm font-medium">{getOverallConfidence()}%</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Age Confidence</p>
                    <p className="text-sm font-medium">92%</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Gender Confidence</p>
                    <p className="text-sm font-medium">{formatPercentage(Math.max(results.gender.male, results.gender.female))}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Ethnicity Confidence</p>
                    <p className="text-sm font-medium">95%</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Emotion Confidence</p>
                    <p className="text-sm font-medium">89%</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Analysis Method</p>
                    <p className="text-sm font-medium">Deep Neural Network</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Analysis Duration</p>
                    <p className="text-sm font-medium">1.2 seconds</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Points Analyzed</p>
                    <p className="text-sm font-medium">68 landmarks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button variant="outline" className="sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
            <Button variant="outline" className="sm:w-auto">
              <Share2 className="h-4 w-4 mr-2" />
              Share Analysis
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
