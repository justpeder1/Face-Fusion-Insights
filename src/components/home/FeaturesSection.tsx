
import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Layers, 
  Globe, 
  BarChart3, 
  ImageIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureCard } from "@/components/FeatureCard";

export const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
          <p className="text-muted-foreground">
            Our platform combines cutting-edge facial recognition with ethnicity analysis to provide accurate insights about your unique facial characteristics.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            title="Ethnic Origin Analysis" 
            description="Identify your potential ethnic backgrounds through advanced facial trait analysis algorithms."
            icon={Globe}
            delay={0}
          />
          <FeatureCard 
            title="Facial Feature Detection" 
            description="Analyze specific facial features including eyes, nose, mouth, and face shape to determine ancestral traits."
            icon={Layers}
            delay={1}
          />
          <FeatureCard 
            title="Detailed Reporting" 
            description="Receive comprehensive reports with detailed breakdowns of your facial characteristics and their ethnic indicators."
            icon={BarChart3}
            delay={2}
          />
          <FeatureCard 
            title="High Accuracy" 
            description="Our AI model has been trained on diverse datasets to ensure accurate analysis across all ethnicities."
            icon={ShieldCheck}
            delay={3}
          />
          <FeatureCard 
            title="Instant Results" 
            description="Get immediate analysis results with our fast-processing AI technology after uploading your image."
            icon={Zap}
            delay={4}
          />
          <FeatureCard 
            title="Multiple Image Analysis" 
            description="Upload and analyze multiple images to compare results and discover consistent patterns."
            icon={ImageIcon}
            delay={5}
          />
        </div>
      </div>
    </section>
  );
};
