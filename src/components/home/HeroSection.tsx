import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from 'lucide-react';

// Import the new assets
import imgFacialRecognition1 from '@/assets/StockCake-Futuristic Facial Recognition_1744052564.jpg';
import imgFacialRecognition2 from '@/assets/StockCake-Futuristic facial recognition_1744052509.jpg';
import imgCyberneticPortrait from '@/assets/StockCake-Cybernetic Aesthetic Portrait_1744052452.jpg';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef(null);
  const inView = useInView(imagesRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Image variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section ref={containerRef} className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Unveil Your <span className="text-gradient">Facial Ancestry</span> with Advanced AI
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Discover your ethnic origins, ancestral traits, and unique facial characteristics through our cutting-edge AI-powered facial analysis technology.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/20 hover:bg-primary/5">
                Try Demo
              </Button>
            </Link>
          </motion.div>
          
          {/* Images Showcase - Enhanced */}
          <motion.div 
            ref={imagesRef}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="mt-16 mb-8 relative"
          >
            <div className="grid grid-cols-12 gap-3 md:gap-5">
              <motion.div 
                className="col-span-12 md:col-span-4 relative z-10"
                variants={imageVariants}
                style={{ y: y1 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.4 }
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform-gpu h-[300px] md:h-[400px] group">
                  <img 
                    src={imgFacialRecognition1} 
                    alt="Futuristic Facial Recognition" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                  
                  {/* Animated scan line effect */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-1 bg-primary/50"
                    animate={{ 
                      y: [0, 300, 0], 
                      opacity: [0.5, 0.8, 0.5] 
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    <h3 className="text-white text-xl font-bold mb-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Advanced Recognition</h3>
                    <p className="text-white/80 text-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">State-of-the-art facial analysis technology</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-span-12 md:col-span-4 relative z-20 md:-mt-10" 
                variants={imageVariants}
                style={{ y: y2 }}
                whileHover={{ 
                  scale: 1.05, 
                  zIndex: 30,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.5 }
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform-gpu h-[300px] md:h-[450px] group">
                  <img 
                    src={imgCyberneticPortrait} 
                    alt="Cybernetic Aesthetic Portrait" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70"></div>
                  
                  {/* Animated particle effect */}
                  <div className="absolute inset-0 overflow-hidden opacity-30 mix-blend-screen">
                    <div className="firefly"></div>
                    <div className="firefly"></div>
                    <div className="firefly"></div>
                    <div className="firefly"></div>
                    <div className="firefly"></div>
                    <div className="firefly"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    <h3 className="text-white text-2xl font-bold mb-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Ancestry Analysis</h3>
                    <p className="text-white/80 text-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Discover your ethnic origins with precision</p>
                    <motion.div 
                      className="w-20 h-1 bg-primary/80 mt-3 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-span-12 md:col-span-4 relative z-10"
                variants={imageVariants}
                style={{ y: y3 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.4 }
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform-gpu h-[300px] md:h-[400px] group">
                  <img 
                    src={imgFacialRecognition2} 
                    alt="Futuristic Facial Recognition Technology" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                  
                  {/* Animated data grid effect */}
                  <motion.div 
                    className="absolute inset-0 grid grid-cols-8 grid-rows-12 gap-[1px] opacity-10 mix-blend-screen pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {Array.from({ length: 96 }).map((_, i) => (
                      <div key={i} className="w-full h-full bg-white/50 rounded-sm"></div>
                    ))}
                  </motion.div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    <h3 className="text-white text-xl font-bold mb-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Feature Detection</h3>
                    <p className="text-white/80 text-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Identify unique facial characteristics</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8 hidden md:flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <ArrowDownCircle className="w-10 h-10 text-primary/60 animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
