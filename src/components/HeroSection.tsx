"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Timer, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [signupCount, setSignupCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Real people photos from generated images
  const peoplePhotos = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-06420f8f-20250827111558.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-7a9e0b3b-20250827111609.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-60c065e8-20250827111619.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-c783606d-20250827111632.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-21584ec2-20250827111642.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-3cb5502a-20250827111653.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-79bd31fa-20250827111705.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/69acd074-6f72-4d76-bbb3-0a3a5b8c412f/generated_images/professional-headshot-portrait-of-a-youn-18e5d76b-20250827111718.jpg"];


  // Fetch initial signup count from API
  useEffect(() => {
    const fetchSignupCount = async () => {
      try {
        const response = await fetch('/api/waitlist?count=true');
        if (response.ok) {
          const data = await response.json();
          setSignupCount(data.count || 0);
        }
      } catch (error) {
        console.error('Failed to fetch signup count:', error);
        setSignupCount(1247); // Fallback count
      }
    };

    fetchSignupCount();
  }, []);

  // Calculate time until launch (example: 30 days from now)
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
          minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
          seconds: Math.floor(distance % (1000 * 60) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setSignupCount((prev) => prev + 1);
        toast.success('Welcome to the waitlist! You\'ll hear from us soon.');
        setEmail('');

        // Reset success state after animation
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        // Handle specific error codes
        if (data.code === 'DUPLICATE_EMAIL') {
          toast.error('You\'re already on our waitlist! We\'ll notify you when we launch.');
        } else if (data.code === 'INVALID_EMAIL_FORMAT') {
          toast.error('Please enter a valid email address');
        } else {
          toast.error(data.error || 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email, validateEmail]);

  const userAvatars = peoplePhotos.map((photoUrl, i) =>
  <motion.div
    key={i}
    className="relative w-10 h-10 rounded-full border-2 border-ring/30 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    style={{
      marginLeft: i > 0 ? '-0.75rem' : '0',
      zIndex: 8 - i
    }}
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: i * 0.1,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{
      scale: 1.1,
      zIndex: 20,
      y: -2,
      transition: { duration: 0.2 }
    }}>

      <img
      src={photoUrl}
      alt={`Waitlist member ${i + 1}`}
      className="w-full h-full object-cover"
      loading="lazy" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
    </motion.div>
  );

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className={`relative py-20 md:py-32 overflow-hidden ${className || ''}`}>
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}>

              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                Energize Anywhere,
              </span>
              <br />
              <span className="bg-gradient-to-br from-ring via-ring to-ring/80 bg-clip-text text-transparent">
                Instantly.
              </span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mx-auto lg:mx-0 leading-relaxed !w-[576px] !h-[98px] !max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>

              Revolutionary energy gum that delivers instant focus and vitality when you need it most. 
              Join thousands waiting for the future of portable energy.
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              className="space-y-6 !w-[143.1%] !h-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mx-auto lg:mx-0 !w-[448px] !h-14 !max-w-md">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isSuccess}
                    className="h-14 text-base bg-card border-border focus:border-ring transition-colors" />

                </div>
                <Button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="h-14 px-8 bg-ring hover:bg-ring/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-50">

                  {isLoading ?
                  <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Joining...
                    </div> :
                  isSuccess ?
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}>

                      <Check className="w-4 h-4" />
                      Joined!
                    </motion.div> :

                  'Join Waitlist'
                  }
                </Button>
              </form>

              {/* Social Proof with Real Photos */}
              <motion.div
                className="flex flex-col items-center lg:items-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}>

                <div className="flex items-center justify-center lg:justify-start">
                  {userAvatars}
                </div>
                <motion.p
                  className="text-muted-foreground"
                  key={signupCount}
                  initial={{ opacity: 0.7, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}>

                  <span className="font-semibold text-foreground">
                    {signupCount.toLocaleString()}+
                  </span>
                  {' '}people have already joined the waitlist
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              className="max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}>

              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Timer className="w-5 h-5 text-ring" />
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Launch Countdown
                </h3>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }].
                map((item, index) =>
                <motion.div
                  key={item.label}
                  className="bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-2 hover:border-ring/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}>

                    <motion.div
                    className="text-2xl md:text-3xl font-heading font-bold text-ring tabular-nums"
                    key={item.value}
                    initial={{ opacity: 0.8, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}>

                      {item.value.toString().padStart(2, '0')}
                    </motion.div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                      {item.label}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Product Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}>

            <motion.div
              animate={floatAnimation}
              className="relative group">

              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-ring/20 to-purple-900/30 rounded-3xl blur-3xl scale-110 !w-[49.7%] !h-5" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-ring/10 to-transparent rounded-3xl" />
              
              {/* Product Image Container */}
              <div className="relative bg-gradient-to-br from-card/20 to-card/10 backdrop-blur-sm rounded-3xl p-8 border border-border/20 !opacity-0 !opacity-100 !w-[99.9%] !h-full !opacity-0">
                <div className="relative aspect-square mx-auto !opacity-0 !w-[11925%] !h-5 !max-w-[11925%]">
                  <img
                    src=""
                    alt="Caffiq Energy Gum - Premium black box with blue caffeinated gum tablets and sleek packaging design"
                    className="object-contain rounded-2xl transition-all duration-500 group-hover:scale-105 !opacity-100 !w-[81px] !h-5 !max-w-[81px]" />

                  
                  {/* Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-2xl pointer-events-none" />
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-ring/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 !w-[382px] !h-5" />
                </div>
                
                {/* Floating Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/20 rounded-full blur-xl" />
              </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ring/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>);

}