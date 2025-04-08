
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className, 
  style,
  delay = 0 
}: FeatureCardProps) => {
  return (
    <motion.div 
      className={cn("glass p-6 rounded-xl hover:shadow-lg transition-all", className)}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};
