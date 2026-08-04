"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { getRecaptchaToken } from "@/app/lib/recaptcha";
import { useToast } from "@/components/ToastProvider";

interface ContactFormProps {
  activeOfficeName: string;
}

export default function ContactForm({ activeOfficeName }: ContactFormProps) {
  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (formData: FormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!fullName) errors.fullName = "Full name is required.";
    if (!phone) errors.phone = "Phone number is required.";
    if (!email) errors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email.";
    if (!message) errors.message = "Please enter a message.";

    return errors;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    const payload = {
      type: "Contact Page Direct Message",
      fullName: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      message: `[Office Preference: ${activeOfficeName}]\n${String(
        formData.get("message") || ""
      )}`,
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
        setFormSubmitted(true);
        showToast({
          type: "success",
          title: "Message Sent!",
          message: "Thank you for reaching out. We will respond shortly.",
        });
      } else {
        showToast({
          type: "error",
          title: "Submission failed",
          message: data?.error || "Unable to send message. Please try again.",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      showToast({
        type: "error",
        title: "Network error",
        message: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
      {formSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-secondary">Message Sent!</h3>
          <p className="text-xs text-zinc-600 max-w-xs mx-auto">
            Thank you for contacting Zento Care. A member of our nurse team will
            respond to your inquiry shortly.
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} noValidate className="space-y-3">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-secondary">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Your full name"
              onChange={() =>
                setFormErrors((prev) => ({ ...prev, fullName: "" }))
              }
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:bg-white ${
                formErrors.fullName
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-zinc-200 bg-zinc-50 focus:border-primary"
              }`}
            />
            {formErrors.fullName && (
              <p className="flex items-center gap-1 text-[11px] text-red-500 mt-0.5">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {formErrors.fullName}
              </p>
            )}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="0131 210 0095"
                onChange={() =>
                  setFormErrors((prev) => ({ ...prev, phone: "" }))
                }
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:bg-white ${
                  formErrors.phone
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-zinc-200 bg-zinc-50 focus:border-primary"
                }`}
              />
              {formErrors.phone && (
                <p className="flex items-center gap-1 text-[11px] text-red-500 mt-0.5">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={() =>
                  setFormErrors((prev) => ({ ...prev, email: "" }))
                }
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:bg-white ${
                  formErrors.email
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-zinc-200 bg-zinc-50 focus:border-primary"
                }`}
              />
              {formErrors.email && (
                <p className="flex items-center gap-1 text-[11px] text-red-500 mt-0.5">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {formErrors.email}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-secondary">
              Message / Care Inquiry *
            </label>
            <textarea
              rows={4}
              name="message"
              placeholder="How can our care team support you today?"
              onChange={() =>
                setFormErrors((prev) => ({ ...prev, message: "" }))
              }
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:bg-white resize-none ${
                formErrors.message
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-zinc-200 bg-zinc-50 focus:border-primary"
              }`}
            />
            {formErrors.message && (
              <p className="flex items-center gap-1 text-[11px] text-red-500 mt-0.5">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {formErrors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-full py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 ${
              isSubmitting
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 hover:scale-[1.01] cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send Message
              </>
            )}
          </button>

          {/* Trust Signal */}
          <p className="text-center text-[11px] text-zinc-400 leading-relaxed">
            We typically respond within{" "}
            <span className="font-semibold text-zinc-500">1 business day</span>.
            For urgent care needs, call us directly.
          </p>

          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Protected by reCAPTCHA &amp; Privacy Policy</span>
          </div>
        </form>
      )}
    </div>
  );
}
