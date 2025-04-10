import { useState } from "react";

function Footer() {
  const [hoverEmoji, setHoverEmoji] = useState("🐛");
  const [isWaving, setIsWaving] = useState(false);

  const emojis = ["🐛", "🤔", "💡", "🚀", "🎉"];

  const handleMouseEnter = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setHoverEmoji(randomEmoji);
    setIsWaving(true);
  };

  const handleMouseLeave = () => {
    setIsWaving(false);
  };

  return (
    <footer className="w-full bg-white py-12 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side with bug bounty */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`text-3xl transition-transform duration-300 ${
                  isWaving ? "animate-wave" : ""
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {hoverEmoji}
              </div>
              <h3 className="text-xl font-[excon] text-[#1d1e20]">
                Found a Bug? Join the 0 Other People Who Did!
              </h3>
            </div>

            <p className="text-[#5a6672] mb-4">
              If you find any bugs, please tell me! I'll act surprised like I
              didn't already know about them. I promise to fix them...{" "}
              <span className="line-through opacity-70">
                after I finish binging Netflix
              </span>{" "}
              immediately! Or at least before the heat death of the universe.
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://x.com/Sarthak_Sama"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#f0f4f5] hover:bg-[#e4eaeb] rounded-lg flex items-center gap-2 transition-colors"
              >
                {/* Updated X logo */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                <span className="text-[#1d1e20]">Report via X</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sarthak-saklani-734b85235"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#f0f4f5] hover:bg-[#e4eaeb] rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0A66C2]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-[#1d1e20]">Message on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right side with creative element */}
          <div className="relative w-full max-w-xs h-40">
            {/* Bug report form illustration */}
            <div className="absolute right-0 bottom-0 w-full h-full bg-[#f0f4f5] rounded-lg shadow-lg transform rotate-2 transition-all hover:rotate-0">
              <div className="absolute top-2 left-2 h-3 w-48 bg-[#e0e6e8] rounded-full"></div>
              <div className="absolute top-8 left-2 h-3 w-36 bg-[#e0e6e8] rounded-full"></div>
              <div className="absolute top-14 left-2 h-3 w-40 bg-[#e0e6e8] rounded-full"></div>
              <div className="absolute top-20 left-2 h-3 w-28 bg-[#e0e6e8] rounded-full"></div>

              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-[#5a6672]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>100% will fix</span>
              </div>
            </div>

            {/* Emoji stickers */}
            <div className="absolute top-2 left-4 transform -rotate-12 bg-white shadow-sm p-1 rounded-lg text-xl animate-float-slow">
              ❤️
            </div>
            <div className="absolute right-12 top-0 transform rotate-6 bg-white shadow-sm p-1 rounded-lg text-xl animate-float-medium">
              🔥
            </div>
            <div className="absolute left-12 bottom-6 transform rotate-3 bg-white shadow-sm p-1 rounded-lg text-xl animate-float-fast">
              🚀
            </div>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-gray-100 text-center text-[#5a6672] text-sm">
          <p>
            © {new Date().getFullYear()} Mojimatic — Made with 🧠 and ⌨️ — Not a
            single emoji was harmed in the making of this website
          </p>
        </div>
      </div>

      {/* Add animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          20% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-8deg);
          }
          60% {
            transform: rotate(14deg);
          }
          80% {
            transform: rotate(-4deg);
          }
          100% {
            transform: rotate(10deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(-12deg);
          }
          50% {
            transform: translateY(-10px) rotate(-8deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) rotate(6deg);
          }
          50% {
            transform: translateY(-6px) rotate(9deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) rotate(3deg);
          }
          50% {
            transform: translateY(-12px) rotate(5deg);
          }
        }

        .animate-wave {
          animation: wave 0.5s ease-in-out;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `,
        }}
      />
    </footer>
  );
}

export default Footer;
