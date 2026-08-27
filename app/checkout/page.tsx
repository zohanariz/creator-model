import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL || "https://whop.com/checkout/plan_GZ5rc34v5iXhP";

  const inclusions = [
    "Lifetime access to all 5 modules",
    "Weekly live coaching calls with me",
    "Private parent community",
    "Actionable tasks plus PDFs and Worksheets",
    "Quarterly lucky draw to meet me in person",
    "Results in weeks, not months",
  ];

  return (
    <section className="section checkout-section">
      <div className="container">
        
        {/* Header */}
        <h1
          style={{
            fontFamily: "var(--font-caveat), 'Caveat', cursive",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "1.2",
            letterSpacing: "normal",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "var(--berry)" }}>You showed up. 🎉</span>{" "}
          <span style={{ color: "#000" }}>That already says</span>
          <br />
          <span style={{ color: "#000" }}>
            everything about the kind of parent
          </span>
          <br />
          <span style={{ color: "#000" }}>
            you are.
          </span>
        </h1>
        
        {/* Lede badge */}
        <p className="lede" style={{ textAlign: "center", margin: "0 auto 44px" }}>
          <span
            style={{
              background: "#EAF6EE",
              padding: "8px 24px",
              borderRadius: "24px",
              display: "inline-block",
              fontSize: "15px",
              color: "var(--body)",
              textAlign: "center",
              lineHeight: "1.4",
            }}
          >
            The home you want for your family is one step away. Let&apos;s
            <br />
            finish this.
          </span>
        </p>

        {/* Navy final-card */}
        <div className="final-card">
          <div className="relative w-full h-[220px] md:h-[280px] rounded-xl overflow-hidden mb-4">
            <Image
              src="/images/image_14.jpeg"
              alt="Raise Them Ready overview"
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 600px"
              className="rounded-xl"
            />
          </div>
          <h3>When you join Raise Them Ready, you get:</h3>
          <div className="final-list">
            {inclusions.map((item, idx) => (
              <div key={idx} className="qualify-item">
                <span className="mark">✓</span>
                <p style={{ color: "#EAF0FA", fontSize: "14.5px" }}>{item}</p>
              </div>
            ))}
          </div>
          <p className="final-note">
            &quot;And I stay with you until you see real results in your home. That's my word to every parent who joins.&quot;
          </p>

          {/* White strike-through price box */}
          <div className="strike-price-box">
            <div className="label">ONE TIME PAYMENT</div>
            <div className="amount">
              <span className="price-997-wrap">
                $997
                <span className="strike-line"></span>
              </span>
            </div>
            <div className="sub">Lifetime Access. Results Guaranteed.</div>
          </div>
        </div>

        {/* Bouncing Arrow */}
        <div className="bounce-arrow">↓</div>

        {/* Lightning founding spots callout */}
        <div className="lightning-callout">
          ⚡ 30 founding spots at this price only for first 30 parents.
        </div>
        <div className="lightning-callout-sub">
          Once they are gone the price goes up permanently.
        </div>

        {/* Black Pricing Card */}
        <div className="pricing-card">
          <div className="pricing-today-box">
            <span className="pricing-today-label">YOU PAY TODAY</span>
            <div className="pricing-today-amount">
              $497
            </div>
            <span className="pricing-today-note">
              One payment. One time. Lifetime access.
            </span>
            <Link
              href={checkoutUrl}
              className="btn btn-green btn-glow cta-blink pricing-today-btn"
            >
              Get Instant Access Now
            </Link>
            <div className="secure-checkout-label">
              🔒 Secure Checkout
            </div>
          </div>
        </div>

        {/* Note from Nashira */}
        <div className="nashira-note">
          <div className="nashira-note-content">
            <div className="nashira-note-text">
              <div className="note-label">A note from Nashira,</div>
              <div className="note-body">
                You are here before anyone else. That means something to me. I am opening 30 founding member spots for the first parents who believe in this before the official launch price goes live. This is my way of saying thank you for showing up early.
              </div>
            </div>
          </div>
        </div>

        {/* Staying Stuck Card */}
        <div className="content-card">
          <h3
            style={{
              fontFamily: "var(--font-caveat), 'Caveat', cursive",
              color: "var(--berry)",
              fontSize: "24px",
              lineHeight: 1.35,
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Think about what staying stuck is actually costing you right now.
          </h3>
          <p>
            The parenting books that never worked. The apps you downloaded and forgot. The guilt you carry every single day. The exhaustion that does not go away. Think about the hours you lose every week doing things your kids should be doing themselves. At even $10 an hour that is hundreds of dollars a month in lost time and energy alone.
          </p>
          <p style={{ color: "var(--berry)", fontWeight: 700 }}>
            Staying stuck is not free. It costs you every single day.
          </p>
          <p style={{ color: "var(--green-dark)", fontWeight: 700 }}>
            One payment. One time. And it stops.
          </p>
        </div>

        {/* Urgency Alert (Spots Warning) */}
        <div className="urgency-alert">
          <div className="alert-title">⚡ 30 Founding Spots Only</div>
          <div className="alert-body">
            This price closes permanently once all 30 spots are filled. It will not come back.
          </div>
        </div>

        {/* Second Green Button */}
        <div className="text-center" style={{ marginBottom: "28px" }}>
          <Link
            href={checkoutUrl}
            className="btn btn-green btn-glow cta-blink"
          >
            Get Instant Access Now
          </Link>
          <div className="secure-checkout-label">
            🔒 Secure Checkout
          </div>
        </div>

        {/* Steps Content Card */}
        <div className="content-card">
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "18px", color: "var(--ink)" }}>
            Here is exactly what happens after you click:
          </h3>
          
          <div className="step-item">
            <div className="step-num">1</div>
            <p>Complete your secure checkout. Takes less than 2 minutes.</p>
          </div>

          <div className="step-item">
            <div className="step-num">2</div>
            <p>Check your email. Your login arrives instantly.</p>
          </div>

          <div className="step-item">
            <div className="step-num green">3</div>
            <p>You are inside. Module 1 is waiting. Start today.</p>
          </div>
        </div>

        {/* Join Box */}
        <div className="join-box">
          <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "var(--ink)", marginBottom: "8px" }}>
            Join the first 30 parents building this inside their homes.
          </h3>
          <p>
            Every parent who starts today is already ahead of where they were yesterday.
          </p>
        </div>

        {/* Story Quote */}
        <div className="story-quote">
          Parents who build this system do not just change their mornings. They change their family's story. The parent who clicks this button today is not the same parent their kids will grow up remembering. They will remember the one who decided to build something different.
        </div>

        {/* Final Black Button */}
        <div className="text-center" style={{ marginBottom: "20px" }}>
          <Link
            href={checkoutUrl}
            className="btn btn-glow cta-blink"
          >
            Yes I Want This - Give Me Access
          </Link>
          <div className="secure-checkout-label">
            🔒 Secure Checkout
          </div>
          <div style={{ color: "var(--body)", fontSize: "13px" }}>
            Lifetime access. Results guarantee. A home that finally runs itself.
          </div>
        </div>

      </div>
    </section>
  );
}
