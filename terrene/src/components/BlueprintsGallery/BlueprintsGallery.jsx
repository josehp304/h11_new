"use client";
import "./BlueprintsGallery.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BlueprintsGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const overlayRef = useRef(null);
  const gridRef = useRef(null);

  const blueprintItems = [
    { id: 1, title: "Architectural Plan 1", image: "/blueprints/blueprint-1.jpg" },
    { id: 2, title: "Architectural Plan 2", image: "/blueprints/blueprint-2.jpg" },
    { id: 3, title: "Architectural Plan 3", image: "/blueprints/blueprint-3.jpg" },
    { id: 4, title: "Architectural Plan 4", image: "/blueprints/blueprint-4.jpg" },
    { id: 5, title: "Architectural Plan 5", image: "/blueprints/blueprint-5.jpg" },
    { id: 6, title: "Architectural Plan 6", image: "/blueprints/blueprint-6.jpg" },
    { id: 7, title: "Architectural Plan 7", image: "/blueprints/blueprint-7.jpg" },
    { id: 8, title: "Architectural Plan 8", image: "/blueprints/blueprint-8.jpg" },
    { id: 9, title: "Architectural Plan 9", image: "/blueprints/blueprint-9.jpg" },
    { id: 10, title: "Architectural Plan 10", image: "/blueprints/blueprint-10.jpg" },
    { id: 11, title: "Architectural Plan 11", image: "/blueprints/blueprint-11.jpg" },
    { id: 12, title: "Architectural Plan 12", image: "/blueprints/blueprint-12.jpg" },
    { id: 13, title: "Architectural Plan 13", image: "/blueprints/blueprint-13.jpg" },
    { id: 14, title: "Architectural Plan 14", image: "/blueprints/blueprint-14.jpg" },
    { id: 15, title: "Architectural Plan 15", image: "/blueprints/blueprint-15.jpg" },
  ];

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll(".blueprint-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  const handleImageClick = (item) => {
    setSelectedImage(item);
    if (overlayRef.current) {
      overlayRef.current.classList.add("active");
    }
  };

  const handleCloseOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.remove("active");
    }
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  return (
    <>
      <div className="blueprints-gallery-container">
        <div className="blueprints-header">
          <h1>Blueprints & Plans</h1>
          <p>Explore our architectural designs and technical drawings</p>
        </div>
        <div className="blueprints-grid" ref={gridRef}>
          {blueprintItems.map((item) => (
            <div
              key={item.id}
              className="blueprint-item"
              onClick={() => handleImageClick(item)}
            >
              <div className="blueprint-image-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="blueprint-title">
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="blueprints-overlay"
          ref={overlayRef}
          onClick={handleCloseOverlay}
        >
          <div className="blueprints-overlay-content">
            <button className="close-btn" onClick={handleCloseOverlay}>
              ✕
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <h2>{selectedImage.title}</h2>
          </div>
        </div>
      )}
    </>
  );
}
