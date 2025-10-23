"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import Preloader from "@/components/Preloader/Preloader";

let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const [showEnhancedPreloader, setShowEnhancedPreloader] = useState(isInitialLoad);
  const hasEnhancedInit = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  const handleEnhancedPreloaderReady = (tl) => {
    if (hasEnhancedInit.current) return;
    hasEnhancedInit.current = true;

    setLoaderAnimating(true);

    // Continue the timeline after preloader animations
    tl.to(
      [".enhanced-preloader", ".split-overlay"],
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: 1,
        ease: "hop",
      },
      5.5
    )
      .to(
        [".enhanced-preloader", ".split-overlay"],
        {
          y: (i) => (i === 0 ? "-50%" : "50%"),
          duration: 1,
          ease: "hop",
        },
        5.5
      )
      .to(
        ".tags-overlay",
        {
          opacity: 0,
          duration: 0.5,
          ease: "hop",
        },
        5.5
      )
      .to(
        ".hero-content",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "hop",
          onComplete: () => {
            gsap.set([".enhanced-preloader", ".split-overlay", ".tags-overlay"], { 
              display: "none" 
            });
            setShowEnhancedPreloader(false);
            setLoaderAnimating(false);
          },
        },
        5
      );
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);
      const counts = document.querySelectorAll(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-100%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }
      });

      tl.to(".spinner", {
        opacity: 0,
        duration: 0.3,
      });

      tl.to(
        ".word h1",
        {
          y: "0%",
          duration: 1,
        },
        "<"
      );

      tl.to(".divider", {
        scaleY: "100%",
        duration: 1,
        onComplete: () =>
          gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
      });

      tl.to("#word-1 h1", {
        y: "100%",
        duration: 1,
        delay: 0.3,
      });

      tl.to(
        "#word-2 h1",
        {
          y: "-100%",
          duration: 1,
        },
        "<"
      );

      tl.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          delay: 0.75,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        "<"
      );
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  return (
    <>
      {showEnhancedPreloader && (
        <Preloader 
          onAnimationReady={handleEnhancedPreloaderReady}
          mainTitle="House Of Eleven"
          logoNumber="11"
          tags={["Architecture", "Interior Design", "Spatial Planning"]}
        />
      )}
      {showPreloader && (
        <div className="loader" style={{ display: 'none' }}>
          <div className="overlay">
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="intro-logo">
            <div className="word" id="word-1">
              <h1>
                <span>Revo Realtors</span>
              </h1>
            </div>
            <div className="word" id="word-2">
              <h1>Balance</h1>
            </div>
          </div>
          <div className="divider"></div>
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <Nav />
      <section className="hero">
        <div className="hero-bg">
          <img src="/home/hero.jpg" alt="" />
        </div>
        {/* <div className="hero-gradient"></div>  */}
        <div className="container1">
          <div className="hero-content" style={{ opacity: showEnhancedPreloader ? 0 : 1, transform: showEnhancedPreloader ? 'translateY(20px)' : 'translateY(0)' }}>
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showEnhancedPreloader ? 7 : 0.85}>
                <h1>Spaces that feel rooted, human, and quietly bold</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showEnhancedPreloader ? 7.15 : 1}>
                <p>
                  At Revo Realtors, we shape environments that elevate daily life,
                  invite pause, and speak through texture and light.
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="Discover More"
              route="/studio"
              animateOnScroll={false}
              delay={showEnhancedPreloader ? 7.3 : 1.15}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>225+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>Completed design studies</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>36</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>Ongoing spatial explorations</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>12</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>Cross-disciplinary collaborators</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>98%</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>Return rate across commissions</p>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                At Revo Realtors, we design with purpose and clarity, creating spaces
                that speak through light, scale, and the quiet confidence of
                lasting form.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>How we work</p>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">
                  We approach each build with a clarity of intent. Every plan is
                  shaped through research, iteration, and conversation. What
                  remains is the essential, designed to last and built to feel
                  lived in.
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>Quiet</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>View</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Tactile</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Light-forward</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Slow design</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Modular rhythm</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Featured work</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>A selection of recent studies and completed spaces</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      <section className="client-reviews-container">
        <div className="container">
          <div className="client-reviews-header-callout">
            <p>Voices from our spaces</p>
          </div>
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img src="/gallery-callout/gallery-callout-1.jpg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img src="/gallery-callout/gallery-callout-2.jpg" alt="" />
                <div className="gallery-callout-img-content">
                  <h3>800+</h3>
                  <p>Project Images</p>
                </div>
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img src="/gallery-callout/gallery-callout-3.jpg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img src="/gallery-callout/gallery-callout-4.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>
                  Take a closer look at the projects that define our practice.
                  From intimate interiors to expansive landscapes, each image
                  highlights a unique perspective that might spark your next big
                  idea.
                </h3>
              </Copy>
              <AnimatedButton label="Explore Gallery" route="blueprints" />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="/home/home-cta-window.jpg"
        header="Revo Realtors"
        callout="Spaces that breathe with time"
        description="Our approach is guided by rhythm, proportion, and light, allowing every environment to grow more meaningful as it is lived in."
      />
      <ConditionalFooter />
    </>
  );
}
