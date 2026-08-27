"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { leadFormSchema, LeadFormInput, LeadApiInput } from "@/lib/validation";
import { getAnalyticsData } from "@/lib/analytics";

import { useModal } from "./ModalContext";

interface LeadCaptureModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function saveToOfflineStorage(lead: LeadApiInput) {
  try {
    const existing = localStorage.getItem("pending_leads");
    const list = existing ? JSON.parse(existing) : [];
    list.push(lead);
    localStorage.setItem("pending_leads", JSON.stringify(list));
  } catch (e) {
    console.error("Failed to write to localStorage:", e);
  }
}

export default function LeadCaptureModal({ isOpen: propIsOpen, onClose: propOnClose }: LeadCaptureModalProps) {
  const router = useRouter();
  const modalContext = useModal();
  const isOpen = propIsOpen !== undefined ? propIsOpen : modalContext.isModalOpen;
  const onClose = propOnClose || modalContext.closeModal;
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Prefetch the checkout page to make redirection instant
  useEffect(() => {
    router.prefetch("/checkout");
  }, [router]);

  // Reset redirecting state if modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsRedirecting(false);
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Sync offline leads whenever client comes back online
  useEffect(() => {
    const syncOfflineLeads = async () => {
      try {
        const existing = localStorage.getItem("pending_leads");
        if (!existing) return;
        
        const list: LeadApiInput[] = JSON.parse(existing);
        if (list.length === 0) return;

        const remaining: LeadApiInput[] = [];

        for (const lead of list) {
          try {
            const res = await fetch("/api/leads", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(lead),
            });
            if (!res.ok) {
              remaining.push(lead);
            }
          } catch (err) {
            remaining.push(lead);
          }
        }

        if (remaining.length > 0) {
          localStorage.setItem("pending_leads", JSON.stringify(remaining));
        } else {
          localStorage.removeItem("pending_leads");
        }
      } catch (e) {
        console.error("Offline sync failed:", e);
      }
    };

    window.addEventListener("online", syncOfflineLeads);
    syncOfflineLeads();
    
    return () => {
      window.removeEventListener("online", syncOfflineLeads);
    };
  }, []);

  const onSubmit = (data: LeadFormInput) => {
    setIsRedirecting(true);

    // 1. Prepare payload for the background request
    const parts = data.name.trim().split(/\s+/);
    const firstName = parts[0] || "Parent";
    const lastName = parts.slice(1).join(" ");
    const analytics = getAnalyticsData();

    const payload: LeadApiInput = {
      firstName,
      lastName,
      email: data.email,
      phone: data.phone || "",
      utmSource: analytics.utmSource,
      utmMedium: analytics.utmMedium,
      utmCampaign: analytics.utmCampaign,
      referrer: analytics.referrer,
    };

    // 2. Send in background using keepalive: true
    fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then((res) => {
        if (!res.ok) {
          saveToOfflineStorage(payload);
        }
      })
      .catch((err) => {
        console.error("Network error, saving lead to offline queue:", err);
        saveToOfflineStorage(payload);
      });

    // 3. Immediately redirect to the sales page using Next router soft transition
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-[24px] bg-white p-8 shadow-2xl border border-border"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-[#55534E]/70 hover:text-ink text-xl font-bold cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="mb-6 mt-4">
              {/* Black callout banner */}
              <div className="bg-black text-white text-center py-4 px-6 rounded-xl font-medium text-sm leading-relaxed mb-6">
                This is how legacies start. This is where it changes. With one name, one decision.
              </div>
              
              {/* Cursive subtitle */}
              <div className="text-center">
                <p
                  style={{
                    fontFamily: "var(--font-caveat), 'Caveat', cursive",
                    color: "var(--berry)",
                    fontSize: "26px",
                    lineHeight: "1.25",
                    fontWeight: "700",
                  }}
                >
                  This is your first big step toward breaking the cycle.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-[#55534E] uppercase tracking-wider mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Your first name"
                  {...register("name")}
                  className="w-full px-4 py-3.5 rounded-xl border border-berry bg-white text-ink text-sm focus:outline-none focus:ring-1 focus:ring-berry transition-shadow"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#55534E] uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  {...register("email")}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-ink text-sm focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry transition-shadow"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isRedirecting}
                className="w-full py-4 mt-2 rounded-xl bg-[#00bf63] hover:bg-[#00a354] text-white font-bold text-base tracking-wide cursor-pointer transition-colors shadow-lg shadow-[#00bf63]/10 flex items-center justify-center gap-2"
              >
                {isRedirecting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Let's Go...</span>
                  </>
                ) : isSubmitting ? (
                  "Submitting..."
                ) : (
                  "Let's Go →"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
