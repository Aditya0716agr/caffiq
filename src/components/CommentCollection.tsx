"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, User, FileText, MessageSquare, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CommentFormData {
  name: string;
  email: string;
  subject: string;
  comment: string;
}

interface FormErrors {
  email?: string;
  comment?: string;
}

export const CommentCollectionComponent = () => {
  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    email: "",
    subject: "",
    comment: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CommentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim() || null,
          email: formData.email.trim(),
          subject: formData.subject.trim() || null,
          comment: formData.comment.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error codes from the API
        if (data.code === 'INVALID_EMAIL') {
          setErrors({ email: "Please enter a valid email address" });
          toast.error("Please enter a valid email address");
        } else if (data.code === 'MISSING_EMAIL') {
          setErrors({ email: "Email is required" });
          toast.error("Email is required");
        } else if (data.code === 'MISSING_COMMENT' || data.code === 'EMPTY_COMMENT') {
          setErrors({ comment: "Comment is required" });
          toast.error("Comment is required");
        } else {
          toast.error(data.error || "Something went wrong. Please try again.");
        }
        return;
      }
      
      setIsSuccess(true);
      toast.success("Thank you for your feedback! We've received your message and will get back to you soon.");
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", comment: "" });
        setIsSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/20 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-ring/10 to-accent-foreground/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-accent-foreground/10 to-ring/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-ring to-accent-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-ring/25">
                <MessageSquare className="w-8 h-8 text-card" />
              </div>
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-accent-foreground rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-2 h-2 text-card" />
              </motion.div>
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Share Your
            <span className="text-transparent bg-gradient-to-r from-ring to-accent-foreground bg-clip-text"> Feedback</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We'd love to hear from you. Send us your thoughts, questions, or suggestions.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-black/20 p-8 md:p-10 relative overflow-hidden"
        >
          {/* Card background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/50 via-card to-card/30 pointer-events-none" />
          
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: 2 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your feedback has been received. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <motion.div
                      variants={itemVariants}
                      className="relative"
                    >
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-200" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all duration-200"
                          placeholder="Your name (optional)"
                        />
                        <motion.div
                          initial={false}
                          animate={{
                            scale: focusedField === "name" ? 1.02 : 1,
                            opacity: focusedField === "name" ? 1 : 0.7
                          }}
                          className="absolute inset-0 border border-ring/30 rounded-xl pointer-events-none"
                        />
                      </div>
                    </motion.div>

                    {/* Subject Field */}
                    <motion.div
                      variants={itemVariants}
                      className="relative"
                    >
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-200" />
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all duration-200"
                          placeholder="Subject (optional)"
                        />
                        <motion.div
                          initial={false}
                          animate={{
                            scale: focusedField === "subject" ? 1.02 : 1,
                            opacity: focusedField === "subject" ? 1 : 0.7
                          }}
                          className="absolute inset-0 border border-ring/30 rounded-xl pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Email Field */}
                  <motion.div
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-200" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-4 bg-background/50 border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all duration-200 ${
                          errors.email ? "border-destructive" : "border-border/50"
                        }`}
                        placeholder="Your email address *"
                      />
                      <motion.div
                        initial={false}
                        animate={{
                          scale: focusedField === "email" ? 1.02 : 1,
                          opacity: focusedField === "email" ? 1 : 0.7
                        }}
                        className="absolute inset-0 border border-ring/30 rounded-xl pointer-events-none"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-sm mt-2 ml-2"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Comment Field */}
                  <motion.div
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground transition-colors duration-200" />
                      <textarea
                        value={formData.comment}
                        onChange={(e) => handleInputChange("comment", e.target.value)}
                        onFocus={() => setFocusedField("comment")}
                        onBlur={() => setFocusedField(null)}
                        rows={6}
                        className={`w-full pl-12 pr-4 py-4 bg-background/50 border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all duration-200 resize-none ${
                          errors.comment ? "border-destructive" : "border-border/50"
                        }`}
                        placeholder="Share your thoughts, feedback, or questions... *"
                      />
                      <motion.div
                        initial={false}
                        animate={{
                          scale: focusedField === "comment" ? 1.02 : 1,
                          opacity: focusedField === "comment" ? 1 : 0.7
                        }}
                        className="absolute inset-0 border border-ring/30 rounded-xl pointer-events-none"
                      />
                    </div>
                    {errors.comment && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-sm mt-2 ml-2"
                      >
                        {errors.comment}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-ring to-accent-foreground text-card font-semibold py-4 px-8 rounded-xl shadow-lg shadow-ring/25 hover:shadow-ring/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent-foreground to-ring opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="flex items-center justify-center space-x-3 relative z-10">
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0, rotate: -180 }}
                              animate={{ opacity: 1, rotate: 0 }}
                              exit={{ opacity: 0, rotate: 180 }}
                            >
                              <Loader2 className="w-5 h-5 animate-spin" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="send"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                            >
                              <Send className="w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <span>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                      </div>
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            We typically respond within 24 hours. Your privacy is important to us.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};