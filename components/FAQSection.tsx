"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      q: "My kids are older. Is it too late for this to work?",
      a: "It's not too late. The system works at every age, 2 to 18. It looks different for a 5-year-old than a 15-year-old, but the foundation is the same. Module 3 gives you the age-by-age roadmap, so you know exactly where to start no matter where your kids are right now.",
    },
    {
      q: "I've tried routines before and they never stick. Why would this be different?",
      a: "Routines fail when they live in the parent's head. This is different because we build the structure around your kids, not on top of you. They live inside it every day, so it holds up even on the days you have nothing left to give.",
    },
    {
      q: "I'm busy. I don't have time for a course.",
      a: "The videos are made short on purpose and built for real life. No weekend binge required. Every change you put in place starts handing you time back almost immediately.",
    },
    {
      q: "My child is neurodivergent. Will this work for them?",
      a: "I built this as an AuDHD mom raising neurodivergent kids. Every system in this program was designed with neurodivergent brains in mind. It's a flexible framework you shape to your child's brain, not against it.",
    },
    {
      q: "What if it doesn't work for my family?",
      a: "I don't do refunds. I do something stronger: I don't stop working with you until you see your first real, visible results in your home. You're entering a commitment, and so am I.",
    },
    {
      q: "Is there a guarantee?",
      a: "Yes, a results guarantee, not a money-back one. Show up to the calls, do the tasks, stay in the community, and I personally commit to staying with you until you see real change in your home.",
    },
    {
      q: "How long do I have access to the program?",
      a: "Lifetime access. You pay once and it's yours forever, including every update I make and every new resource I add.",
    },
    {
      q: "My partner isn't on board. Can I still do this alone?",
      a: "Absolutely. I built this as a single mom. You don't need a partner to build a system that works - you need a decision to start.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow center">FAQs</div>
        <h2
          className="center gc-46"
          style={{
            fontFamily: "var(--font-caveat), 'Caveat', cursive",
            fontWeight: 700,
            color: "var(--berry)",
            fontSize: "46px",
          }}
        >
          <span style={{ background: "#EAF6EE", padding: "8px 20px", borderRadius: "24px", display: "inline-block" }}>
            You still have questions. I have answers.
          </span>
        </h2>
        
        <div className="faq-list" style={{ marginTop: "44px" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="faq-item"
                style={{ 
                  borderBottom: "1px solid var(--border)", 
                  padding: "20px 0" 
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--ink)",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: "16.5px",
                    lineHeight: "1.4",
                  }}
                >
                  <span>{faq.q}</span>
                  <span 
                    style={{
                      fontSize: "22px",
                      color: "var(--berry)",
                      fontWeight: 300,
                      marginLeft: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                      transition: "transform 0.2s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  >
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          marginTop: "14px",
                          fontSize: "19px",
                          fontFamily: "var(--font-caveat), 'Caveat', cursive",
                          fontWeight: 600,
                          color: "var(--berry)",
                          letterSpacing: "0.02em",
                          lineHeight: 1.5,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
