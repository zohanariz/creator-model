import React from "react";
import CTAButton from "./CTAButton";

interface JourneyTimelineProps {
  variant: "negative" | "positive";
  onOpenModal?: () => void;
}

export default function JourneyTimeline({ variant, onOpenModal }: JourneyTimelineProps) {
  const isPositive = variant === "positive";

  const underlineSvgRed =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12'%3E%3Cpath d='M2,7 C10,3 20,10 30,6 C40,2 50,9 60,5 C70,2 80,9 90,6 C100,3 110,8 118,5' stroke='%23E24444' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";

  const underlineSvgGreen =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12'%3E%3Cpath d='M2,7 C10,3 20,10 30,6 C40,2 50,9 60,5 C70,2 80,9 90,6 C100,3 110,8 118,5' stroke='%2300bf63' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";

  return (
    <section className="section">
      <div className="container">
        <div className={`black-box ${isPositive ? "black-box-positive" : ""}`} style={{ background: "#000" }}>
          {isPositive ? (
            <>
              <p
                className="center gc-44"
                style={{
                  fontFamily: "var(--font-caveat), 'Caveat', cursive",
                  fontWeight: 400,
                  color: "#00bf63",
                  fontSize: "44px",
                  lineHeight: 1.2,
                  marginBottom: "14px",
                }}
              >
                ★ Now let me show you what happens when you do take action.
              </p>
              <p className="lede center" style={{ maxWidth: "560px", color: "#D5D5D5", margin: "0 auto" }}>
                Same timeline. Whole different life.
              </p>
            </>
          ) : (
            <>
              <p
                className="center gc-68"
                style={{
                  color: "#E24444",
                  fontFamily: "var(--font-caveat), 'Caveat', cursive",
                  fontWeight: 400,
                  fontSize: "68px",
                  marginBottom: "10px",
                  letterSpacing: "0.03em",
                }}
              >
                I'm not here to scare you.
              </p>
              <p className="center" style={{ color: "#D5D5D5", fontSize: "19px", fontWeight: 400, lineHeight: 1.5, marginBottom: "20px" }}>
                I need you to be honest with yourself for a minute.
              </p>
            </>
          )}

          <div className="today-standalone">
            <div className="j-pin today-pin">Today</div>
            <svg
              className="today-arrow-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9B2F52"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v14M6 13l6 6 6-6" />
            </svg>
          </div>

          <div className="center" style={{ maxWidth: "600px", margin: "0 auto" }}>
            {isPositive ? (
              <p style={{ color: "#D5D5D5", fontSize: "19px", fontWeight: 600, lineHeight: 1.5 }}>
                You started implementing Raise Them Ready.
              </p>
            ) : (
              <p style={{ color: "#D5D5D5", fontSize: "19px", fontWeight: 600, lineHeight: 1.5 }}>
                Look at where you are{" "}
                <span
                  style={{
                    backgroundImage: `url("${underlineSvgRed}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 100%",
                    backgroundSize: "100% 10px",
                    paddingBottom: "4px",
                  }}
                >
                  right now
                </span>
                . Now picture this over{" "}
                <span
                  style={{
                    backgroundImage: `url("${underlineSvgRed}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 100%",
                    backgroundSize: "100% 10px",
                    paddingBottom: "4px",
                  }}
                >
                  20 years
                </span>
                , when things continue the same way.
              </p>
            )}
          </div>

          <div className="journey">
            {/* 1 Year */}
            <div className="j-stop">
              <div className="j-pin">1YR</div>
              <div className="j-card">
                <h3>1 Year From Now</h3>
                {isPositive ? (
                  <p>
                    Your mornings look completely different. Your kids know what to do without being told. You're not the
                    alarm clock anymore - you're just the parent watching your system work.
                  </p>
                ) : (
                  <p>
                    Your mornings look just like this one. Same reminders. Same arguments. Same exhaustion before the day
                    even starts.
                  </p>
                )}
              </div>
              <div className="j-connector"></div>
            </div>

            {/* 3 Years */}
            <div className="j-stop">
              <div className="j-pin">3YR</div>
              <div className="j-card">
                <h3>3 Years From Now</h3>
                {isPositive ? (
                  <p>
                    The habits belong to them, not you. Your kid packs their own bag, manages their own time, and it feels
                    normal to them because it's been their life for three years.
                  </p>
                ) : (
                  <p>
                    Your kid is older but the habits haven't moved an inch. You're still packing the bag. Still reminding.
                    Still doing what they should be doing for themselves.
                  </p>
                )}
              </div>
              <div className="j-connector"></div>
            </div>

            {/* 5 Years */}
            <div className="j-stop">
              <div className="j-pin">5YR</div>
              <div className="j-card">
                <h3>5 Years From Now</h3>
                {isPositive ? (
                  <p>
                    You've got a teenager who's genuinely capable. Runs their own morning. Doesn't wait to be told. And
                    you? You have your time back.
                  </p>
                ) : (
                  <p>
                    You've got a teenager who still waits to be told what to do. Can't run their own morning. Still
                    leaning on you for things they should've owned years ago.
                  </p>
                )}
              </div>
              <div className="j-connector"></div>
            </div>

            {/* 10 Years */}
            <div className="j-stop">
              <div className="j-pin">10YR</div>
              <div className="j-card">
                <h3>10 Years From Now</h3>
                {isPositive ? (
                  <p>
                    They leave home ready. Not just book-ready - life-ready. They can run a home, handle an emergency,
                    manage money, and show up for themselves.
                  </p>
                ) : (
                  <p>
                    They leave your house. And the world does not care that nobody built the foundation. It just exposes
                    what they don't know.
                  </p>
                )}
              </div>
              <div className="j-connector"></div>
            </div>

            {/* 20 Years */}
            <div className="j-stop">
              <div className="j-pin">20YR</div>
              <div className="j-card">
                <h3>20 Years From Now</h3>
                {isPositive ? (
                  <p>
                    They're raising their own kids intentionally, because that's all they've ever known. The cycle you
                    broke in your home became the foundation they built theirs on.
                  </p>
                ) : (
                  <p>
                    They're raising their own kids the only way they know how: the way they were raised, and the cycle keeps
                    right on going.
                  </p>
                )}
              </div>
            </div>
          </div>

          {isPositive ? (
            <p className="kicker-line" style={{ color: "#fff" }}>
              That's what Raise Them Ready is really about.{" "}
              <span
                className="gc-35"
                style={{
                  fontFamily: "var(--font-caveat), 'Caveat', cursive",
                  fontWeight: 400,
                  color: "#00bf63",
                  fontSize: "35px",
                  lineHeight: 1,
                }}
              >
                Not just calmer mornings. A different legacy.
              </span>
            </p>
          ) : (
            <p className="kicker-line" style={{ color: "#fff" }}>
              This isn't about blame. It's about a window.{" "}
              <span
                className="gc-44"
                style={{
                  fontFamily: "var(--font-caveat), 'Caveat', cursive",
                  fontWeight: 400,
                  color: "#00bf63",
                  fontSize: "44px",
                  lineHeight: 1,
                }}
              >
                You have a window right now to build something different
              </span>
              , and every day you wait, that window closes a little more.
            </p>
          )}

          <div className="btn-row center">
            <CTAButton
              onClick={onOpenModal}
              className="btn btn-glow-white !bg-[#09894b] hover:!bg-[#076e3c]"
            >
              I'm Ready. Let's Build.
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
