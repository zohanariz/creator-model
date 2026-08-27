import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function SalesPage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL || "https://whop.com/checkout/plan_GZ5rc34v5iXhP";

  const inclusionCheckmarks = [
    "Lifetime access to all 5 video training modules",
    "Weekly Live Coaching Calls with Nashira",
    "Private Parent Community Support Group",
    "Actionable PDFs, checklists, and worksheets",
    "Atlanta Quarterly Travel Lucky Draw eligibility",
    "Free lifetime updates and program expansion",
  ];

  return (
    <>
      <main className="min-h-screen bg-bg-alt py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-berry-tint border border-berry/20 text-berry font-bold text-xs tracking-wider uppercase mb-3">
              Special Program Offer
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">
              Get Instant Access to <br />
              <span className="signature text-4xl md:text-6xl font-normal block mt-2 text-berry">
                Raise Them Ready
              </span>
            </h1>
            <p className="text-body max-w-xl mx-auto text-base md:text-lg">
              You are one step away from building a home that runs itself. Get lifetime access to the blueprint, coaching, and community.
            </p>
          </div>

          {/* Pricing Stack */}
          <div className="grid md:grid-cols-5 gap-8 items-stretch mb-16">
            {/* Offer description */}
            <div className="md:col-span-3 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-ink mb-6">What You Get Inside the Program:</h2>
              <ul className="space-y-4">
                {inclusionCheckmarks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-body text-sm md:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Box */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-border shadow-xl flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-berry" />
              <div>
                <span className="text-xs font-bold text-body uppercase tracking-widest block mb-1">
                  LIFETIME ACCESS
                </span>
                <div className="flex justify-center items-baseline gap-1 my-4">
                  <span className="text-xl font-bold text-body align-top">$</span>
                  <span className="text-5xl md:text-6xl font-extrabold text-navy tracking-tight">
                    97
                  </span>
                  <span className="text-xs font-semibold text-body uppercase">USD</span>
                </div>
                <p className="text-xs text-body mb-6">
                  One-time payment. No hidden fees. Access forever.
                </p>
              </div>

              <div>
                <Link
                  href={checkoutUrl}
                  className="block w-full py-4 rounded-xl bg-berry hover:bg-navy text-white font-extrabold tracking-wide text-center transition-colors shadow-lg shadow-berry/20 mb-4"
                >
                  Buy Now &rarr;
                </Link>
                <div className="flex justify-center items-center gap-2 text-xs text-body">
                  <span>🔒 Secure Checkout via Whop</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure details */}
          <div className="bg-white rounded-2xl p-8 border border-border shadow-md max-w-2xl mx-auto text-center mb-8">
            <h3 className="text-lg font-bold text-navy mb-3">Our Visibility & Results Guarantee</h3>
            <p className="text-sm text-body leading-relaxed">
              We do not offer standard refunds. Instead, we offer a <strong>results-based commitment</strong>. If you go through the modules, submit your tasks, and attend coaching calls but still do not see a positive shift in your home&apos;s routine within 30 days, Nashira will personally work with you one-on-one until your system runs smoothly.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
