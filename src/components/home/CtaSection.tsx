
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary/10">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-2xl text-center overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 shimmer"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Ready to Discover Your Facial Heritage?</h2>
          <p className="text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of users who have unlocked the secrets of their facial ancestry. Start your journey today with our free basic analysis.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                Create Free Account
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/20 hover:bg-primary/5">
                Try Demo Analysis
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
