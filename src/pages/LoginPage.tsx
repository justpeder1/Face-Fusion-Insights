
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthForm } from "@/components/AuthForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <AuthForm type="login" />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
