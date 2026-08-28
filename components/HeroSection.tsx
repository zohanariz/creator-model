"use client";

import React from "react";
import CTAButton from "./CTAButton";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState("00:00");
  const [progress, setProgress] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<"main" | "speed" | "quality">("main");
  const [currentSpeed, setCurrentSpeed] = React.useState(1.0);

  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const startControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3500);
  };

  React.useEffect(() => {
    if (showControls && isPlaying) {
      startControlsTimeout();
    } else {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (!hasStarted) {
      togglePlay();
      return;
    }
    if (isPlaying) {
      setShowControls(!showControls);
    } else {
      togglePlay();
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch((err) => console.error(err));
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.error(err));
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(false);
    } else {
      videoRef.current.play().catch((err) => console.log(err));
      setIsPlaying(true);
      setHasStarted(true);
      setShowControls(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMute = !isMuted;
    videoRef.current.muted = newMute;
    setIsMuted(newMute);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 0;
    
    // Progress percentage
    setProgress(duration > 0 ? (current / duration) * 100 : 0);
    
    // Format current time
    const minutes = Math.floor(current / 60);
    const seconds = Math.floor(current % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    setCurrentTime(`${formattedMinutes}:${formattedSeconds}`);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = newTime;
  };

  const syncState = () => {
    if (!videoRef.current) return;
    const playing = !videoRef.current.paused;
    setIsPlaying(playing);
    setIsMuted(videoRef.current.muted);
    if (playing) {
      setHasStarted(true);
    } else {
      setShowControls(false);
    }
  };

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const wrapper = document.querySelector(".vsl-settings-wrapper");
      if (wrapper && !wrapper.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    
    if (showSettings) {
      window.addEventListener("click", handleOutsideClick);
    }
    
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showSettings]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Pause video when scrolled out of view
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <section className="hero">
      <div className="container">
        <h1>
          You're Not A Bad Parent.{" "}
          <span className="signature" style={{ fontSize: "40px", lineHeight: "1" }}>
            You're One Person Doing The Job Of A Whole System.
          </span>
        </h1>
        <p className="lede center">
          Stop managing your kids all day, every day. Build a home that runs without you.
        </p>
        
        {/* Custom Premium Video Player Container */}
        <div 
          ref={containerRef} 
          className={`vsl-container ${isPlaying ? "is-playing" : ""} ${hasStarted ? "has-started" : ""}`} 
          onClick={handleContainerClick}
        >
          <video
            ref={videoRef}
            src="/videos/vsl.mp4"
            poster="/images/vsl_thumbnail_2.png"
            playsInline
            className="vsl-video"
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onPlay={syncState}
            onPause={syncState}
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Big Play Button Overlay */}
          {!isPlaying && (
            <div className="vsl-big-play-btn">
              <svg className="vsl-big-play-icon" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}

          {/* Muted / Autoplay Unmute Overlay Box */}
          {isPlaying && isMuted && (
            <div 
              className="vsl-unmute-overlay" 
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  setIsMuted(false);
                }
              }}
            >
              <div className="vsl-unmute-icon-container">
                <svg className="vsl-unmute-pulse-icon" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </div>
              <h3 className="vsl-unmute-title">Your Video Is Playing</h3>
              <p className="vsl-unmute-subtitle">Click To Unmute</p>
            </div>
          )}
          
          {/* Custom Overlay Controls */}
          <div 
            className={`vsl-controls ${showControls ? "vsl-controls-visible" : ""}`}
            style={!hasStarted ? { display: "none" } : undefined}
            onClick={(e) => {
              e.stopPropagation();
              if (isPlaying) {
                startControlsTimeout();
              }
            }}
          >
            {/* Scrubber / Progress Line */}
            <div className="vsl-progress-container" onClick={handleScrub}>
              <div 
                className="vsl-progress-bar" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Custom Pill Buttons Row */}
            <div className="vsl-buttons-row">
              {/* Play/Pause Button */}
              <button className="vsl-pill-btn" onClick={togglePlay}>
                {isPlaying ? (
                  // Pause Icon (II)
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  // Play Icon (>)
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              {/* Mute/Volume Control & Time Display Pill */}
              <button className="vsl-pill-btn vsl-time-pill" onClick={toggleMute}>
                {isMuted ? (
                  // Speaker Muted
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.03c1.37-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  // Speaker Playing
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
                <span className="vsl-time-text">{currentTime}</span>
              </button>

              {/* Settings Cog wrapper and menu popover */}
              <div className="vsl-settings-wrapper" style={{ marginLeft: "auto" }}>
                <button 
                  className={`vsl-pill-btn vsl-settings-btn ${showSettings ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSettings(!showSettings);
                    setActiveMenu("main");
                  }}
                  style={{ padding: "8px", width: "38px", height: "38px", minWidth: "38px" }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                  </svg>
                </button>

                {showSettings && (
                  <div className="vsl-settings-dropdown" onClick={(e) => e.stopPropagation()}>
                    {activeMenu === "main" && (
                      <div className="vsl-settings-menu">
                        <div 
                          className="vsl-settings-item"
                          onClick={() => setActiveMenu("quality")}
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                          </svg>
                          <span>Quality</span>
                          <span className="vsl-settings-value">Auto</span>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                        
                        <div 
                          className="vsl-settings-item"
                          onClick={() => setActiveMenu("speed")}
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                          </svg>
                          <span>Speed</span>
                          <span className="vsl-settings-value">
                            {currentSpeed === 1.0 ? "Normal" : `${currentSpeed}x`}
                          </span>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {activeMenu === "speed" && (
                      <div className="vsl-settings-menu">
                        <div 
                          className="vsl-settings-header"
                          onClick={() => setActiveMenu("main")}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                          <span>Speed</span>
                        </div>
                        
                        {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                          <div 
                            key={speed}
                            className={`vsl-settings-item-option ${currentSpeed === speed ? "selected" : ""}`}
                            onClick={() => {
                              if (videoRef.current) {
                                videoRef.current.playbackRate = speed;
                              }
                              setCurrentSpeed(speed);
                              setShowSettings(false);
                            }}
                          >
                            <span>{speed === 1.0 ? "Normal" : `${speed}x`}</span>
                            {currentSpeed === speed && (
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {activeMenu === "quality" && (
                      <div className="vsl-settings-menu">
                        <div 
                          className="vsl-settings-header"
                          onClick={() => setActiveMenu("main")}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                          <span>Quality</span>
                        </div>
                        
                        {["Auto", "1080p", "720p", "480p"].map((qual) => (
                          <div 
                            key={qual}
                            className={`vsl-settings-item-option ${qual === "Auto" ? "selected" : ""}`}
                            onClick={() => {
                              setShowSettings(false);
                            }}
                          >
                            <span>{qual}</span>
                            {qual === "Auto" && (
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <button 
                className="vsl-pill-btn vsl-fullscreen-btn"
                onClick={toggleFullscreen}
                style={{ padding: "8px", width: "38px", height: "38px", minWidth: "38px", marginLeft: "8px" }}
              >
                {isFullscreen ? (
                  // Exit Fullscreen Icon
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                  </svg>
                ) : (
                  // Enter Fullscreen Icon
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <p className="center hero-subtext" style={{ maxWidth: "600px" }}>
          I built this because I needed it. Step by step, I'll show you how to stop doing everything for your kids and start building a home where they contribute as well.
        </p>
        <div className="btn-row">
          <CTAButton onClick={onOpenModal} className="btn btn-hero-glow">
            I'm Ready. Let's Build.
          </CTAButton>
        </div>
        <div className="momentum-line center">
          The cycle breaks with you, or it continues with them.
        </div>
      </div>
    </section>
  );
}
