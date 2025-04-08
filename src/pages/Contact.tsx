import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2,
  Clock,
  Users,
  HelpCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({
      ...prev,
      inquiryType: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Us",
      description: "Our team will respond within 24 hours",
      value: "contact@facefusion.com",
      link: "mailto:contact@facefusion.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Us",
      description: "Mon-Fri from 9AM to 5PM EST",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Visit Us",
      description: "Our headquarters location",
      value: "123 AI Boulevard, Tech City, CA 94103",
      link: "https://maps.google.com/?q=123+AI+Boulevard,+Tech+City,+CA+94103"
    }
  ];

  const faqItems = [
    {
      question: "How quickly will I receive a response?",
      answer: "Our team typically responds to all inquiries within 24 business hours. For urgent matters, please indicate so in your message subject."
    },
    {
      question: "Can I schedule a demo of your platform?",
      answer: "Yes! Select 'Request a Demo' from the inquiry type dropdown, and our sales team will reach out to schedule a personalized demonstration."
    },
    {
      question: "Do you offer technical support via this contact form?",
      answer: "While you can submit initial technical questions here, existing customers should use our dedicated support portal for faster assistance with technical issues."
    },
    {
      question: "I'm interested in partnership opportunities. Who should I contact?",
      answer: "Please select 'Business Partnership' from the inquiry type dropdown, and our business development team will get in touch with you."
    }
  ];

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Information Cards */}
      <section className="py-8">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <a 
                  href={item.link} 
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                  target={item.title === "Visit Us" ? "_blank" : undefined}
                  rel={item.title === "Visit Us" ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form and FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="bg-secondary/30 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="bg-secondary/30 border-white/10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="inquiryType" className="text-sm font-medium">
                          Inquiry Type
                        </label>
                        <Select
                          value={formState.inquiryType}
                          onValueChange={handleSelectChange}
                        >
                          <SelectTrigger className="bg-secondary/30 border-white/10">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="sales">Sales Question</SelectItem>
                            <SelectItem value="demo">Request a Demo</SelectItem>
                            <SelectItem value="partnership">Business Partnership</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help you?"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="bg-secondary/30 border-white/10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please provide details about your inquiry..."
                          required
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          className="bg-secondary/30 border-white/10 resize-none"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="glass p-5 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                      >
                        <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                        <p className="text-muted-foreground text-sm">{item.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="glass p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Our Support Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 5:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 2:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <p className="text-sm text-muted-foreground">
                      For urgent matters outside of business hours, please email 
                      <a href="mailto:urgent@facefusion.com" className="text-primary ml-1">
                        urgent@facefusion.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="glass p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Enterprise Support
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Enterprise customers receive priority support with dedicated account managers and faster response times.
                  </p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Learn About Enterprise Plans
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="glass p-4 rounded-xl overflow-hidden">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                {/* Replace with actual Google Maps embed */}
                <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-4" />
                    <p className="text-lg font-medium">Map Placeholder</p>
                    <p className="text-sm text-muted-foreground">
                      123 AI Boulevard, Tech City, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
