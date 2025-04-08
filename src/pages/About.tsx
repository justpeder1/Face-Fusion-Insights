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
  Globe, 
  Brain, 
  BarChart3, 
  Users, 
  Lock, 
  Award
} from 'lucide-react';

export const AboutTeamMember = ({ 
  name, 
  role, 
  image 
}: { 
  name: string; 
  role: string; 
  image: string 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/20 shadow-lg">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-muted-foreground text-sm">{role}</p>
    </motion.div>
  );
};

export const AboutValueCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType 
}) => {
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
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 bg-primary/10 p-2 rounded-lg">
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

const About = () => {
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
              About <span className="text-gradient">Face Fusion</span> Insights
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Empowering people to understand their facial characteristics and ethnic origins through advanced AI technology.
            </motion.p>
            
            <motion.div 
              className="relative h-[200px] md:h-[300px] overflow-hidden rounded-2xl shadow-xl mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <img 
                src={imgCyberneticPortrait} 
                alt="Facial Recognition Technology" 
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-purple-500/50 mix-blend-multiply"></div>
              
              <motion.div 
                className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-[1px] opacity-10 mix-blend-screen pointer-events-none"
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-full h-full bg-white/50 rounded-sm"></div>
                ))}
              </motion.div>
              
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">Our Mission</h2>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
              <motion.div 
                className="md:col-span-3 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="leading-relaxed">
                  Face Fusion Insights was born from a desire to help people understand their unique facial characteristics and what they reveal about their ethnic ancestry. We believe that modern AI technology can provide fascinating insights into our diverse backgrounds.
                </p>
                
                <p className="leading-relaxed">
                  Our team of data scientists, AI engineers, and anthropologists came together in 2023 to create a platform that combines cutting-edge facial analysis technology with scientific research on ethnic facial characteristics.
                </p>
                
                <p className="leading-relaxed">
                  What started as a research project has evolved into a comprehensive platform that provides detailed analysis of facial features, helping users discover their potential ethnic origins through non-invasive, AI-powered technology.
                </p>
              </motion.div>
              
              <motion.div 
                className="md:col-span-2 relative h-[300px] md:h-full rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={imgFacialRecognition1} 
                  alt="AI Facial Recognition" 
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </motion.div>
            </div>
            
            <motion.div 
              className="py-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <blockquote className="pl-4 border-l-4 border-primary italic text-muted-foreground">
                "Our mission is to celebrate human diversity and help people connect with their ancestral roots through innovative technology that's accessible to everyone."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AboutValueCard 
              title="Accuracy & Precision" 
              description="We're committed to providing the most accurate analysis possible by continuously improving our AI models with diverse training data."
              icon={BarChart3}
            />
            
            <AboutValueCard 
              title="Celebrating Diversity" 
              description="We believe in the beauty of human diversity and aim to help people appreciate the rich tapestry of ethnic characteristics that make us unique."
              icon={Globe}
            />
            
            <AboutValueCard 
              title="Scientific Approach" 
              description="Our technology is based on scientific research in anthropology, genetics, and computer vision to ensure reliable results."
              icon={Brain}
            />
            
            <AboutValueCard 
              title="Accessibility" 
              description="We strive to make our technology accessible to everyone, regardless of technical knowledge or background."
              icon={Users}
            />
            
            <AboutValueCard 
              title="Privacy & Security" 
              description="We take data protection seriously and ensure that all user data is securely stored and never shared without explicit permission."
              icon={Lock}
            />
            
            <AboutValueCard 
              title="Continuous Improvement" 
              description="We're dedicated to constantly enhancing our technology and expanding our knowledge base to provide even better insights."
              icon={Award}
            />
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Technology
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gradient">Advanced AI Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  Our platform uses state-of-the-art deep learning algorithms specifically trained on diverse datasets to identify and analyze facial features with exceptional accuracy.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Facial landmark detection with 98.5% accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Analysis of over 500 distinct facial characteristics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Continuous learning from a growing dataset of global ethnicities</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="order-1 md:order-2 relative rounded-2xl overflow-hidden shadow-lg h-[250px] md:h-[350px]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={imgFacialRecognition2} 
                  alt="AI Facial Recognition Technology" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-primary/50"
                  animate={{ 
                    y: [0, 350, 0], 
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
           
      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have questions about our technology or want to learn more? Our team is always ready to help.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="mailto:contact@facefusioninsights.com" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About; 