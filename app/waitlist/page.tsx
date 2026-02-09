"use client"

import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import {
  Car,
  ShieldCheck,
  Tag,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function CarZoneWaitlist() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to join waitlist");
      }
      
      const data = await response.json();
      toast.success(data.message || "You're on the list!");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] relative overflow-hidden font-inter">
      <Toaster position="top-center" />

      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-blue-100/20 via-blue-50/10 to-transparent dark:from-blue-900/10 dark:via-blue-800/5 dark:to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-blue-100/20 via-blue-50/10 to-transparent dark:from-blue-900/10 dark:via-blue-800/5 dark:to-transparent rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center h-8 px-4 mb-8 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
            Coming Soon 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
            The next generation <br />
            <span className="text-blue-600">car marketplace</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
            Experience the smoothest way to buy and sell cars. Join our
            exclusive waitlist to get early access to thousands of verified
            vehicles.
          </p>

          <form
            id="waitlist-form"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-16 relative"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-all text-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="h-14 px-8 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Join Waitlist <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-[#121212] bg-slate-200 dark:bg-slate-800 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Join{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                12,480+
              </span>{" "}
              car enthusiasts already waiting
            </p>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section id="benefits" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why CarZone?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We're changing how the world interacts with cars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Car className="text-blue-600" />}
              title="Massive Selection"
              description="Access to a curated list of thousands of cars from economy to luxury, all in one place."
            />
            <BenefitCard
              icon={<ShieldCheck className="text-blue-600" />}
              title="Verified Sellers"
              description="Every seller and vehicle undergoes a rigorous 150-point inspection before listing."
            />
            <BenefitCard
              icon={<Tag className="text-blue-600" />}
              title="Best Price Guarantee"
              description="Transparent pricing with no hidden fees. Get the best market value for your trade-in."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 font-space-grotesk font-bold text-xl text-black dark:text-white mb-6">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Car size={14} className="text-white" />
            </div>
            CarZone
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 CarZone Technologies Inc. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

interface BenefitCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
