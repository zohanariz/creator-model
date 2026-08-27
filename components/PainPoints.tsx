import React from "react";

export default function PainPoints() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="center" style={{ maxWidth: "600px" }}>
          If your{" "}
          <svg
            style={{
              width: "0.95em",
              height: "0.95em",
              verticalAlign: "-0.12em",
              display: "inline-block",
              marginRight: "-0.08em",
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--berry)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.4 19.3c-2.6-2.1-8.6-6.5-8.9-10.6-.2-2.7 1.8-4.7 4.2-4.5 1.9.1 3 1.4 3.6 2.7.9-1.2 2.2-2.6 4.1-2.5 2.5.1 4.3 2.4 4 5-.5 4-6.2 7.8-7 9.9z" />
          </svg>
          {" "}heart just said "
          <span className="signature" style={{ fontSize: "1.15em", marginRight: "0.12em" }}>
            yes
          </span>
          " to any of this, you're in the right place.
        </h2>
        <div className="pain-list" style={{ marginTop: "40px" }}>
          <div className="pain-item">
            <div className="icon-badge"></div>
            <p>You're the alarm clock, the reminder app, the chef, the maid, and the referee. All before 9am.</p>
          </div>
          <div className="pain-item">
            <div className="icon-badge"></div>
            <p>You keep telling yourself it'll get easier when they get older. They're older, it's not easier.</p>
          </div>
          <div className="pain-item">
            <div className="icon-badge"></div>
            <p>You love your kids more than anything on this earth and you are tired-tired.</p>
          </div>
          <div className="pain-item">
            <div className="icon-badge"></div>
            <p>Your home never feels calm. It feels like you're one missed reminder away from the whole day falling apart.</p>
          </div>
          <div className="pain-item">
            <div className="icon-badge"></div>
            <p>You've googled "how to get kids to listen" more times than you'd ever admit out loud.</p>
          </div>
          <div className="pain-item">
            <div className="icon-badge"></div>
            <p>You're not asking for perfect kids. You just want kids who can handle the basics without a meltdown.</p>
          </div>
          <div className="pain-item">
            <div className="icon-badge"></div>
            <p>And the worst part isn't even the chaos. It's that nothing you try ever sticks.</p>
          </div>
        </div>
        <p className="kicker-line">
          That exhaustion you feel? <span className="signature" style={{ fontSize: "1.2em" }}>That's not weakness.</span>
          <br />
          That's what happens when one person is the whole system.
        </p>
      </div>
    </section>
  );
}
