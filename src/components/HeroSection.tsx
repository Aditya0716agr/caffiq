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
    className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-ring/30 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    style={{
      marginLeft: i > 0 ? '-0.5rem' : '0',
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


  return (
    <section className={`relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden ${className || ''}`}>
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center">
            {/* Main Headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}>

              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent block">
                Energize Anywhere,
              </span>
              <span className="bg-gradient-to-br from-ring via-ring to-ring/80 bg-clip-text text-transparent block">
                Instantly.
              </span>
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>

              Revolutionary energy gum that delivers instant focus and vitality when you need it most. 
              Join thousands waiting for the future of portable energy.
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
                <div className="flex-1 w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isSuccess}
                    className="h-12 sm:h-14 text-sm sm:text-base bg-card border-border focus:border-ring transition-colors w-full" />

                </div>
                <Button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-ring hover:bg-ring/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-50 w-full sm:w-auto">

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
                className="flex flex-col items-center gap-3 sm:gap-4 px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}>

                <div className="flex items-center justify-center flex-wrap gap-1">
                  {userAvatars}
                </div>
                <motion.p
                  className="text-sm sm:text-base text-muted-foreground text-center"
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
              className="max-w-lg mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}>

              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <Timer className="w-5 h-5 text-ring" />
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Launch Countdown
                </h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }].
                map((item, index) =>
                <motion.div
                  key={item.label}
                  className="bg-card border border-border rounded-lg p-3 sm:p-4 flex flex-col items-center gap-1 sm:gap-2 hover:border-ring/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}>

                    <motion.div
                    className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-ring tabular-nums"
                    key={item.value}
                    initial={{ opacity: 0.8, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}>

                      {item.value.toString().padStart(2, '0')}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                      {item.label}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}