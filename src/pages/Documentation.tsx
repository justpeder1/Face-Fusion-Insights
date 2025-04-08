import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Code, 
  FileText, 
  Terminal, 
  Zap, 
  Database, 
  Shield, 
  Settings,
  Search
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Documentation categories with their respective content
const docCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <Zap className="w-5 h-5" />,
    content: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `
# Introduction to FaceFusion Insights

FaceFusion Insights is an advanced facial analysis platform that leverages AI and machine learning to provide detailed insights about facial features, ethnicity, and ancestry.

## What You Can Do

- **Analyze Facial Features**: Upload photos to get detailed analysis of facial characteristics
- **Discover Ancestry**: Explore potential ethnic origins based on facial traits
- **Track Changes**: Compare analyses over time to see how your features evolve
- **Share Results**: Export and share your analysis with others

Our platform is designed to be both powerful and user-friendly, making complex facial analysis accessible to everyone.
        `
      },
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        content: `
# Quick Start Guide

Follow these simple steps to get started with FaceFusion Insights:

1. **Create an Account**: Sign up for a free account to access basic features
2. **Upload a Photo**: Choose a clear, front-facing photo for the best results
3. **View Your Analysis**: Explore the detailed breakdown of your facial features
4. **Save and Share**: Save your results or share them with friends and family

## Photo Requirements

For optimal results, please ensure your photo meets these requirements:
- Clear, well-lit image
- Front-facing orientation
- Neutral expression
- No obstructions (glasses, masks, etc. may affect accuracy)
- High resolution (at least 500x500 pixels)
        `
      },
      {
        id: 'account-setup',
        title: 'Account Setup',
        content: `
# Account Setup

Setting up your FaceFusion Insights account is quick and easy.

## Registration

1. Click the "Sign Up" button in the top-right corner
2. Enter your email address and create a password
3. Verify your email address by clicking the link in the confirmation email
4. Complete your profile with basic information

## Subscription Plans

FaceFusion Insights offers several subscription tiers:

- **Free**: Basic analysis with limited features
- **Premium**: Full analysis capabilities with detailed reports
- **Professional**: Advanced features for researchers and professionals

You can upgrade or downgrade your plan at any time from your account settings.
        `
      }
    ]
  },
  {
    id: 'features',
    title: 'Features & Capabilities',
    icon: <FileText className="w-5 h-5" />,
    content: [
      {
        id: 'facial-analysis',
        title: 'Facial Analysis',
        content: `
# Facial Analysis

Our advanced facial analysis technology provides detailed insights about your facial features.

## Analysis Components

- **Facial Structure**: Analysis of facial symmetry, proportions, and distinctive features
- **Feature Mapping**: Detailed mapping of key facial landmarks
- **Comparative Analysis**: Comparison with global population datasets
- **Confidence Scores**: Reliability indicators for each analysis component

## How It Works

Our AI uses deep learning algorithms trained on diverse datasets to identify and analyze facial features. The system compares your features with reference data from various ethnic groups to provide insights about potential ancestry.

The analysis is non-invasive and based solely on visible facial characteristics.
        `
      },
      {
        id: 'ethnic-insights',
        title: 'Ethnic Insights',
        content: `
# Ethnic Insights

Discover potential ethnic origins based on your facial features.

## Ethnic Analysis Components

- **Regional Mapping**: Identification of facial traits common in specific regions
- **Ancestry Estimation**: Percentage breakdown of potential ethnic origins
- **Historical Context**: Information about migration patterns and historical connections
- **Confidence Intervals**: Statistical reliability of each ethnic estimation

## Understanding Your Results

Ethnic analysis is provided as a probability distribution rather than definitive results. The percentages indicate the likelihood of ancestry from various regions based solely on facial features.

Remember that facial features are just one aspect of ethnicity and ancestry, and results should be interpreted as exploratory rather than definitive.
        `
      },
      {
        id: 'reports',
        title: 'Reports & Exports',
        content: `
# Reports & Exports

Access detailed reports and export options for your analysis results.

## Report Types

- **Basic Summary**: Overview of key findings (available on all plans)
- **Detailed Analysis**: Comprehensive breakdown with visualizations (Premium+)
- **Technical Report**: In-depth technical data for research purposes (Professional)
- **Comparative Report**: Side-by-side comparison with previous analyses (Premium+)

## Export Options

- **PDF Export**: Download a professionally formatted PDF report
- **Image Export**: Save visualizations and graphics from your analysis
- **Data Export**: Export raw data in CSV format (Professional plan only)
- **API Access**: Programmatic access to your analysis data (Professional plan only)

All exports are securely stored in your account and can be accessed at any time.
        `
      }
    ]
  },
  {
    id: 'api',
    title: 'API Documentation',
    icon: <Code className="w-5 h-5" />,
    content: [
      {
        id: 'api-overview',
        title: 'API Overview',
        content: `
# API Overview

The FaceFusion Insights API allows developers to integrate our facial analysis capabilities into their own applications.

## API Access

API access is available on the Professional plan and includes:

- RESTful API endpoints
- Authentication via API keys
- Rate limits based on your subscription tier
- Comprehensive documentation and support

## Getting Started

To start using the API:

1. Log in to your Professional account
2. Navigate to the API section in your dashboard
3. Generate an API key
4. Follow the documentation to make your first API call

Our API uses standard HTTP methods and returns responses in JSON format.
        `
      },
      {
        id: 'endpoints',
        title: 'API Endpoints',
        content: `
# API Endpoints

The FaceFusion Insights API provides the following endpoints:

## Authentication

\`\`\`
POST /api/v1/auth
\`\`\`

Authenticate and retrieve a session token.

## Analysis

\`\`\`
POST /api/v1/analyze
\`\`\`

Submit an image for analysis.

\`\`\`
GET /api/v1/analysis/{analysis_id}
\`\`\`

Retrieve results for a specific analysis.

## User Data

\`\`\`
GET /api/v1/user/analyses
\`\`\`

List all analyses for the authenticated user.

\`\`\`
GET /api/v1/user/profile
\`\`\`

Retrieve user profile information.

## Additional endpoints are available for advanced features. See the complete API reference for details.
        `
      },
      {
        id: 'code-examples',
        title: 'Code Examples',
        content: `
# Code Examples

Here are some examples of how to use the FaceFusion Insights API in different programming languages.

## JavaScript

\`\`\`javascript
// Example: Submitting an image for analysis
const apiKey = 'your_api_key';
const imageFile = document.getElementById('imageUpload').files[0];

const formData = new FormData();
formData.append('image', imageFile);

fetch('https://api.facefusion.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Analysis ID:', data.analysis_id);
  // Store the analysis ID to retrieve results later
})
.catch(error => console.error('Error:', error));
\`\`\`

## Python

\`\`\`python
# Example: Retrieving analysis results
import requests

api_key = 'your_api_key'
analysis_id = 'analysis_id_from_previous_request'

headers = {
    'Authorization': f'Bearer {api_key}'
}

response = requests.get(
    f'https://api.facefusion.com/v1/analysis/{analysis_id}',
    headers=headers
)

if response.status_code == 200:
    results = response.json()
    print('Analysis results:', results)
else:
    print('Error:', response.status_code, response.text)
\`\`\`
        `
      }
    ]
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: <Shield className="w-5 h-5" />,
    content: [
      {
        id: 'data-protection',
        title: 'Data Protection',
        content: `
# Data Protection

At FaceFusion Insights, we take the security and privacy of your data seriously.

## How We Protect Your Data

- **Encryption**: All data is encrypted both in transit and at rest
- **Secure Storage**: Images and analysis results are stored in secure, isolated environments
- **Access Controls**: Strict access controls limit who can view your data
- **Regular Audits**: Our systems undergo regular security audits and penetration testing

## Data Retention

By default, we retain your data according to the following policy:

- **Images**: Stored for 30 days after upload, then automatically deleted
- **Analysis Results**: Stored for the duration of your account
- **Account Information**: Stored until account deletion

You can manually delete your data at any time through your account settings.
        `
      },
      {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        content: `
# Privacy Policy

Our comprehensive privacy policy outlines how we collect, use, and protect your information.

## Data Collection

We collect the following types of data:

- **Account Information**: Email, name, and other details you provide
- **Images**: Photos you upload for analysis
- **Analysis Results**: The outputs of our facial analysis
- **Usage Data**: Information about how you use our platform

## Data Usage

We use your data solely for:

- Providing and improving our services
- Generating your analysis results
- Communicating with you about your account
- Aggregated, anonymized research to improve our algorithms

We never sell your personal data or images to third parties.

For the complete privacy policy, please visit our [Privacy Policy](/privacy) page.
        `
      },
      {
        id: 'compliance',
        title: 'Compliance',
        content: `
# Compliance

FaceFusion Insights is committed to compliance with relevant data protection regulations.

## Regulatory Compliance

Our platform is designed to comply with:

- **GDPR**: General Data Protection Regulation for EU users
- **CCPA**: California Consumer Privacy Act for California residents
- **HIPAA**: Where applicable for professional users in healthcare

## Your Rights

Depending on your location, you have certain rights regarding your data:

- **Access**: Request copies of your personal data
- **Correction**: Request correction of inaccurate data
- **Deletion**: Request deletion of your data
- **Portability**: Request transfer of your data
- **Objection**: Object to certain processing of your data

To exercise these rights, please contact our privacy team through your account settings or via email at privacy@facefusion.com.
        `
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: <Settings className="w-5 h-5" />,
    content: [
      {
        id: 'common-issues',
        title: 'Common Issues',
        content: `
# Common Issues

Here are solutions to frequently encountered problems.

## Upload Issues

**Problem**: Image upload fails or times out.
**Solution**: 
- Ensure your image is under 10MB
- Check your internet connection
- Try a different browser or device
- Reduce the image resolution if it's extremely large

**Problem**: "Unsupported format" error.
**Solution**:
- We support JPG, PNG, and HEIC formats
- Convert your image to a supported format
- Ensure the file has the correct extension

## Analysis Issues

**Problem**: Low confidence scores in analysis.
**Solution**:
- Use a clearer, higher-quality image
- Ensure the face is clearly visible and well-lit
- Remove glasses, masks, or other face coverings
- Try a different photo with a more neutral expression

**Problem**: Missing features in analysis.
**Solution**:
- Some features may be limited by your subscription plan
- Upgrade your account to access additional features
- Check if the feature is in beta and join the waitlist
        `
      },
      {
        id: 'account-issues',
        title: 'Account Issues',
        content: `
# Account Issues

Solutions for common account-related problems.

## Login Problems

**Problem**: Can't log in to your account.
**Solution**:
- Use the "Forgot Password" link to reset your password
- Check if you're using the correct email address
- Clear your browser cookies and cache
- Ensure your account hasn't been deactivated

**Problem**: Account locked after multiple login attempts.
**Solution**:
- Wait 30 minutes before trying again
- Check your email for account recovery instructions
- Contact support if the issue persists

## Billing Issues

**Problem**: Payment method declined.
**Solution**:
- Verify your card details are correct
- Check if your card has expired
- Ensure you have sufficient funds
- Try an alternative payment method

**Problem**: Unexpected charges.
**Solution**:
- Check your subscription plan details
- Review your billing history in account settings
- Contact our billing department for assistance
        `
      },
      {
        id: 'contact-support',
        title: 'Contact Support',
        content: `
# Contact Support

If you're experiencing issues that aren't covered in our documentation, our support team is here to help.

## Support Channels

- **Email Support**: support@facefusion.com
- **Live Chat**: Available on weekdays, 9 AM - 5 PM EST
- **Help Center**: Browse our knowledge base at help.facefusion.com
- **Community Forum**: Connect with other users at community.facefusion.com

## What to Include

When contacting support, please include:

- Your account email address
- Detailed description of the issue
- Steps to reproduce the problem
- Screenshots or error messages (if applicable)
- Device and browser information

Our support team typically responds within 24 hours on business days.
        `
      }
    ]
  }
];

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [activeTopic, setActiveTopic] = useState('introduction');

  // Filter documentation based on search query
  const filteredDocs = searchQuery 
    ? docCategories.map(category => ({
        ...category,
        content: category.content.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.content.length > 0)
    : docCategories;

  // Find the active topic content
  const activeTopicContent = activeCategory && activeTopic
    ? docCategories
        .find(cat => cat.id === activeCategory)
        ?.content.find(topic => topic.id === activeTopic)
        ?.content || ''
    : '';

  // Convert markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mb-4 mt-2">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mb-3 mt-6">{line.substring(3)}</h2>;
      } else if (line.startsWith('- **')) {
        const parts = line.split('**');
        return (
          <div key={index} className="flex gap-2 mb-2">
            <div className="text-primary">•</div>
            <div>
              <span className="font-semibold">{parts[1]}</span>
              {parts[2]}
            </div>
          </div>
        );
      } else if (line.startsWith('**Problem**')) {
        return <p key={index} className="font-semibold text-yellow-400 mt-4 mb-1">{line}</p>;
      } else if (line.startsWith('**Solution**')) {
        return <p key={index} className="font-semibold text-green-400 mb-1">{line}</p>;
      } else if (line.startsWith('```')) {
        return null; // Handle code blocks separately
      } else if (line.startsWith('`') && line.endsWith('`') && !line.includes('```')) {
        // Inline code
        return <code key={index} className="px-1 py-0.5 rounded bg-secondary/50 text-sm font-mono">{line.substring(1, line.length - 1)}</code>;
      } else if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      } else {
        return <p key={index} className="mb-2">{line}</p>;
      }
    });
  };

  // Extract and render code blocks
  const renderCodeBlocks = (content: string) => {
    const codeBlocks = [];
    let inCodeBlock = false;
    let currentBlock = '';
    let language = '';
    let blockIndex = 0;

    content.split('\n').forEach(line => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          language = line.substring(3).trim();
          currentBlock = '';
        } else {
          codeBlocks.push({ code: currentBlock, language, index: blockIndex++ });
          inCodeBlock = false;
        }
      } else if (inCodeBlock) {
        currentBlock += line + '\n';
      }
    });

    return codeBlocks.map(block => (
      <div key={block.index} className="my-4 rounded-md overflow-hidden">
        <div className="bg-secondary/80 px-4 py-2 text-xs font-mono text-muted-foreground">
          {block.language}
        </div>
        <pre className="p-4 bg-secondary/40 overflow-x-auto">
          <code className="text-sm font-mono">{block.code}</code>
        </pre>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Documentation</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to know about using FaceFusion Insights
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search documentation..."
                className="pl-10 py-6 bg-secondary/30 border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Documentation Content */}
      <section className="py-8 md:py-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <nav className="space-y-1">
                  {filteredDocs.map((category) => (
                    <Accordion 
                      key={category.id} 
                      type="single" 
                      collapsible
                      defaultValue={category.id === activeCategory ? category.id : undefined}
                    >
                      <AccordionItem value={category.id} className="border-b-0">
                        <AccordionTrigger 
                          className={`py-2 px-3 rounded-lg text-sm font-medium flex items-center ${
                            category.id === activeCategory 
                              ? 'bg-primary/20 text-primary' 
                              : 'hover:bg-secondary/50'
                          }`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            <span>{category.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="ml-7 space-y-1 mt-1">
                            {category.content.map((topic) => (
                              <button
                                key={topic.id}
                                className={`w-full text-left py-1.5 px-3 rounded-lg text-sm ${
                                  activeTopic === topic.id
                                    ? 'text-primary font-medium'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                                onClick={() => {
                                  setActiveCategory(category.id);
                                  setActiveTopic(topic.id);
                                }}
                              >
                                {topic.title}
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div 
                className="glass rounded-xl p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={activeTopic} // Re-animate when topic changes
              >
                {searchQuery ? (
                  // Search results
                  <>
                    <h2 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
                    {filteredDocs.length === 0 ? (
                      <p className="text-muted-foreground">No results found. Try a different search term.</p>
                    ) : (
                      filteredDocs.map(category => (
                        <div key={category.id} className="mb-8">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            <span>{category.title}</span>
                          </h3>
                          <div className="space-y-4 ml-8">
                            {category.content.map(topic => (
                              <div key={topic.id} className="p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                <button
                                  className="text-lg font-medium text-primary mb-2 hover:underline text-left"
                                  onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory(category.id);
                                    setActiveTopic(topic.id);
                                  }}
                                >
                                  {topic.title}
                                </button>
                                <p className="text-muted-foreground text-sm line-clamp-2">
                                  {topic.content.split('\n').filter(line => !line.startsWith('#') && line.trim() !== '').slice(0, 1)}...
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </>
                ) : (
                  // Regular documentation view
                  <div className="prose prose-invert max-w-none">
                    {renderContent(activeTopicContent)}
                    {renderCodeBlocks(activeTopicContent)}
                  </div>
                )}
                
                {/* Navigation buttons */}
                {!searchQuery && (
                  <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => {
                        const currentCategory = docCategories.find(c => c.id === activeCategory);
                        if (currentCategory) {
                          const currentTopicIndex = currentCategory.content.findIndex(t => t.id === activeTopic);
                          if (currentTopicIndex > 0) {
                            setActiveTopic(currentCategory.content[currentTopicIndex - 1].id);
                          } else {
                            const prevCategoryIndex = docCategories.findIndex(c => c.id === activeCategory) - 1;
                            if (prevCategoryIndex >= 0) {
                              const prevCategory = docCategories[prevCategoryIndex];
                              setActiveCategory(prevCategory.id);
                              setActiveTopic(prevCategory.content[prevCategory.content.length - 1].id);
                            }
                          }
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
                        <path d="m12 19-7-7 7-7"/>
                        <path d="M19 12H5"/>
                      </svg>
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => {
                        const currentCategory = docCategories.find(c => c.id === activeCategory);
                        if (currentCategory) {
                          const currentTopicIndex = currentCategory.content.findIndex(t => t.id === activeTopic);
                          if (currentTopicIndex < currentCategory.content.length - 1) {
                            setActiveTopic(currentCategory.content[currentTopicIndex + 1].id);
                          } else {
                            const nextCategoryIndex = docCategories.findIndex(c => c.id === activeCategory) + 1;
                            if (nextCategoryIndex < docCategories.length) {
                              const nextCategory = docCategories[nextCategoryIndex];
                              setActiveCategory(nextCategory.id);
                              setActiveTopic(nextCategory.content[0].id);
                            }
                          }
                        }
                      }}
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Help Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                <Terminal className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Visit Help Center
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Documentation;
