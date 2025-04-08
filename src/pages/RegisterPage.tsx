
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthForm } from "@/components/AuthForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <AuthForm type="register" />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
