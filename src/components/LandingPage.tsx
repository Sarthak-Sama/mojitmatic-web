import React, { useState, useEffect, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import Strip from "./partials/Strip";

// Define interfaces for type safety
interface EmojiParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  size: number;
  speed: number;
  opacity: number;
}

interface MousePosition {
  x: number;
  y: number;
}

function LandingPage(): React.ReactElement {
  const [emojis, setEmojis] = useState<EmojiParticle[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastMousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const frameCount = useRef<number>(0);

  // List of emojis to randomly select from
  const emojiList: string[] = [
    "😂",
    "❤️",
    "🔥",
    "👍",
    "😍",
    "🎉",
    "👏",
    "🚀",
    "✨",
    "😊",
    "🙌",
    "💯",
    "🌟",
    "💪",
    "🥳",
    "😎",
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Function to create a new emoji
    const createEmoji = (x: number, y: number, mouseSpeed: number): void => {
      const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      const id = Date.now() + Math.random();
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const size = Math.random() * 20 + 10; // Random size between 10px and 30px
      const speed = Math.random() * 3 + 2 + mouseSpeed * 0.5; // Base speed + mouse speed influence

      setEmojis((prevEmojis) => [
        ...prevEmojis,
        {
          id,
          emoji,
          x,
          y,
          angle,
          size,
          speed,
          opacity: 1,
        },
      ]);

      // Remove emoji after animation completes
      setTimeout(() => {
        setEmojis((prevEmojis) => prevEmojis.filter((e) => e.id !== id));
      }, 1500);
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent): void => {
      // Get mouse position relative to the container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate mouse speed
      const dx = x - lastMousePosition.current.x;
      const dy = y - lastMousePosition.current.y;
      const mouseSpeed = Math.sqrt(dx * dx + dy * dy);

      // Update last position
      lastMousePosition.current = { x, y };

      // Throttle emoji creation based on frame count and mouse speed
      frameCount.current++;
      if (frameCount.current % 3 === 0 && mouseSpeed > 5) {
        createEmoji(x, y, mouseSpeed);
      }
    };

    // Animation loop to update emoji positions
    let animationFrameId: number;
    const animateEmojis = (): void => {
      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) => {
          // Calculate new position based on angle and speed
          const dx = Math.cos(emoji.angle) * emoji.speed;
          const dy = Math.sin(emoji.angle) * emoji.speed;

          return {
            ...emoji,
            x: emoji.x + dx,
            y: emoji.y + dy,
            opacity: emoji.opacity - 0.02, // Gradually fade out
            speed: emoji.speed * 0.98, // Gradually slow down
          };
        })
      );

      animationFrameId = requestAnimationFrame(animateEmojis);
    };

    // Start animation
    animateEmojis();

    // Add event listener
    container.addEventListener("mousemove", handleMouseMove as EventListener);

    // Cleanup
    return () => {
      container.removeEventListener(
        "mousemove",
        handleMouseMove as EventListener
      );
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center"
    >
      {/* Emoji particles */}
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute pointer-events-none"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
            fontSize: `${emoji.size}px`,
            opacity: emoji.opacity,
            transform: `rotate(${emoji.angle * 30}deg)`,
            transition: "opacity 0.5s ease-out",
            zIndex: 50,
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      <h2 className="font-[excon]! text-[1rem] md:text-[1.75rem] text-center -mb-6 z-10 relative">
        Forget the emoji menu—slash, use them like a pro, using
      </h2>
      <h1 className="font-[excon]! text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[12.5rem] z-10 relative">
        Mojimatic
      </h1>
      <h3 className="font-[excon]! z-10 relative">
        Just like you do on Discord
      </h3>

      {/* Text strips with improved copy */}
      <Parallax
        speed={-15}
        className="absolute top-[40%] shadow-xl -rotate-6 z-20"
      >
        <Strip text="ditch the emoji menu" direction="left" />
      </Parallax>

      <Parallax
        speed={-10}
        className="absolute top-[90%] shadow-xl rotate-3 z-20"
      >
        <Strip text="type emojis as fast as you think" direction="right" />
      </Parallax>
    </div>
  );
}

export default LandingPage;
