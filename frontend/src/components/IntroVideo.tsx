import React, { useState, useEffect } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already seen the intro
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    // Auto-fade after 6.5 seconds (gives time for 5 sec video + 1.5 sec pause)
    const timer = setTimeout(() => {
      setFadeOut(true);
      sessionStorage.setItem('hasSeenIntro', 'true');
      
      // Call onComplete after fade animation finishes
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 6500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleVideoEnd = (): void => {
    // Wait 1 second after video ends before starting fade
    setTimeout(() => {
      setFadeOut(true);
      sessionStorage.setItem('hasSeenIntro', 'true');
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 1000);
  };

  const handleSkip = (): void => {
    setFadeOut(true);
    sessionStorage.setItem('hasSeenIntro', 'true');
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-teal-900 flex items-center justify-center transition-opacity duration-[1500ms] ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="max-w-4xl max-h-screen w-auto h-auto object-contain"
      >
        <source src="/cover.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Skip button */}
      <button 
        onClick={handleSkip}
        className="absolute bottom-8 right-8 px-6 py-3 bg-teal-700 text-amber-200 border border-teal-900 rounded hover:bg-teal-600 transition-colors backdrop-blur-md text-sm"
      >
        Skip Intro →
      </button>
    </div>
  );
};

export default IntroVideo;