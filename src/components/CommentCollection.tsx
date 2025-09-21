"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  subject: string;
  comment: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  comment?: string;
}

export const CommentCollection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    comment: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        break;
      case 'comment':
        if (!value.trim()) return 'Comment is required';
        if (value.trim().length < 10) return 'Comment must be at least 10 characters';
        if (value.trim().length > 1000) return 'Comment must be less than 1000 characters';
        break;
      default:
        return undefined;
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Real-time validation
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof FormData, value);
      if (error) {
        newErrors[key as keyof FormData] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        // Try to extract error details without assuming JSON body
        let errMsg = `HTTP error! status: ${response.status}`;
        const ct = response.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          try {
            const err = await response.json();
            if (err?.error) errMsg = err.error;
          } catch {}
        } else {
          try {
            const text = await response.text();
            if (text) errMsg = text;
          } catch {}
        }
        throw new Error(errMsg);
      }
      
      // Success: drain body safely only if JSON/text is present
      const ct = response.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        try { await response.json(); } catch {}
      } else {
        try { await response.text(); } catch {}
      }
      
      setIsSubmitted(true);
      toast.success('Thank you! Your message has been sent successfully.');
      
      // Reset form after success animation
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          comment: ''
        });
        setIsSubmitted(false);
      }, 2000);
      
    } catch (error: any) {
      console.error('Error submitting comment:', error);
      toast.error(error?.message || 'Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent transition-all duration-200 shadow-sm";
  const labelClasses = "block text-sm font-medium text-[var(--color-foreground)] mb-2";

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00e0d5]/5 via-transparent to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00e0d5]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 font-heading">
            Share Your Thoughts
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-lg mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Refined Card */}
          <div className="bg-white backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-8 md:p-10 shadow-xl">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="w-16 h-16 text-[var(--color-ring)] mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Message Sent!</h3>
                  <p className="text-[var(--color-muted-foreground)]">Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="name" className={labelClasses}>
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`${inputClasses} ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Your full name"
                        aria-label="Your full name"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.div
                            id="name-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="email" className={labelClasses}>
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`${inputClasses} ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="your@email.com"
                        aria-label="Your email address"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.div
                            id="email-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="subject" className={labelClasses}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`${inputClasses} ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="What's this about?"
                      aria-label="Message subject"
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    <AnimatePresence>
                      {errors.subject && (
                        <motion.div
                          id="subject-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.subject}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Comment */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label htmlFor="comment" className={labelClasses}>
                      Message *
                    </label>
                    <textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      rows={6}
                      className={`${inputClasses} resize-none ${errors.comment ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Tell us what's on your mind..."
                      aria-label="Your message"
                      aria-describedby={errors.comment ? 'comment-error' : undefined}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <AnimatePresence>
                        {errors.comment && (
                          <motion.div
                            id="comment-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 text-red-500 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.comment}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="text-xs text-[color:var(--color-muted-foreground)] ml-auto">
                        {formData.comment.length}/1000
                      </span>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="pt-4"
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#00e0d5] to-[#00b8a9] text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#00e0d5]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};