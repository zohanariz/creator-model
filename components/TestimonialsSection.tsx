"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface TestimonialsSectionProps {
  onOpenModal?: () => void;
}

export default function TestimonialsSection({ onOpenModal }: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videosContainerRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const [v1State, setV1State] = useState({ playing: false, muted: true });
  const [v2State, setV2State] = useState({ playing: false, muted: true });

  const syncV1State = () => {
    if (videoRef1.current) {
      setV1State({
        playing: !videoRef1.current.paused,
        muted: videoRef1.current.muted || videoRef1.current.volume === 0,
      });
    }
  };

  const syncV2State = () => {
    if (videoRef2.current) {
      setV2State({
        playing: !videoRef2.current.paused,
        muted: videoRef2.current.muted || videoRef2.current.volume === 0,
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".fold-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Autoplay Testimonial 1 video when the user comes near the testimonials section,
  // and automatically pause it when they scroll up away from it.
  useEffect(() => {
    const video = videoRef1.current;
    if (!video) return;

    // Intersection Observer to autoplay when entering viewport
    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Attempt to autoplay with audio first. If the browser blocks it due to autoplay policies,
            // fallback to muted autoplay.
            video.muted = false;
            video.play().catch((err) => {
              console.log("Autoplay with audio blocked by browser, falling back to muted:", err);
              video.muted = true;
              video.play().catch((muteErr) => {
                console.log("Muted autoplay also prevented:", muteErr);
              });
            });
          } else {
            // Pause when fully out of view
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        // Play when the video is at least 30% in view
        threshold: 0.3,
      }
    );

    playObserver.observe(video);

    // Scroll listener throttled with requestAnimationFrame
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingUp = currentScrollY < lastScrollY;
          lastScrollY = currentScrollY;

          if (isScrollingUp && !video.paused) {
            const rect = video.getBoundingClientRect();
            if (rect.top > window.innerHeight * 0.4) {
              video.pause();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      playObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Automatically pause other videos when they are scrolled out of the viewport
  useEffect(() => {
    if (!videosContainerRef.current) return;
    const videoElements = Array.from(videosContainerRef.current.querySelectorAll("video"))
      .filter((video) => video !== videoRef1.current); // Exclude video 1 as it has its own observer
    if (!videoElements.length) return;

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (!entry.isIntersecting) {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.1 } // triggers when less than 10% of the video is visible
    );

    videoElements.forEach((video) => videoObserver.observe(video));

    return () => {
      videoObserver.disconnect();
    };
  }, []);

  const testimonials = [
    { src: "/images/image_7.png", alt: "Instagram comment from @rahsmaforever" },
    { src: "/images/image_8.png", alt: "Instagram comment from @digital_g.e.m.s" },
    { src: "/images/image_9.png", alt: "Instagram comment from @zaniaandme" },
    { src: "/images/image_10.png", alt: "Instagram comment from @kiaratakia" },
    { src: "/images/image_11.png", alt: "Instagram comment from @_tinastuart" },
    { src: "/images/image_12.png", alt: "Instagram comment from @talithakoum07" },
    { src: "/images/image_13.png", alt: "Instagram comment from @cdeducationservice" },
  ];

  return (
    <section className="section">
      <div className="container-wide">
        <div
          className="eyebrow center gc-46"
          style={{
            fontFamily: "var(--font-caveat), 'Caveat', cursive",
            fontWeight: 700,
            color: "var(--berry)",
            fontSize: "46px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          <span style={{ background: "#EAF6EE", padding: "8px 20px", borderRadius: "24px", display: "inline-block" }}>
            Real Parents. Real Homes. Real Results.
          </span>
        </div>
        <p className="eyebrow center" style={{ marginTop: "50px" }}>
          What Parents Are Saying
        </p>

        <div className="fold-stack-wrap" ref={containerRef}>
          <div className="fold-stack" id="testimonialFoldStack">
            {testimonials.map((test, index) => (
              <div key={index} className="fold-card">
                <Image
                  src={test.src}
                  alt={test.alt}
                  width={460}
                  height={150}
                  className="rounded-xl shadow-lg border border-border"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>

        <h2 className="center" style={{ marginTop: "50px" }}>
          Don't take my word for it. See for yourself.
        </h2>
        <div 
          ref={videosContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center" 
          style={{ marginTop: "44px" }}
        >
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full max-w-[360px] rounded-2xl overflow-hidden bg-black shadow-lg border border-border hover:shadow-xl transition-all duration-300">
              <video
                ref={videoRef1}
                src="/videos/testimonial_1.mp4"
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate nofullscreen"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-auto block"
                onPlay={syncV1State}
                onPause={syncV1State}
                onVolumeChange={syncV1State}
              />
              {v1State.playing && v1State.muted && (
                <div
                  onClick={() => {
                    if (videoRef1.current) {
                      videoRef1.current.muted = false;
                      videoRef1.current.volume = 1;
                    }
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 68, 80, 0.85), rgba(12, 40, 50, 0.9))",
                    zIndex: 10,
                  }}
                >
                  <svg
                    className="w-16 h-16 text-white mb-4 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                  <div className="text-white text-center font-bold px-4">
                    <p className="text-xl md:text-2xl tracking-wide mb-1" style={{ textShadow: "none" }}>
                      Your Video Is Playing
                    </p>
                    <p className="text-lg md:text-xl font-semibold opacity-95" style={{ textShadow: "none" }}>
                      Click To Unmute
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full max-w-[360px] rounded-2xl overflow-hidden bg-black shadow-lg border border-border hover:shadow-xl transition-all duration-300">
              <video
                ref={videoRef2}
                src="/videos/testimonial_2.mp4"
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate nofullscreen"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-auto block"
                onPlay={syncV2State}
                onPause={syncV2State}
                onVolumeChange={syncV2State}
              />
              {v2State.playing && v2State.muted && (
                <div
                  onClick={() => {
                    if (videoRef2.current) {
                      videoRef2.current.muted = false;
                      videoRef2.current.volume = 1;
                    }
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 68, 80, 0.85), rgba(12, 40, 50, 0.9))",
                    zIndex: 10,
                  }}
                >
                  <svg
                    className="w-16 h-16 text-white mb-4 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                  <div className="text-white text-center font-bold px-4">
                    <p className="text-xl md:text-2xl tracking-wide mb-1" style={{ textShadow: "none" }}>
                      Your Video Is Playing
                    </p>
                    <p className="text-lg md:text-xl font-semibold opacity-95" style={{ textShadow: "none" }}>
                      Click To Unmute
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="kicker-line">
          <span
            style={{
              fontFamily: "var(--font-caveat), 'Caveat', cursive",
              fontWeight: 700,
              color: "var(--berry)",
              fontSize: "1.3em",
              letterSpacing: "0.02em",
            }}
          >
            These are parents just like you
          </span>
          , watching my content and already feeling the shift. Now imagine what happens inside the full program.
        </p>

        <div className="btn-row center">
          <CTAButton onClick={onOpenModal} className="btn btn-hero-glow">
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
            color: "#000",
            marginTop: "14px",
            textShadow: "0 0.8px 2.4px rgba(74,35,64,0.144)",
          }}
        >
          Lifetime access. Results guaranteed. A home that finally runs itself.
        </div>
      </div>
    </section>
  );
}
