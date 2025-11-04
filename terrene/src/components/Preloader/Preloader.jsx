"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitType from "split-type";

export default function Preloader({ 
  className = "", 
  onAnimationReady,
  mainTitle = "House Of Eleven",
  logoNumber = "H11",
  tags = ["Architecture", "Interior Design", "Spatial Planning"]
}) {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", ".8, 0, .3, 1");

    const splitTextElements = (
      selector,
      type = "words,chars",
      addFirstChar = false
    ) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const splitText = new SplitType(element, {
          types: type,
          tagName: 'span'
        });
        
        if (type.includes("chars")) {
          splitText.chars.forEach((char, index) => {
            const originalText = char.textContent;
            char.innerHTML = `<span>${originalText}</span>`;
            if (addFirstChar && index === 0) {
              char.classList.add("first-char");
            }
          });
        }
      });
    };

    // Split text elements
    splitTextElements(".intro-title h1", "words,chars", true);
    splitTextElements(".outro-title h1", "words,chars");
    splitTextElements(".tag p", "words");

    const isMobile = window.innerWidth <= 1000;

    // Initial setup for split overlay
    gsap.set(
      [
        ".split-overlay .intro-title .first-char span",
        ".split-overlay .outro-title .char span",
      ],
      { y: "0%" }
    );
    
    gsap.set(".split-overlay .intro-title .first-char", {
      x: isMobile ? "7.5rem" : "17rem",
      y: isMobile ? "-1rem" : "-2.75rem",
      fontWeight: "900",
      scale: 0.75,
    });
    
    gsap.set(".split-overlay .outro-title .char", {
      x: isMobile ? "-3rem" : "-8rem",
      fontSize: isMobile ? "6rem" : "14rem",
    });

    // Create main timeline
    const tl = gsap.timeline({ defaults: { ease: "hop" } });
    const tagElements = gsap.utils.toArray(".tag");
    
    // Animate tags
    tagElements.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll("p .word"),
        {
          y: "0%",
          duration: 0.75,
        },
        0.5 + index * 0.1
      );
    });
    
    // Main animation sequence
    tl.to(
      ".enhanced-preloader .intro-title .char span",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.05,
      },
      0.5
    )
      .to(
        ".enhanced-preloader .intro-title .char:not(.first-char) span",
        {
          y: "100%",
          duration: 0.75,
          stagger: 0.06,
        },
        2
      )
      .to(
        ".enhanced-preloader .outro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.5,
        },
        2.5
      )
      .to(
        ".enhanced-preloader .intro-title .first-char",
        {
          x: isMobile ? "9rem" : "20.25rem",
          duration: 1,
        },
        3.5
      )
      .to(
        ".enhanced-preloader .outro-title .char",
        {
          x: isMobile ? "-3rem" : "-8rem",
          duration: 1,
        },
        3.5
      )
      .to(
        ".enhanced-preloader .intro-title .first-char",
        {
          x: isMobile ? "7.5rem" : "17rem",
          y: isMobile ? "-1rem" : "-2.75rem",
          fontWeight: "900",
          scale: 0.75,
          duration: 0.75,
        },
        4.5
      )
      .to(
        ".enhanced-preloader .outro-title .char",
        {
          x: isMobile ? "-3rem" : "-8rem",
          fontSize: isMobile ? "6rem" : "14rem",
          duration: 0.75,
          onComplete: () => {
            gsap.set(".enhanced-preloader", {
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            });
            gsap.set(".split-overlay", {
              clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            });
          },
        },
        4.5
      );

    // Pass the timeline to parent so it can continue the animation
    if (onAnimationReady) {
      onAnimationReady(tl);
    }
  }, [onAnimationReady]);

  return (
    <>
      <div className={`enhanced-preloader ${className}`}>
        <div className="intro-title">
          <h1>{mainTitle}</h1>
        </div>
        <div className="outro-title">
          <h1>{logoNumber}</h1>
        </div>
      </div>
      <div className="split-overlay">
        <div className="intro-title">
          <h1>{mainTitle}</h1>
        </div>
        <div className="outro-title">
          <h1>{logoNumber}</h1>
        </div>
      </div>
      <div className="tags-overlay">
        {tags.map((tag, index) => (
          <div key={index} className={`tag tag-${index + 1}`}>
            <p>{tag}</p>
          </div>
        ))}
      </div>
    </>
  );
}
