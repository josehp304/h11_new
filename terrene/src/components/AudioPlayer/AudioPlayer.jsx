"use client";
import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = 0.5;

    // Attempt to play on load
    const playAudio = async () => {
      try {
        await audio.play();
        setIsLoaded(true);
      } catch (error) {
        console.log("Autoplay prevented, waiting for user interaction");
        // If autoplay is blocked, try on first user interaction
        const handleInteraction = async () => {
          try {
            await audio.play();
            setIsLoaded(true);
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
          } catch (err) {
            console.error("Failed to play audio:", err);
          }
        };

        document.addEventListener("click", handleInteraction);
        document.addEventListener("touchstart", handleInteraction);
      }
    };

    playAudio();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/song/themeSong.mp3" type="audio/mpeg" />
      </audio>

      <button
        className={`audio-player-toggle ${isLoaded ? "loaded" : ""} ${
          isMuted ? "muted" : ""
        }`}
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        <div className="audio-icon">
          <div className="speaker">
            <div className="speaker-cone"></div>
          </div>
          <div className="sound-waves">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
          </div>
          <div className="mute-line"></div>
        </div>
      </button>
    </>
  );
}
