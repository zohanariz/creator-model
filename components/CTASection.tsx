import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface CTASectionProps {
  onOpenModal?: () => void;
}

export default function CTASection({ onOpenModal }: CTASectionProps) {
  const inclusions = [
    "Lifetime access to all 5 modules",
    "Weekly live coaching calls with me",
    "Private parent community",
    "Actionable tasks plus PDFs and Worksheets",
    "Quarterly lucky draw to meet me in person",
    "Results in weeks, not months",
  ];

  return (
    <section className="section section-dark" style={{ textAlign: "center" }}>
      <div className="container">
        <div
          className="eyebrow center gc-32"
          style={{
            fontFamily: "var(--font-caveat), 'Caveat', cursive",
            fontWeight: 700,
            color: "#00bf63",
            fontSize: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          You Made It This Far For A Reason
        </div>
        <h2>If You're at the Bottom of This Page, Something in You Already Knows This Is for You.</h2>
        <p className="lede center" style={{ margin: "0 auto" }}>
          You didn't read all of that by accident. You read it because your home deserves better. Your kids deserve
          better. And so do you.
        </p>

        <div className="final-card">
          <Image
            src="/images/image_14.jpeg"
            alt="Raise Them Ready overview"
            width={480}
            height={320}
            className="w-full h-auto block rounded-xl mb-4"
            style={{ objectFit: "cover" }}
          />
          <h3>When you join Raise Them Ready, you get:</h3>
          <div className="final-list">
            {inclusions.map((item, idx) => (
              <div
                key={idx}
                className="qualify-item yes"
                style={idx === inclusions.length - 1 ? { borderBottom: "none" } : undefined}
              >
                <div className="mark">✓</div>
                <p style={{ color: "var(--ink)" }}>{item}</p>
              </div>
            ))}
          </div>
          <p className="final-note">
            &quot;And I stay with you until you see real results in your home. That's my word to every parent who
            joins.&quot;
          </p>
        </div>

        <div className="btn-row center" style={{ marginTop: "34px" }}>
          <CTAButton
            onClick={onOpenModal}
            className="btn btn-glow-white !bg-[#09894b] hover:!bg-[#076e3c]"
          >
            I'm Ready. Let's Build &rarr;
          </CTAButton>
        </div>
        <p
          className="closer"
          style={{
            fontFamily: "var(--font-caveat), 'Caveat', cursive",
            fontWeight: 400,
            fontSize: "19px",
            letterSpacing: "0.02em",
            color: "#fff",
          }}
        >
          Lifetime access. Results guaranteed. A home that finally runs itself.
        </p>
      </div>
    </section>
  );
}
