
import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  image?: string;
  className?: string;
}

export const TestimonialCard = ({ content, author, role, image, className }: TestimonialCardProps) => {
  return (
    <div className={cn("glass p-6 rounded-xl", className)}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-2 opacity-80">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
          <p className="text-foreground/90 italic">{content}</p>
        </div>
        <div className="mt-auto flex items-center">
          {image && (
            <div className="mr-3">
              <img src={image} alt={author} className="h-10 w-10 rounded-full object-cover" />
            </div>
          )}
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
