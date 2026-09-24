"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  X,
  FileText,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ToastProvider";

interface QuickApplyFormProps {
  initialRole?: string;
  onSuccess?: () => void;
}

export default function QuickApplyForm({
  initialRole = "Care Workers (Crieff & Perthshire)",
  onSuccess,
}: QuickApplyFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Personal Details (matches mockup fields: Name, Email, Phone Number, Address)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+44");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(initialRole);

  // Step 2: Questions
  const [rightToWork, setRightToWork] = useState("Yes - UK Citizen / Settled / Visa");
  const [drivingLicence, setDrivingLicence] = useState("Yes - Full UK Driving Licence");
  const [careExperience, setCareExperience] = useState("No experience - Full paid training requested");
  const [preferredPattern, setPreferredPattern] = useState("Flexible (Morning / Evening / Weekends)");

  // Step 3: Upload Documents & Notes
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        showToast({
          type: "error",
          title: "File too large",
          message: "Please upload a document under 5MB.",
        });
        return;
      }
      setCvFile(file);
      showToast({
        type: "success",
        title: "CV Attached",
        message: file.name,
      });
    }
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address.";
    if (!phone.trim()) errors.phone = "Phone number is required.";
    if (!address.trim()) errors.address = "Address / Postcode is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push("/careers");
    }
  };

  const handleSubmit = async () => {
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("phone", `${countryCode} ${phone.trim()}`);
      formData.append("email", email.trim());
      formData.append("address", address.trim());
      formData.append("role", role);
      formData.append("rightToWork", rightToWork);
      formData.append("drivingLicence", drivingLicence);
      formData.append("careExperience", careExperience);
      formData.append("preferredPattern", preferredPattern);
      formData.append("message", message.trim());
      if (cvFile) {
        formData.append("cvFile", cvFile);
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormSubmitted(true);
        showToast({
          type: "success",
          title: "Application Received!",
          message: "Thank you for applying. A coordinator will call you shortly.",
        });
        if (onSuccess) onSuccess();
      } else {
        showToast({
          type: "error",
          title: "Submission failed",
          message: data?.error || "Unable to submit application. Please try calling us.",
        });
      }
    } catch (err) {
      console.error("Apply error:", err);
      showToast({
        type: "error",
        title: "Network error",
        message: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Personal Details" },
    { num: 2, label: "Questions" },
    { num: 3, label: "Upload Documents" },
    { num: 4, label: "Review & Submit" },
  ];

  return (
    <div className="w-full rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 md:p-12 shadow-xl">
      {formSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h3 className="text-2xl font-bold text-secondary">Application Received!</h3>
          <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-bold text-secondary">{fullName}</span>. We have received your application for <strong className="text-secondary">{role}</strong>.
            Our local care management team will be in touch within 24 to 48 hours for a friendly phone chat.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setFormSubmitted(false);
                setCurrentStep(1);
                setFullName("");
                setPhone("");
                setEmail("");
                setAddress("");
                setMessage("");
                setCvFile(null);
              }}
              className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition-all cursor-pointer"
            >
              Submit Another Application
            </button>
            <Link
              href="/careers"
              className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-bold text-secondary hover:bg-zinc-50 transition-all"
            >
              Back to Careers
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* Top Bar: Back Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Stepper (Exact 1:1 Layout from 96ef4fbd54b3099ed981f90dbc13cad6.webp) */}
          <div className="mb-10 sm:mb-12 max-w-2xl mx-auto">
            <div className="relative flex items-center justify-between">
              {/* Connecting Line */}
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-zinc-200 z-0">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Step Circles & Labels */}
              {steps.map((step) => {
                const isCompleted = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                const isClickable = step.num < currentStep;

                return (
                  <button
                    type="button"
                    key={step.num}
                    onClick={() => {
                      if (isClickable) {
                        setCurrentStep(step.num);
                      }
                    }}
                    className={`relative z-10 flex flex-col items-center bg-transparent border-0 p-0 ${isClickable ? "cursor-pointer group" : "cursor-default"
                      }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${isCurrent
                        ? "bg-primary text-white ring-4 ring-primary/20 shadow-md"
                        : isCompleted
                          ? "bg-primary text-white group-hover:scale-110"
                          : "bg-white text-zinc-400 border-2 border-zinc-200"
                        }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : step.num}
                    </div>
                    <span
                      className={`mt-2 text-xs sm:text-sm font-medium whitespace-nowrap ${isCurrent
                        ? "font-bold text-zinc-900"
                        : isCompleted
                          ? "text-zinc-700 group-hover:text-primary"
                          : "text-zinc-400"
                        }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            {/* ── STEP 1: Personal Details (Matches 96ef4fbd54b3099ed981f90dbc13cad6.webp) ── */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name * */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-fullName" className="text-sm font-semibold text-zinc-800">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="apply-fullName"
                      placeholder="Azhar Khan"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setFormErrors((prev) => ({ ...prev, fullName: "" }));
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:bg-white ${formErrors.fullName
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-zinc-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                    />
                    {formErrors.fullName && (
                      <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email * */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-email" className="text-sm font-semibold text-zinc-800">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="apply-email"
                      placeholder="Azharmy123@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setFormErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:bg-white ${formErrors.email
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-zinc-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                    />
                    {formErrors.email && (
                      <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number * (with Country prefix badge) */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-phone" className="text-sm font-semibold text-zinc-800">
                      Phone Number *
                    </label>
                    <div className="flex rounded-xl border border-zinc-200 bg-white overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                      <div className="flex items-center gap-1.5 px-3.5 bg-zinc-50 border-r border-zinc-200 text-xs font-bold text-zinc-700 shrink-0">
                        <span className="text-sm">🇬🇧</span>
                        <span>{countryCode}</span>
                      </div>
                      <input
                        type="tel"
                        id="apply-phone"
                        placeholder="(07123) 456789"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setFormErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        className="w-full px-4 py-3 text-sm text-zinc-900 outline-none"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address * */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-address" className="text-sm font-semibold text-zinc-800">
                      Address / Postcode *
                    </label>
                    <input
                      type="text"
                      id="apply-address"
                      placeholder="Homeaddress #Street, Crieff / Edinburgh EH17"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setFormErrors((prev) => ({ ...prev, address: "" }));
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:bg-white ${formErrors.address
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-zinc-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                    />
                    {formErrors.address && (
                      <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Role of Interest */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="apply-role" className="text-sm font-semibold text-zinc-800">
                    Role Applying For *
                  </label>
                  <select
                    id="apply-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="Care Workers (Crieff & Strathearn · Perthshire)">
                      Care Workers — Crieff &amp; Strathearn · Perthshire (£14.50–£16.50/hr)
                    </option>
                    <option value="Care Workers (Edinburgh · East Lothian · Midlothian)">
                      Care Workers — Edinburgh · East Lothian · Midlothian (£14.50–£16.50/hr)
                    </option>
                    <option value="General Care Vacancies">
                      General Care Vacancies / Register Interest
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* ── STEP 2: Questions ── */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Right to Work */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-rightToWork" className="text-sm font-semibold text-zinc-800">
                      Right to work in UK? *
                    </label>
                    <select
                      id="apply-rightToWork"
                      value={rightToWork}
                      onChange={(e) => setRightToWork(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="Yes - UK Citizen / Settled / Visa">Yes (UK Citizen / Settled / Visa)</option>
                      <option value="No - Require Sponsorship">No (Require Sponsorship)</option>
                    </select>
                  </div>

                  {/* Driving Licence */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-driving" className="text-sm font-semibold text-zinc-800">
                      Do you hold a driving licence? *
                    </label>
                    <select
                      id="apply-driving"
                      value={drivingLicence}
                      onChange={(e) => setDrivingLicence(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="Yes - Full UK Driving Licence">Yes (Full UK Licence with vehicle)</option>
                      <option value="Yes - Licence without vehicle">Yes (Full UK Licence without vehicle)</option>
                      <option value="Learning - In progress">In progress / Learning</option>
                      <option value="No licence">No licence (Walking rounds)</option>
                    </select>
                  </div>

                  {/* Care Experience */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-experience" className="text-sm font-semibold text-zinc-800">
                      Care experience? *
                    </label>
                    <select
                      id="apply-experience"
                      value={careExperience}
                      onChange={(e) => setCareExperience(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="No experience - Full paid training requested">
                        No experience needed (I would like full paid training)
                      </option>
                      <option value="Yes - Professional Care Experience (1+ years)">
                        Yes (Professional care experience 1+ years)
                      </option>
                      <option value="Yes - Personal / Family Caregiving">
                        Yes (Personal or family care experience)
                      </option>
                    </select>
                  </div>

                  {/* Preferred Pattern */}
                  <div className="space-y-1.5">
                    <label htmlFor="apply-pattern" className="text-sm font-semibold text-zinc-800">
                      Preferred shift pattern
                    </label>
                    <select
                      id="apply-pattern"
                      value={preferredPattern}
                      onChange={(e) => setPreferredPattern(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="Flexible (Morning / Evening / Weekends)">Flexible (Morning / Evening / Weekends)</option>
                      <option value="Full-Time (35+ hours)">Full-Time (35+ hours)</option>
                      <option value="Part-Time (16-25 hours)">Part-Time (16-25 hours)</option>
                      <option value="Weekends Only">Weekends Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Upload Documents ── */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-800">
                    Upload Documents (CV / Resume) <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  {!cvFile ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center transition-all hover:border-primary hover:bg-white cursor-pointer"
                    >
                      <UploadCloud className="h-8 w-8 text-primary" />
                      <p className="text-sm font-bold text-secondary">
                        Click or drag &amp; drop to upload your CV
                      </p>
                      <p className="text-xs text-zinc-400">PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
                      <div className="flex items-center gap-3 truncate">
                        <FileText className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="font-bold text-secondary truncate">{cvFile.name}</p>
                          <p className="text-xs text-zinc-500">{(cvFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Remove CV"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="apply-message" className="text-sm font-semibold text-zinc-800">
                    Additional Message / Availability <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    id="apply-message"
                    placeholder="Tell us about your availability, why you want to care with Zento, or any questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
              </div>
            )}

            {/* ── STEP 4: Review & Submit ── */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-1">
                    Review your application
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    Please check all your details below. You can edit any section before submitting.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Card 1: Personal Details */}
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 sm:p-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                      <span className="font-bold text-secondary text-sm">Personal Details</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Full Name</span>
                        <p className="font-bold text-zinc-900">{fullName}</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Email Address</span>
                        <p className="font-bold text-zinc-900">{email}</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Phone Number</span>
                        <p className="font-bold text-zinc-900">{countryCode} {phone}</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Address</span>
                        <p className="font-bold text-zinc-900">{address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Role & Questions */}
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 sm:p-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                      <span className="font-bold text-secondary text-sm">Role &amp; Questions</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Role Applying For</span>
                        <p className="font-bold text-primary">{role}</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Right to Work in UK</span>
                        <p className="font-medium text-zinc-800">{rightToWork}</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Driving Licence</span>
                        <p className="font-medium text-zinc-800">{drivingLicence}</p>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">Care Experience</span>
                        <p className="font-medium text-zinc-800">{careExperience}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-xs text-zinc-400 font-medium">Shift Pattern Preference</span>
                        <p className="font-medium text-zinc-800">{preferredPattern}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Documents & Message */}
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 sm:p-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                      <span className="font-bold text-secondary text-sm">Documents &amp; Note</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-3 pt-1">
                      <div>
                        <span className="text-xs text-zinc-400 font-medium">CV / Resume Document</span>
                        <p className="font-semibold text-secondary">
                          {cvFile ? cvFile.name : "No file attached (details will be taken during phone interview)"}
                        </p>
                      </div>
                      {message && (
                        <div>
                          <span className="text-xs text-zinc-400 font-medium">Additional Message</span>
                          <p className="text-xs text-zinc-700 whitespace-pre-wrap">{message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-zinc-100 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-secondary hover:bg-zinc-50 transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              ) : currentStep === 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Review Application <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`rounded-xl px-10 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 ${isSubmitting
                    ? "bg-primary/70 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 hover:scale-[1.01] cursor-pointer"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
