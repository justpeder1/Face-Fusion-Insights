import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, X, CreditCard, Zap, Shield, Award, Globe, Users, BadgeCheck } from 'lucide-react';

// Import assets
import imgCyberneticPortrait from '@/assets/StockCake-Cybernetic Aesthetic Portrait_1744052452.jpg';

interface PricingFeatureProps {
  feature: string;
  free: boolean;
  premium: boolean;
  enterprise: boolean;
}

const PricingFeature = ({ feature, free, premium, enterprise }: PricingFeatureProps) => {
  return (
    <div className="grid grid-cols-4 py-3 border-b border-white/10 last:border-b-0">
      <div className="col-span-1 text-sm">{feature}</div>
      <div className="col-span-1 flex justify-center">
        {free ? (
          <Check className="w-5 h-5 text-primary" />
        ) : (
          <X className="w-5 h-5 text-muted-foreground/50" />
        )}
      </div>
      <div className="col-span-1 flex justify-center">
        {premium ? (
          <Check className="w-5 h-5 text-primary" />
        ) : (
          <X className="w-5 h-5 text-muted-foreground/50" />
        )}
      </div>
      <div className="col-span-1 flex justify-center">
        {enterprise ? (
          <Check className="w-5 h-5 text-primary" />
        ) : (
          <X className="w-5 h-5 text-muted-foreground/50" />
        )}
      </div>
    </div>
  );
};

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  linkText = "Get Started",
  link = "/register"
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  linkText?: string;
  link?: string;
}) => {
  return (
    <motion.div 
      className={`rounded-2xl p-6 md:p-8 shadow-xl ${isPopular ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/30 border border-white/10'} overflow-hidden relative h-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {isPopular && (
        <div className="absolute top-5 right-5 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
          POPULAR
        </div>
      )}
      
      {isPopular && (
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      )}
      
      <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl md:text-4xl font-bold">{price}</span>
        {price !== "Custom" && <span className="text-muted-foreground text-sm ml-1">/ month</span>}
      </div>
      
      <p className="text-muted-foreground mb-6 text-sm">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="mt-auto"
        >
          <a 
            href={link}
            className={`inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-colors ${
              isPopular 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'border border-primary bg-transparent text-primary hover:bg-primary/10'
            }`}
          >
            {linkText}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role,
  delay = 0
}: {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}) => {
  return (
    <motion.div 
      className="bg-secondary/20 border border-white/5 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="mb-4 text-primary">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg">★</span>
        ))}
      </div>
      <p className="text-muted-foreground mb-6 italic">"{quote}"</p>
      <div>
        <h4 className="font-bold">{author}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </motion.div>
  );
};

const FeatureHighlight = ({
  icon: Icon,
  title,
  description,
  delay = 0
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Pricing = () => {
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
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Choose the perfect plan for your facial analysis needs with no hidden fees
            </motion.p>
            
            <motion.div 
              className="inline-flex items-center rounded-full border border-primary/20 p-1 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Monthly Billing
              </button>
              <button className="px-5 py-2 rounded-full text-sm font-medium">
                Annual Billing (Save 20%)
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Pricing Cards Section */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard 
              title="Free"
              price="$0"
              description="Perfect for trying out our platform and exploring basic features."
              features={[
                "Basic facial analysis",
                "3 image uploads per month",
                "Basic ethnic origin report",
                "Single user account",
                "Community support"
              ]}
              linkText="Sign Up Free"
            />
            
            <PricingCard 
              title="Premium"
              price="$9.99"
              description="Our most popular plan for individuals seeking comprehensive analysis."
              features={[
                "Advanced facial analysis",
                "Unlimited image uploads",
                "Detailed ethnic breakdown reports",
                "Historical migration patterns",
                "Export to PDF and other formats",
                "Priority email support"
              ]}
              isPopular={true}
              linkText="Get Premium"
            />
            
            <PricingCard 
              title="Enterprise"
              price="Custom"
              description="For organizations needing advanced features and dedicated support."
              features={[
                "All Premium features",
                "API access",
                "Multiple user accounts",
                "Custom integration options",
                "Advanced data analytics",
                "Dedicated account manager",
                "24/7 priority support"
              ]}
              linkText="Contact Sales"
              link="/contact"
            />
          </div>
        </div>
      </section>
      
      {/* Feature Comparison Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Plans</h2>
              <p className="text-muted-foreground text-lg">
                Find the perfect plan for your needs with our detailed feature comparison
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/20 rounded-2xl p-6 md:p-8 shadow-xl overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="min-w-[600px]">
                {/* Header */}
                <div className="grid grid-cols-4 pb-4 border-b border-white/10 mb-4">
                  <div className="col-span-1 font-bold">Features</div>
                  <div className="col-span-1 font-bold text-center">Free</div>
                  <div className="col-span-1 font-bold text-center">Premium</div>
                  <div className="col-span-1 font-bold text-center">Enterprise</div>
                </div>
                
                {/* Features */}
                <div className="space-y-0">
                  <PricingFeature feature="Facial Analysis" free={true} premium={true} enterprise={true} />
                  <PricingFeature feature="Basic Ethnic Detection" free={true} premium={true} enterprise={true} />
                  <PricingFeature feature="Detailed Ethnic Breakdown" free={false} premium={true} enterprise={true} />
                  <PricingFeature feature="Historical Context" free={false} premium={true} enterprise={true} />
                  <PricingFeature feature="Image Upload Limit" free={false} premium={true} enterprise={true} />
                  <PricingFeature feature="Export Reports (PDF)" free={false} premium={true} enterprise={true} />
                  <PricingFeature feature="API Access" free={false} premium={false} enterprise={true} />
                  <PricingFeature feature="Multiple Users" free={false} premium={false} enterprise={true} />
                  <PricingFeature feature="Custom Integration" free={false} premium={false} enterprise={true} />
                  <PricingFeature feature="Priority Support" free={false} premium={true} enterprise={true} />
                  <PricingFeature feature="Dedicated Account Manager" free={false} premium={false} enterprise={true} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.div 
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Face Fusion Insights</h2>
            <p className="text-muted-foreground text-lg">
              We offer unmatched value with our cutting-edge technology and comprehensive features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
            <FeatureHighlight 
              icon={Globe}
              title="Global Database"
              description="Access to the most comprehensive ethnic database with over 300 distinct groups"
              delay={0}
            />
            
            <FeatureHighlight 
              icon={Shield}
              title="Privacy First"
              description="Your data security is our priority with state-of-the-art encryption"
              delay={1}
            />
            
            <FeatureHighlight 
              icon={Zap}
              title="Instant Results"
              description="Get detailed analysis within seconds instead of waiting for days"
              delay={2}
            />
            
            <FeatureHighlight 
              icon={Users}
              title="Expert Support"
              description="Access to anthropologists and AI specialists for any questions"
              delay={3}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.div 
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied users who have discovered their ancestry with Face Fusion Insights
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TestimonialCard 
              quote="I was amazed at how accurate the ethnic analysis was. It correctly identified my mixed European and Asian heritage down to specific regions!"
              author="Sarah Thompson"
              role="Premium User"
              delay={0}
            />
            
            <TestimonialCard 
              quote="The detailed reports are incredible. I've been able to trace my ancestry back through generations and discover origins I never knew about."
              author="Michael Chen"
              role="Premium User"
              delay={1}
            />
            
            <TestimonialCard 
              quote="As a researcher, I needed the enterprise plan for our anthropology department. The API access and multi-user features have been invaluable."
              author="Dr. Amara Johnson"
              role="Enterprise Customer"
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.div 
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Get answers to common questions about our pricing and features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="bg-secondary/20 border border-white/5 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-3">Can I change plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll immediately get access to all the new features. When downgrading, changes will take effect at the start of your next billing cycle.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/20 border border-white/5 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold mb-3">Is there a free trial for Premium?</h3>
              <p className="text-muted-foreground">
                We offer a 7-day free trial of our Premium plan with all features unlocked. No credit card is required for the trial. You can sign up and experience the full power of our platform before making a decision.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/20 border border-white/5 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-3">How accurate are the ethnic analyses?</h3>
              <p className="text-muted-foreground">
                Our Premium and Enterprise plans use our most advanced AI models with 90%+ accuracy rates. The Free plan uses a more basic model with approximately 75% accuracy. For the most detailed and accurate results, we recommend the Premium plan.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/20 border border-white/5 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold mb-3">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. For Enterprise customers, we also offer invoice payment options with net-30 terms.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <motion.div 
                className="relative h-[250px] md:h-[300px] overflow-hidden rounded-2xl shadow-xl mb-12"
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
                    <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Start Your Ancestry Journey Today</h2>
                    <p className="text-white/90 text-lg mb-6">Try our platform for free or choose the plan that's right for you</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <a 
                          href="/register"
                          className="inline-flex items-center justify-center rounded-md bg-white text-primary px-8 py-3 text-base font-medium hover:bg-white/90 transition-colors shadow-lg w-full sm:w-auto"
                        >
                          Start Free Trial
                        </a>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <a 
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-md bg-transparent border border-white text-white px-8 py-3 text-base font-medium hover:bg-white/10 transition-colors w-full sm:w-auto"
                        >
                          Contact Sales
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-8 border-t border-white/10">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-muted-foreground">
              All plans include our standard data privacy protections and secure payment processing. 
              For questions about custom plans or special requirements, please <a href="/contact" className="text-primary hover:underline">contact our sales team</a>.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing; 