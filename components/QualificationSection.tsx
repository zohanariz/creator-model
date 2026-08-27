import React from "react";
import CTAButton from "./CTAButton";

interface QualificationSectionProps {
  onOpenModal?: () => void;
}

export default function QualificationSection({ onOpenModal }: QualificationSectionProps) {
  const underlineSvgGreen =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12'%3E%3Cpath d='M2,7 C10,3 20,10 30,6 C40,2 50,9 60,5 C70,2 80,9 90,6 C100,3 110,8 118,5' stroke='%2300bf63' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";

  const avoidPoints = [
    {
      title: "You want your kids to change but you won't change anything yourself",
      desc: "The system starts with you. If you're not willing to look at how you show up, this won't work.",
    },
    {
      title: "You're looking for a quick fix",
      desc: "This is a real system you build inside your home. It takes consistency.",
    },
    {
      title: "You've already decided nothing works",
      desc: "Mindset comes before systems. If you walk in defeated, your results will match.",
    },
    {
      title: "You buy courses and never open them",
      desc: "This program works when you work it. If you're a collector, please keep your money.",
    },
    {
      title: "You want somebody to do the parenting for you",
      desc: "I'll hand you everything you need, but you still have to show up for your kids every day.",
    },
    {
      title: "You won't be consistent",
      desc: "Systems only work when you follow them. Not just on the good days.",
    },
  ];

  const helperPoints = [
    {
      title: "You're tired of surviving and ready to start building",
      desc: "You've been in survival mode long enough. You're ready for something that sticks.",
    },
    {
      title: "You want independent kids, not just obedient ones",
      desc: "You're not raising order-followers. You're raising kids who think and act on their own.",
    },
    {
      title: "You're willing to look at yourself first",
      desc: "You understand the home changes when the parent changes first.",
    },
    {
      title: "You're thinking beyond today",
      desc: "You're thinking about who your kid becomes at 18, 25, and beyond.",
    },
    {
      title: "You're ready to be consistent",
      desc: "You know real change doesn't happen overnight, and you're willing to put in the work.",
    },
    {
      title: "You're done feeling alone in this",
      desc: "You want a community, a plan, and somebody in your corner who's been through it.",
    },
  ];

  return (
    <section className="section">
      <div className="container-wide">
        <div className="qualify-intro">
          <div
            className="eyebrow gc-46"
            style={{
              color: "var(--berry)",
              fontSize: "46px",
              fontFamily: "var(--font-caveat), 'Caveat', cursive",
              fontWeight: 700,
              textTransform: "none",
              letterSpacing: "normal",
              display: "inline-block",
              backgroundImage: `url("${underlineSvgGreen}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 100%",
              backgroundSize: "100% 12px",
              paddingBottom: "10px",
            }}
          >
            Honest Truth
          </div>
          <h2>Some Parents I Genuinely Cannot Help.</h2>
        </div>
        <div className="qualify-cards">
          {/* Avoid / Red Card */}
          <div className="qualify-card no">
            <div className="qualify-card-head">
              <span className="mark">×</span>
              <h3>This Isn't for You If&hellip;</h3>
            </div>
            <p className="qualify-card-intro">
              Let me be straight with you: some parents I genuinely can't help, and I'd rather tell you now.
            </p>
            {avoidPoints.map((p, idx) => (
              <div key={idx} className="qualify-card-item">
                <span className="mark">×</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Help / Green Card */}
          <div className="qualify-card yes">
            <div className="qualify-card-head">
              <span className="mark">✓</span>
              <h3>This Is for You If&hellip;</h3>
            </div>
            <p className="qualify-card-intro">But if any of this sounds like you, you're exactly who I built this for.</p>
            {helperPoints.map((p, idx) => (
              <div key={idx} className="qualify-card-item">
                <span className="mark">✓</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="kicker-line">
          If your gut said &quot;
          <span
            style={{
              fontFamily: "var(--font-caveat), 'Caveat', cursive",
              fontWeight: 700,
              color: "#00bf63",
              fontSize: "1.3em",
              letterSpacing: "0.02em",
              textShadow: "0 0.8px 2.4px rgba(74,35,64,0.144)",
            }}
          >
            that's me
          </span>
          &quot; anywhere on that list, that's the part of you that's ready. Listen to it.
        </p>
        <div className="btn-row center">
          <CTAButton onClick={onOpenModal} className="btn btn-glow-green">
            I'm Ready. Let's Build.
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
