import React from "react";
import CTAButton from "./CTAButton";

interface IncludedSectionProps {
  onOpenModal?: () => void;
}

export default function IncludedSection({ onOpenModal }: IncludedSectionProps) {
  const underlineSvgGreen =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12'%3E%3Cpath d='M2,7 C10,3 20,10 30,6 C40,2 50,9 60,5 C70,2 80,9 90,6 C100,3 110,8 118,5' stroke='%2300bf63' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";

  return (
    <section className="section">
      <div className="container">
        <div className="included-intro">
          <div
            className="eyebrow"
            style={{
              fontSize: "26px",
              display: "inline-block",
              borderBottom: "2px solid #00bf63",
              paddingBottom: "6px",
            }}
          >
            Everything Included
          </div>
          <h2
            className="gc-42"
            style={{
              fontFamily: "var(--font-caveat), 'Caveat', cursive",
              fontWeight: 700,
              color: "var(--berry)",
              fontSize: "42px",
              lineHeight: 1.25,
            }}
          >
            The Course Is Just the Start. Here's What Comes With It.
          </h2>
          <p className="lede">
            When you join Raise Them Ready, you're not buying a course to watch by yourself at midnight. You're getting
            a whole support system to make sure you actually follow through.
          </p>
        </div>
        <div className="included-grid">
          <div className="included-card">
            <div className="included-icon berry">📞</div>
            <h3>Weekly Group Coaching Calls</h3>
            <p>
              Every week, you show up live with me and the community. You ask your questions. You get straight answers.
              I'm there every single week keeping you moving.
            </p>
          </div>
          <div className="included-card">
            <div className="included-icon navy">👥</div>
            <h3>Private Parent Community</h3>
            <p>
              A private space full of parents building exactly what you're building. Share your progress, celebrate
              your wins, and stay accountable - you'll have people who truly get it because they're living it too.
            </p>
          </div>
          <div className="included-card">
            <div className="included-icon green">✅</div>
            <h3>Actionable Tasks That Create Real Change</h3>
            <p>
              Every module comes with specific tasks that create real change inside your home. Not theory. Not busy
              work. Actions you can feel working within weeks.
            </p>
          </div>
          <div className="included-card">
            <div className="included-icon berry">⚡</div>
            <h3>Results in Weeks. Not Months. Not Years.</h3>
            <p>
              You won't wait a year to feel the difference. Parents in this program notice real shifts in the first few
              weeks - your kids, your mornings, your energy.
            </p>
          </div>
          <div className="included-bonus">
            <span className="icon-emoji">✈️</span>
            <h3 className="bonus-heading">
              <span
                style={{
                  backgroundImage: `url("${underlineSvgGreen}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 100%",
                  backgroundSize: "100% 10px",
                  paddingBottom: "4px",
                }}
              >
                Win a Trip
              </span>{" "}
              to Atlanta - Your Expenses on Me
            </h3>
            <p>
              Every 3 months I run a live lucky draw on Instagram Live. Every member of the community is automatically
              in. One parent wins a fully covered flight and hotel stay to come spend real time with me in person. No
              hand-picking. No favorites. Just your name in the hat every quarter.
            </p>
            <div className="tag-row">
              <span className="pill-tag">Exclusive Bonus</span>
              <span className="pill-tag">Live on Instagram</span>
              <span className="pill-tag">Every 3 Months</span>
            </div>
          </div>
        </div>
        <div className="btn-row center">
          <CTAButton onClick={onOpenModal} className="btn" style={{ border: "1px solid #00bf63" }}>
            I'm Ready. Let's Build.
          </CTAButton>
        </div>
        <div
          className="center"
          style={{
            fontFamily: "var(--font-caveat), 'Caveat', cursive",
            fontWeight: 400,
            fontSize: "19px",
            letterSpacing: "0.02em",
            color: "#00bf63",
            marginTop: "14px",
            textShadow: "0 0.5px 1.5px rgba(74,35,64,0.09)",
          }}
        >
          Lifetime access. Results guaranteed. A home that finally runs itself.
        </div>
      </div>
    </section>
  );
}
