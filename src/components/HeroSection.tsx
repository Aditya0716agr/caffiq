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
          const ct = response.headers.get('content-type') || '';
          let data: any = null;
          if (ct.includes('application/json')) {
            try { data = await response.json(); } catch {}
          } else {
            // drain body if text/empty to avoid stream issues
            try { await response.text(); } catch {}
          }
          const apiCount = Number(data?.count ?? 0);
          // Start count from 100+ people joined already
          setSignupCount(Math.max(100, Number.isFinite(apiCount) ? apiCount : 0) + 100);
        } else {
          // API returned error status, use fallback
          console.error('API returned error status:', response.status);
          setSignupCount(1347); // Fallback count (1247 + 100)
        }
      } catch (error) {
        console.error('Failed to fetch signup count:', error);
        setSignupCount(1347); // Fallback count (1247 + 100)
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

      // Safely parse JSON only if present
      let data: any = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        // Drain body to avoid locked stream errors on some runtimes
        try { await response.text(); } catch {}
      }

      if (response.ok) {
        setIsSuccess(true);
        setSignupCount((prev) => prev + 1);
        toast.success('Welcome to the waitlist! You\'ll hear from us soon.');
        setEmail('');

        // Reset success state after animation
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        // Handle specific error codes
        if (data?.code === 'DUPLICATE_EMAIL') {
          toast.error('You\'re already on our waitlist! We\'ll notify you when we launch.');
        } else if (data?.code === 'INVALID_EMAIL_FORMAT') {
          toast.error('Please enter a valid email address');
        } else {
          toast.error(data?.error || 'Something went wrong. Please try again.');
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
    className="relative w-10 h-10 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
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
      scale: 1.07,
      zIndex: 20,
      y: -2,
      transition: { duration: 0.2 }
    }}>

      <img
      src={photoUrl}
      alt={`Waitlist member ${i + 1}`}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      sizes="40px" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10 pointer-events-none" />
    </motion.div>
  );


  return (
    <section className={`relative z-10 py-[120px] overflow-hidden bg-gradient-to-b from-[#FBFCFD] via-[#EFFFF8] to-[#FBFCFD] ${className || ''}`}>
      <div className="container max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center">
            {/* Main Headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] tracking-[0.5px] leading-[1.2]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ fontFamily: '"Playfair Display", var(--font-heading)', fontWeight: 600, letterSpacing: '1.5px' }}>

              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/80"
                style={{ backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                Your Energy,
              </motion.span>
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00B386] via-[#4DB6E5] to-[#00B386] drop-shadow-sm"
                style={{ backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                Your Way.
              </motion.span>
             </motion.h1>
            <motion.div
              className="h-1 w-24 sm:w-28 md:w-32 bg-gradient-to-r from-[#00B386] via-[#4DB6E5] to-[#00B386] rounded-full mx-auto"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            />
            
            <motion.p
              className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-[1.6] px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>

              India's first caffeine ecosystem. Water when you hydrate. Gum when you hustle.
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              className="relative space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>

              <div className="max-w-xl mx-auto px-4 sm:px-0">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/85 backdrop-blur border border-[#E5E7EB] shadow-md focus-within:ring-2 focus-within:ring-[#00B386]/25 transition">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1 w-full relative">
                      <Input
                        type="email"
                        aria-label="Email address"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading || isSuccess}
                        className="peer h-12 sm:h-14 text-base bg-white border-[#DDE5EC] rounded-xl shadow-inner focus:border-[#00B386] focus:ring-4 focus:ring-[#00B386]/20 transition-colors w-full" />
                      <label className="pointer-events-none absolute left-4 top-2 text-xs text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Email address
                      </label>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading || isSuccess}
                      className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-[#00B386] to-[#039a74] hover:from-[#00aa7b] hover:to-[#03906c] text-white font-medium rounded-xl shadow-sm hover:shadow-[0_0_24px_rgba(0,179,134,0.25)] transition-transform duration-200 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Joining...
                        </div>
                      ) : isSuccess ? (
                        <motion.div
                          className="flex items-center gap-2"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}>
                          <Check className="w-4 h-4" />
                          Joined!
                        </motion.div>
                      ) : (
                        'Join the Waitlist'
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Decorative asymmetric element (right) */}
              <div aria-hidden className="hidden lg:block absolute -right-6 -top-6 w-40 h-40 rounded-full bg-gradient-to-br from-[#E0FFF4] via-[#E6F7FF] to-transparent blur-2xl opacity-70" />

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
                  className="text-xs sm:text-sm text-muted-foreground text-center"
                  key={signupCount}
                  initial={{ opacity: 0.7, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}>

                  <span className="font-semibold text-foreground">
                    {Math.max(300, signupCount).toLocaleString()}+
                  </span>
                  {' '}already in. Are you?
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
                <Timer className="w-5 h-5 text-[#00B386]" />
                <h3 className="text-lg font-heading font-semibold text-foreground tracking-[0.5px]">
                  Launch Countdown
                </h3>
              </div>
              
              <motion.p
                className="text-sm md:text-base text-foreground/70 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}>
                Water drops first. Gum follows. You get both.
              </motion.p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[{ label: 'Days', value: timeLeft.days }, { label: 'Hours', value: timeLeft.hours }, { label: 'Minutes', value: timeLeft.minutes }, { label: 'Seconds', value: timeLeft.seconds }].map((item, index) =>
                <motion.div
                  key={item.label}
                  className="bg-white/60 backdrop-blur-md border border-white/40 ring-1 ring-[#00B386]/10 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-1 sm:gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_28px_rgba(15,23,42,0.08)] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}>

                    <motion.div
                    className="text-xl sm:text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#00B386] to-[#4DB6E5] tabular-nums"
                    key={item.value}
                    initial={{ opacity: 0.85, scale: 0.95 }}
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
              
              <motion.p
                className="text-xs sm:text-sm text-muted-foreground text-center mt-4 sm:mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}>
                First 500 waitlisters get both products at launch discount.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}