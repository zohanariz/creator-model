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
        <div className="lead-modal-overlay">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lead-modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="lead-modal-card"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="lead-modal-close"
              aria-label="Close modal"
            >
              ×
            </button>

            <div>
              {/* Black callout banner */}
              <div className="lead-modal-banner">
                This is how legacies start. This is where it changes. With one name, one decision.
              </div>
              
              {/* Cursive subtitle */}
              <div className="text-center" style={{ marginBottom: "24px" }}>
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="lead-modal-form-group">
                <label className="lead-modal-label">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Your first name"
                  {...register("name")}
                  className="lead-modal-input border-berry"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div className="lead-modal-form-group">
                <label className="lead-modal-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  {...register("email")}
                  className="lead-modal-input"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isRedirecting}
                className="lead-modal-submit-btn"
              >
                {isRedirecting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}>
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
