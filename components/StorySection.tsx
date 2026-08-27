import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface StorySectionProps {
  onOpenModal?: () => void;
}

export default function StorySection({ onOpenModal }: StorySectionProps) {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="story-grid">
          <div className="story-avatar-col">
            <Image
              className="avatar"
              src="/images/image_0.png"
              alt="Nashira"
              width={100}
              height={130}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="story-text-col">
            <h2>
              Hey, I'm{" "}
              <span className="signature gc-nashira" style={{ fontSize: "40px", marginRight: "0.1em" }}>
                Nashira
              </span>
              .
            </h2>
            <p className="story-italic" style={{ marginBottom: "6px" }}>
              Somebody should have told me this a long time ago. Nobody did.
            </p>
            <p className="story-italic">I had to figure it out the hard way, and I don't want that for you.</p>
            <blockquote className="story-quote">
              The problem was never your kids, and it was never you. It's that nobody ever showed you how to build a
              home that actually runs.
            </blockquote>
            <div className="story-body">
              <p>
                There was a season when my home was running me. I was the alarm clock. The reminder. The chef. The maid.
                The fixer of every single thing, every single day. I'm an AuDHD mom, I was parenting with no real
                system, and I was drowning. Nobody around me was talking about it. So I figured it out myself.
              </p>
              <p>
                And here's the part that hit me: before I ever stepped into a classroom, I ran multi-million dollar
                logistics operations. I built systems that moved thousands of packages a day without anybody
                babysitting them. But at home? I was hand-carrying every single thing myself. The day I started running
                my home the way I ran my operations, everything changed.
              </p>
              <p>
                Most of us learned parenting by watching how we were parented. Our parents managed us day-by-day. They
                did it for us because it was faster. They kept the peace instead of building the skill. That pattern
                didn't stop with them. It got handed down.
              </p>
              <p>
                <strong style={{ color: "var(--ink)" }}>A system changes that.</strong> Not a chore chart. Not another
                app. Not one more parenting book collecting dust on your nightstand.
              </p>
            </div>
            <div className="story-callout">
              A real system is a structure your kids live inside every single day. A morning routine they run without
              being asked. Responsibilities with their name on them and nobody else's. A home where everybody, kids
              included, knows their role. You build it once. It runs from there.
            </div>
            <div className="story-body">
              <p>
                <strong style={{ color: "var(--ink)" }}>Here's what I know for sure:</strong> convenience is the enemy
                of prepared kids. Every time we do it for them because it's faster, we're borrowing against their future.
              </p>
              <p>
                That's exactly what <strong style={{ color: "var(--ink)" }}>Raise Them Ready</strong> gives you - the
                system nobody gave us.
              </p>
            </div>
            <div className="btn-row">
              <CTAButton onClick={onOpenModal} className="btn btn-hero-glow">
                I'm Ready. Let's Build.
              </CTAButton>
            </div>
            <div className="momentum-line">The cycle breaks with you, or it continues with them.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
