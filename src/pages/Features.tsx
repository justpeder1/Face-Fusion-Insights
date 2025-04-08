import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Import assets
import imgFacialRecognition1 from '@/assets/StockCake-Futuristic Facial Recognition_1744052564.jpg';
import imgFacialRecognition2 from '@/assets/StockCake-Futuristic facial recognition_1744052509.jpg';
import imgCyberneticPortrait from '@/assets/StockCake-Cybernetic Aesthetic Portrait_1744052452.jpg';

// Import icons
import { 
  Sparkles, 
  BarChart3, 
  Globe,
  Share2, 
  FileText, 
  History,
  Shield,
  Lock,
  Zap,
  Database,
  LineChart,
  UserCheck
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg?: string;
  delay?: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon,
  iconBg = "bg-primary/10",
  delay = 0
}: FeatureCardProps) => {
  return (
    <motion.div 
      className="p-6 rounded-2xl bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all shadow-lg"
      whileHover={{ 
        y: -5, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 } 
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="flex items-start gap-4">
        <div className={`mt-1 ${iconBg} p-2 rounded-lg`}>
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ComparisonFeature = ({
  title,
  description,
  isHighlighted = false
}: {
  title: string;
  description: string;
  isHighlighted?: boolean;
}) => {
  return (
    <motion.div 
      className={`p-5 rounded-xl ${isHighlighted ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/20 border border-white/5'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={`text-lg font-bold mb-2 ${isHighlighted ? 'text-primary' : ''}`}>{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Advanced <span className="text-gradient">Features</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Discover the powerful capabilities of our AI-powered facial analysis platform
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="relative p-6 rounded-2xl bg-secondary/40 border border-white/10 shadow-xl group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">Advanced facial recognition with deep learning algorithms</p>
              </div>
              
              <div className="relative p-6 rounded-2xl bg-secondary/40 border border-white/10 shadow-xl group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BarChart3 className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Detailed Insights</h3>
                <p className="text-muted-foreground">Comprehensive reports on facial features and ethnic origins</p>
              </div>
              
              <div className="relative p-6 rounded-2xl bg-secondary/40 border border-white/10 shadow-xl group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Globe className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
                <p className="text-muted-foreground">Analyze facial traits across all major ethnic groups worldwide</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground text-lg">
                Our platform combines cutting-edge technology with user-friendly design to provide a comprehensive facial analysis experience.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                title="Facial Recognition" 
                description="Advanced facial detection and mapping with high-precision landmark identification."
                icon={UserCheck}
                delay={0}
              />
              
              <FeatureCard 
                title="Ethnic Analysis" 
                description="Identify potential ethnic backgrounds based on facial characteristics and structural patterns."
                icon={Globe}
                delay={1}
              />
              
              <FeatureCard 
                title="Historical Context" 
                description="Explore the historical migration patterns and ethnic distributions related to your results."
                icon={History}
                delay={2}
              />
              
              <FeatureCard 
                title="Detailed Reports" 
                description="Get comprehensive PDF reports with detailed breakdowns of your facial characteristics analysis."
                icon={FileText}
                delay={3}
              />
              
              <FeatureCard 
                title="Social Sharing" 
                description="Share your results with friends and family across multiple social platforms."
                icon={Share2}
                delay={4}
              />
              
              <FeatureCard 
                title="Multi-Angle Analysis" 
                description="Upload multiple photos from different angles for more accurate and comprehensive results."
                icon={Zap}
                delay={5}
              />
              
              <FeatureCard 
                title="Data Security" 
                description="Advanced encryption and security measures to protect your personal data and photos."
                icon={Shield}
                delay={6}
              />
              
              <FeatureCard 
                title="Privacy Controls" 
                description="Full control over how your data is used with easy opt-out options at any time."
                icon={Lock}
                delay={7}
              />
              
              <FeatureCard 
                title="Comparative Analysis" 
                description="Compare your results with global averages and see how your features align with different ethnic groups."
                icon={BarChart3}
                delay={8}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Demo Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Interactive Demo</h2>
                <p className="text-muted-foreground mb-6">
                  Experience our facial analysis technology with our interactive demo. Upload your photo and see the power of our AI in action.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p>Real-time facial feature detection</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p>Instant ethnic background analysis</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p>No account required for basic analysis</p>
                  </div>
                </div>
                
                <motion.div 
                  className="mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a 
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Try Demo Now
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] md:h-[400px]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={imgFacialRecognition2} 
                  alt="Demo Interface" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/0 opacity-70"></div>
                
                {/* Animated scan line */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-primary/70"
                  animate={{ 
                    y: [0, 400, 0], 
                    opacity: [0.7, 1, 0.7] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Facial recognition points */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-[280px] h-[280px] relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(138,43,226,0.8)]"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.2, 1], 
                          opacity: [0, 1, 0.8] 
                        }}
                        transition={{ 
                          delay: 0.8 + (i * 0.1), 
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Advanced Technology Section */}
      <section className="py-16 md:py-24 bg-secondary/10 overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.div 
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Technology</h2>
            <p className="text-muted-foreground text-lg">
              Our platform is built on state-of-the-art technologies that provide exceptional accuracy and performance.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
            <motion.div 
              className="flex gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Deep Learning Models</h3>
                <p className="text-muted-foreground">
                  Our AI models are trained on diverse datasets of over 10 million facial images across all ethnicities to ensure accurate analysis for everyone.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex gap-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-Time Processing</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms deliver instant results with detailed facial mapping and ethnic analysis in seconds, not minutes.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Privacy-First Architecture</h3>
                <p className="text-muted-foreground">
                  Your photos are processed securely and never stored without permission. Our architecture ensures your data remains private and protected.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex gap-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Global Ethnic Database</h3>
                <p className="text-muted-foreground">
                  Our reference database covers over 300 ethnic groups with detailed facial characteristics for each, allowing precise ancestral matching.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Feature Comparison Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Comparison</h2>
              <p className="text-muted-foreground text-lg">
                Choose the right plan for your needs with our flexible options
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="rounded-2xl p-8 bg-secondary/20 border border-white/10 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-muted-foreground mb-6">Perfect for trying out the platform</p>
                <div className="text-3xl font-bold mb-6">$0 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                
                <div className="space-y-4 mb-8">
                  <ComparisonFeature 
                    title="Basic Analysis" 
                    description="Access to basic facial analysis features" 
                    isHighlighted={true}
                  />
                  <ComparisonFeature 
                    title="Limited Reports" 
                    description="Basic analysis reports without detailed ethnic breakdown" 
                  />
                  <ComparisonFeature 
                    title="3 Image Uploads" 
                    description="Upload and analyze up to 3 images per month" 
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a 
                    href="/register"
                    className="inline-flex w-full items-center justify-center rounded-md border border-primary bg-transparent px-8 py-3 text-lg font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    Get Started
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="rounded-2xl p-8 bg-primary/5 border border-primary/20 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute top-5 right-5 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <p className="text-muted-foreground mb-6">Complete access to all features</p>
                <div className="text-3xl font-bold mb-6">$9.99 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                
                <div className="space-y-4 mb-8">
                  <ComparisonFeature 
                    title="Advanced Analysis" 
                    description="Full access to all facial analysis features and ethnic predictions" 
                    isHighlighted={true}
                  />
                  <ComparisonFeature 
                    title="Comprehensive Reports" 
                    description="Detailed PDF reports with complete ethnic breakdown and confidence scores" 
                    isHighlighted={true}
                  />
                  <ComparisonFeature 
                    title="Unlimited Images" 
                    description="Upload and analyze as many images as you want" 
                    isHighlighted={true}
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a 
                    href="/register"
                    className="inline-flex w-full items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Choose Premium
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <motion.div 
                className="relative h-[200px] md:h-[250px] overflow-hidden rounded-2xl shadow-xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={imgCyberneticPortrait} 
                  alt="Facial Analysis Technology" 
                  className="absolute w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-purple-500/60 mix-blend-multiply"></div>
                
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="max-w-lg px-4">
                    <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Ready to discover your ancestral origins?</h2>
                    <p className="text-white/90 text-lg mb-6">Start your facial analysis journey today</p>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      <a 
                        href="/register"
                        className="inline-flex items-center justify-center rounded-md bg-white text-primary px-8 py-3 text-lg font-medium hover:bg-white/90 transition-colors shadow-lg"
                      >
                        Get Started Now
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Features; 