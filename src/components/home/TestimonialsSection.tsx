
import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from "@/components/TestimonialCard";

export const TestimonialsSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground">
            Discover how FaceFusion Insights has helped users connect with their heritage.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <TestimonialCard 
              content="I've always been curious about my mixed heritage. FaceFusion gave me detailed insights that matched what I knew about my ancestry and revealed some surprises too!"
              author="Sarah Johnson"
              role="Premium User"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TestimonialCard 
              content="As an adoptee with no information about my biological family, this tool gave me my first clues about my potential ethnic background. It was emotional and enlightening."
              author="Michael Chen"
              role="Basic User"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <TestimonialCard 
              content="The accuracy was impressive! The results aligned perfectly with my known ancestry, even detecting the small percentage of Eastern European heritage I have."
              author="Amara Okafor"
              role="Premium User"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
