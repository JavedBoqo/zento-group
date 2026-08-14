"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, Calendar, ClipboardList } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getRecaptchaToken } from "@/app/lib/recaptcha";
import { useToast } from "@/components/ToastProvider";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "callback" | "quote" | "assessment" | "general";
}

export default function ContactModal({ isOpen, onClose, type }: ContactModalProps) {
  const { showToast } = useToast();
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success">("idle");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setSubmissionStatus("idle");
    setSuccessMessage("");
    setIsSubmitting(false);
    onClose();
  };

  const getContent = () => {
    switch (type) {
      case "callback":
        return {
          title: "Request a Callback",
          description: "Leave your details and our nurse-led team will call you back at a time that suits you.",
          icon: <Phone className="w-6 h-6" />,
          button: "Request Callback"
        };
      case "quote":
        return {
          title: "Get a Personalised Quote",
          description: "Tell us a bit about your needs and we'll provide a tailored care estimate.",
          icon: <ClipboardList className="w-6 h-6" />,
          button: "Get Quote"
        };
      case "assessment":
        return {
          title: "Book a Consultation",
          description: "Schedule a comprehensive, no-obligation assessment with one of our registered nurses.",
          icon: <Calendar className="w-6 h-6" />,
          button: "Book Consultation"
        };
      default:
        return {
          title: "Contact Zento",
          description: "How can we help you today? Please fill out the form below.",
          icon: <Send className="w-6 h-6" />,
          button: "Send Message"
        };
    }
  };

  const content = getContent();

  const getSubmitErrorToast = (apiError?: string, code?: string) => {
    const message = apiError || "Please try again.";

    if (code === "validation") {
      return { title: "Incomplete form", message };
    }
    if (code === "verification") {
      return { title: "Verification failed", message };
    }
    return { title: "Message not sent", message };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: content.title,
      fullName: String(formData.get("Full Name") || ""),
      phone: String(formData.get("Client Phone") || ""),
      email: String(formData.get("Email Address") || ""),
      message: String(formData.get("Enquiry Details") || ""),
    };

    try {
      let recaptchaToken: string;
      try {
        recaptchaToken = await getRecaptchaToken("contact");
      } catch (recaptchaError) {
        console.error("reCAPTCHA error:", recaptchaError);
        showToast({
          type: "error",
          title: "Verification failed",
          message:
            recaptchaError instanceof Error
              ? recaptchaError.message
              : "Please refresh and try again.",
        });
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, recaptchaToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionStatus("success");
        setSuccessMessage(
          data.message || "Thank you. Our team will be in touch shortly."
        );
        timeoutRef.current = setTimeout(() => {
          setSubmissionStatus("idle");
          setSuccessMessage("");
          handleClose();
        }, 4000);
      } else {
        const { title, message } = getSubmitErrorToast(data?.error, data?.code);
        showToast({
          type: "error",
          title,
          message,
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      showToast({
        type: "error",
        title: "Message not sent",
        message: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-secondary/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-y-auto max-h-[calc(100vh-2rem)] rounded-[2rem] bg-white shadow-2xl sm:max-h-none sm:overflow-visible"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 z-30 p-2 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>

            <div className="p-6 sm:p-10">
              {submissionStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Message Sent!</h3>
                  <p className="mt-4 text-zinc-600">{successMessage}</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8 flex items-center gap-4 pr-10 sm:pr-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                      {content.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary leading-tight sm:text-2xl">{content.title}</h3>
                      <p className="text-xs text-zinc-500 mt-1 sm:text-sm">{content.description}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Full Name */}
                      <div className="relative group">
                        <input 
                          required
                          type="text" 
                          id="fullName"
                          name="Full Name"
                          placeholder="Enter your full name"
                          className="peer w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 pt-6 pb-2 text-zinc-900 outline-none transition-all placeholder:text-transparent focus:border-primary focus:bg-white"
                        />
                        <label 
                          htmlFor="fullName"
                          className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm font-semibold text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-zinc-900 pointer-events-none"
                        >
                          Full Name
                        </label>
                      </div>

                      {/* Phone Number */}
                      <div className="relative group">
                        <input 
                          required
                          type="tel" 
                          id="phone"
                          name="Client Phone"
                          placeholder="Your contact number"
                          className="peer w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 pt-6 pb-2 text-zinc-900 outline-none transition-all placeholder:text-transparent focus:border-primary focus:bg-white"
                        />
                        <label 
                          htmlFor="phone"
                          className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm font-semibold text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-zinc-900 pointer-events-none"
                        >
                          Contact Number
                        </label>
                      </div>
                    </div>
                    
                    {/* Email Address */}
                    <div className="relative group">
                      <input 
                        required
                        type="email" 
                        id="email"
                        name="Email Address"
                        placeholder="Your email address"
                        className="peer w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 pt-6 pb-2 text-zinc-900 outline-none transition-all placeholder:text-transparent focus:border-primary focus:bg-white"
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm font-semibold text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-zinc-900 pointer-events-none"
                      >
                        Email Address
                      </label>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <textarea 
                        required
                        rows={3}
                        id="message"
                        name="Enquiry Details"
                        placeholder="How can we support you today?"
                        className="peer w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 pt-7 pb-2 text-zinc-900 outline-none transition-all placeholder:text-transparent focus:border-primary focus:bg-white resize-none"
                      />
                      <label 
                        htmlFor="message"
                        className="absolute left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm font-semibold text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-zinc-900 pointer-events-none"
                      >
                        How can we support you today?
                      </label>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full rounded-full py-4 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3
                        ${isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:scale-[1.02] hover:bg-primary/90'}
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        content.button
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-zinc-400 mt-4 px-4">
                      By submitting this form, you agree to our Privacy Policy and consent to being contacted regarding your care enquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
