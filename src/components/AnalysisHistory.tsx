import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  Eye,
  Globe,
  MoreHorizontal,
  Trash2,
  User,
  Settings,
  BarChart3,
  Filter,
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  PieChart,
  BookOpen
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface HistoryItem {
  id: string;
  imageUrl: string;
  date: string;
  primaryEthnicity: string;
  age: number;
  model?: string;
  gender?: string;
  mode?: string;
}

interface AnalysisHistoryProps {
  items: HistoryItem[];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  className?: string;
}

export const AnalysisHistory = ({ 
  items, 
  onDelete, 
  onView,
  className 
}: AnalysisHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'age' | 'ethnicity'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterModel, setFilterModel] = useState<string | null>(null);
  const [filterGender, setFilterGender] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const itemsPerPage = viewMode === 'grid' ? 6 : 8;
  
  // Get unique filter options from items
  const filterOptions = useMemo(() => {
    const models = new Set<string>();
    const genders = new Set<string>();
    const modes = new Set<string>();
    
    items.forEach(item => {
      if (item.model) models.add(item.model);
      if (item.gender) genders.add(item.gender);
      if (item.mode) modes.add(item.mode);
    });
    
    return {
      models: Array.from(models),
      genders: Array.from(genders),
      modes: Array.from(modes),
    };
  }, [items]);
  
  // Apply filters and sorting
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.primaryEthnicity.toLowerCase().includes(term) ||
        item.date.toLowerCase().includes(term) ||
        item.age.toString().includes(term) ||
        (item.model && item.model.toLowerCase().includes(term)) ||
        (item.gender && item.gender.toLowerCase().includes(term)) ||
        (item.mode && item.mode.toLowerCase().includes(term))
      );
    }
    
    // Apply filters
    if (filterModel) {
      result = result.filter(item => item.model === filterModel);
    }
    
    if (filterGender) {
      result = result.filter(item => item.gender === filterGender);
    }
    
    if (filterMode) {
      result = result.filter(item => item.mode === filterMode);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let compareValueA: string | number;
      let compareValueB: string | number;
      
      switch (sortBy) {
        case 'date':
          compareValueA = new Date(a.date).getTime();
          compareValueB = new Date(b.date).getTime();
          break;
        case 'age':
          compareValueA = a.age;
          compareValueB = b.age;
          break;
        case 'ethnicity':
          compareValueA = a.primaryEthnicity;
          compareValueB = b.primaryEthnicity;
          break;
        default:
          compareValueA = new Date(a.date).getTime();
          compareValueB = new Date(b.date).getTime();
      }
      
      if (sortOrder === 'asc') {
        return compareValueA > compareValueB ? 1 : -1;
      } else {
        return compareValueA < compareValueB ? 1 : -1;
      }
    });
    
    return result;
  }, [items, searchTerm, filterModel, filterGender, filterMode, sortBy, sortOrder]);
  
  // Pagination
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const currentItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedItem(null);
  };
  
  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
    onView(item.id);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilterModel(null);
    setFilterGender(null);
    setFilterMode(null);
    setCurrentPage(1);
  };
  
  const canResetFilters = searchTerm || filterModel || filterGender || filterMode;
  const hasFilters = filteredAndSortedItems.length !== items.length;
  
  if (items.length === 0) {
    return (
      <div className={cn("glass p-6 rounded-xl text-center", className)}>
        <h2 className="text-xl font-semibold mb-4">Analysis History</h2>
        <div className="py-8">
          <p className="text-muted-foreground">You haven't analyzed any images yet.</p>
          <p className="text-muted-foreground mt-2">Upload an image to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass p-6 rounded-xl", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Analysis History</h2>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <Filter className="h-4 w-4 mr-1" /> 
                  Filter
                  {hasFilters && <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">!</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Model</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={filterModel || ""} onValueChange={(v) => setFilterModel(v || null)}>
                  <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                  {filterOptions.models.map(model => (
                    <DropdownMenuRadioItem key={model} value={model}>{model}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Gender</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={filterGender || ""} onValueChange={(v) => setFilterGender(v || null)}>
                  <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                  {filterOptions.genders.map(gender => (
                    <DropdownMenuRadioItem key={gender} value={gender} className="capitalize">{gender}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Analysis Mode</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={filterMode || ""} onValueChange={(v) => setFilterMode(v || null)}>
                  <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                  {filterOptions.modes.map(mode => (
                    <DropdownMenuRadioItem key={mode} value={mode} className="capitalize">{mode}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                
                {canResetFilters && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={resetFilters} className="justify-center text-primary">
                      Reset Filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <ArrowUpDown className="h-4 w-4 mr-1" /> Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                  <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="age">Age</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="ethnicity">Ethnicity</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={(v) => setSortOrder(v as 'asc' | 'desc')}>
                  <DropdownMenuRadioItem value="desc">Newest First</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="asc">Oldest First</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex border rounded-md overflow-hidden">
              <Toggle 
                pressed={viewMode === 'grid'} 
                onPressedChange={() => setViewMode('grid')}
                className="rounded-none px-2"
                variant="outline"
                size="sm"
              >
                <BarChart3 className="h-4 w-4" />
              </Toggle>
              <Toggle 
                pressed={viewMode === 'list'} 
                onPressedChange={() => setViewMode('list')}
                className="rounded-none px-2"
                variant="outline"
                size="sm"
              >
                <BookOpen className="h-4 w-4" />
              </Toggle>
            </div>
          </div>
        </div>
      </div>
      
      {hasFilters && filteredAndSortedItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">No results match your filters.</p>
          <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((item) => (
                <div key={item.id} className="glass rounded-lg overflow-hidden hover:border-primary/50 transition-colors border-2 border-transparent">
                  <div className="aspect-video relative overflow-hidden" onClick={() => handleViewDetails(item)}>
                    <img 
                      src={item.imageUrl} 
                      alt={`Analysis from ${item.date}`} 
                      className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center text-xs text-white/90 space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    
                    {item.model && (
                      <Badge variant="secondary" className="absolute top-2 left-2">
                        {item.model}
                      </Badge>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2 h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDelete(item.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Ethnicity</p>
                        <div className="flex items-center">
                          <Globe className="h-3 w-3 mr-1 text-primary" />
                          <p className="text-sm font-medium">{item.primaryEthnicity}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Age</p>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-primary" />
                          <p className="text-sm font-medium">{item.age} years</p>
                        </div>
                      </div>
                    </div>
                    
                    {(item.gender || item.mode) && (
                      <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-border">
                        {item.gender && item.gender !== 'auto' && (
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1 text-primary" />
                            <p className="text-xs capitalize">{item.gender}</p>
                          </div>
                        )}
                        
                        {item.mode && (
                          <div className="flex items-center ml-auto">
                            <BarChart3 className="h-3 w-3 mr-1 text-primary" />
                            <p className="text-xs capitalize">{item.mode}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md divide-y">
              {currentItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(item)}
                >
                  <div className="relative h-16 w-28 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={`Analysis from ${item.date}`} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-4 gap-3 flex-grow">
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium">{item.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Ethnicity</p>
                      <p className="text-sm font-medium">{item.primaryEthnicity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Age</p>
                      <p className="text-sm font-medium">{item.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Model & Mode</p>
                      <div className="flex gap-2 mt-1">
                        {item.model && <Badge variant="outline" className="text-xs">{item.model}</Badge>}
                        {item.mode && <Badge variant="outline" className="text-xs capitalize">{item.mode}</Badge>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(item);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedItems.length)} of {filteredAndSortedItems.length} results
              </p>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(index + 1)}
                    className={index >= 2 && index < totalPages - 1 && Math.abs(currentPage - index - 1) > 1 ? "hidden sm:flex" : ""}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      
      <Dialog open={isDetailsOpen} onOpenChange={handleDetailsClose}>
        {selectedItem && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Analysis Details</DialogTitle>
              <DialogDescription>
                Analyzed on {selectedItem.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="rounded-md overflow-hidden border mb-4">
                  <img 
                    src={selectedItem.imageUrl} 
                    alt={`Analysis from ${selectedItem.date}`} 
                    className="w-full aspect-square object-cover"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedItem.model && (
                    <Badge variant="outline">
                      Model: {selectedItem.model}
                    </Badge>
                  )}
                  {selectedItem.gender && selectedItem.gender !== 'auto' && (
                    <Badge variant="outline" className="capitalize">
                      Gender: {selectedItem.gender}
                    </Badge>
                  )}
                  {selectedItem.mode && (
                    <Badge variant="outline" className="capitalize">
                      Mode: {selectedItem.mode}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="py-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Age</h4>
                          <span className="text-2xl font-bold">{selectedItem.age}</span>
                        </div>
                        <Progress value={selectedItem.age / 100 * 100} className="h-1.5" />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="py-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Ethnicity</h4>
                        </div>
                        <p className="text-lg font-medium">{selectedItem.primaryEthnicity}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Confidence Levels</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Age Estimation</span>
                          <span>98%</span>
                        </div>
                        <Progress value={98} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Ethnicity Analysis</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Feature Detection</span>
                          <span>97%</span>
                        </div>
                        <Progress value={97} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Additional Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded-md p-2">
                        <p className="text-xs text-muted-foreground">Eye Color</p>
                        <p className="text-sm font-medium">Blue</p>
                      </div>
                      <div className="border rounded-md p-2">
                        <p className="text-xs text-muted-foreground">Hair Type</p>
                        <p className="text-sm font-medium">Straight</p>
                      </div>
                      <div className="border rounded-md p-2">
                        <p className="text-xs text-muted-foreground">Face Shape</p>
                        <p className="text-sm font-medium">Oval</p>
                      </div>
                      <div className="border rounded-md p-2">
                        <p className="text-xs text-muted-foreground">Emotion</p>
                        <p className="text-sm font-medium">Neutral</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Analysis
                </Button>
              </div>
              <Button onClick={handleDetailsClose} className="w-full sm:w-auto">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
