import { useState, useEffect, useRef } from "react";

export default function CursorDisk() {
  // DOM References
  const cursorRef = useRef(null);
  const observerRef = useRef(null);

  // Animation tracking
  const animationFrameId = useRef(null);

  // Mouse position tracking
  const mouseHistory = useRef([]);
  const isMoving = useRef(false);

  // Visibility states
  const [isFirstPanelVisible, setIsFirstPanelVisible] = useState(true);

  useEffect(() => {
    // Configure how many positions to remember (higher = more delay)
    const HISTORY_LENGTH = 10;

    // Configure how quickly the cursor catches up (lower = more trailing)
    const EASING = 0.1;

    // Track if mouse has ever moved
    let hasMouseMoved = false;

    // Setup Intersection Observer to detect when first panel is visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setIsFirstPanelVisible(entries[0]?.isIntersecting || false);
      },
      { threshold: 0.3 }
    );

    // Observe the first panel
    const firstPanel = document.getElementById("first-panel");
    if (firstPanel && observerRef.current) {
      observerRef.current.observe(firstPanel);
    }

    // Initialize mouse position history with offscreen position
    for (let i = 0; i < HISTORY_LENGTH; i++) {
      mouseHistory.current.push({ x: -100, y: -100 });
    }

    // Handle mouse movement
    const handleMouseMove = (e) => {
      // Record that mouse has moved at least once
      hasMouseMoved = true;
      isMoving.current = true;

      // Add current position to history and keep only recent positions
      mouseHistory.current.push({ x: e.clientX, y: e.clientY });
      if (mouseHistory.current.length > HISTORY_LENGTH) {
        mouseHistory.current.shift();
      }

      // Reset idle timer on each mouse move
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving.current = false;
      }, 100);
    };

    // Track when mouse stops moving
    let idleTimer;

    // Animation function that creates the trailing effect
    const animateCursor = () => {
      // Only proceed if we have a cursor element and mouse has moved
      if (cursorRef.current && hasMouseMoved && isFirstPanelVisible) {
        // Get the target position (oldest in our history for max delay)
        const targetPosition = mouseHistory.current[0];

        // Get current position by parsing transform or defaulting to center
        let currentTransform = cursorRef.current.style.transform;
        let currentX = 0;
        let currentY = 0;

        // Try to extract current position from transform
        if (currentTransform) {
          const match = currentTransform.match(
            /translate3d\(([^,]+),\s*([^,]+)/
          );
          if (match) {
            currentX = parseFloat(match[1]);
            currentY = parseFloat(match[2]);
          }
        }

        // Calculate new position with easing
        const newX = currentX + (targetPosition.x - currentX) * EASING;
        const newY = currentY + (targetPosition.y - currentY) * EASING;

        // Apply new position with translate3d for hardware acceleration
        cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`;

        // Apply additional styles based on movement state
        if (isMoving.current) {
          cursorRef.current.style.width = "120px";
          cursorRef.current.style.height = "120px";
        } else {
          // Slightly shrink when not moving
          cursorRef.current.style.width = "100px";
          cursorRef.current.style.height = "100px";
        }
      }

      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    // Start tracking mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animateCursor);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        mixBlendMode: "exclusion",
        zIndex: 1000,
        pointerEvents: "none",
        transition: "width 0.3s, height 0.3s",
        willChange: "transform, width, height",
        opacity: isFirstPanelVisible ? 1 : 0,
        visibility: isFirstPanelVisible ? "visible" : "hidden",
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    />
  );
}
