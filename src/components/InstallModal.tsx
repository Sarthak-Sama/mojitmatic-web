import React, { useState, useEffect } from "react";

interface InstallModalProps {
  browser: "chrome" | "firefox";
  isOpen: boolean;
  onClose: () => void;
}

const InstallModal: React.FC<InstallModalProps> = ({
  browser,
  isOpen,
  onClose,
}) => {
  const [animationClass, setAnimationClass] = useState("");
  const [blurClass, setBlurClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Start backdrop blur animation first
      setBlurClass("backdrop-blur-animate-in");
      // Start modal animation after a slight delay
      setTimeout(() => {
        setAnimationClass("modal-animate-in");
      }, 150);

      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Reverse order for closing - start with modal, then backdrop
      setAnimationClass("modal-animate-out");
      setTimeout(() => {
        setBlurClass("backdrop-blur-animate-out");
      }, 200);

      // Reset body overflow when modal closes
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDownloadChrome = () => {
    // Download the extension file
    const link = document.createElement("a");
    link.href = "/extensions/mojimatic.crx";
    link.download = "mojimatic.crx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFirefoxInstall = () => {
    // Open Firefox Add-ons store in a new tab
    window.open(
      "https://addons.mozilla.org/en-US/firefox/addon/mojimatic/",
      "_blank"
    );
  };

  if (!isOpen && animationClass !== "modal-animate-in") return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${animationClass}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Animated background with gradual blur */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-[#355eff]/30 to-[#ff3d77]/30 ${blurClass}`}
      />

      {/* The modal itself */}
      <div className="modal-container">
        <div
          className={`elegant-modal ${
            browser === "chrome" ? "chrome-theme" : "firefox-theme"
          } relative z-10 w-11/12 max-w-3xl overflow-hidden`}
        >
          {/* Decorative shapes */}
          <div className="decorative-circle circle-1"></div>
          <div className="decorative-circle circle-2"></div>
          <div className="decorative-blob"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#1d1e20] hover:text-[#ff3d77] transition-all z-50 close-btn"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="p-8 pt-10 header-section">
            <div className="reveal-text">
              <h2 className="text-3xl font-bold text-[#1d1e20]">
                {browser === "chrome"
                  ? "Installing Mojimatic for Chrome"
                  : "Installing Mojimatic for Firefox"}
              </h2>
            </div>
            <p className="mt-3 text-[#5a6672] reveal-text-delay">
              {browser === "chrome"
                ? "Follow these steps to install the extension manually"
                : "Quick and easy installation through the Firefox Add-ons store"}
            </p>
          </div>

          {/* Content based on browser */}
          <div className="px-8 py-6 content-section">
            {browser === "chrome" ? (
              <div className="space-y-8">
                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number">1</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#355eff]">
                        Download the extension
                      </h3>
                      <p className="text-[#5a6672] mb-4">
                        First, download the Mojimatic extension file to your
                        computer.
                      </p>
                      <button
                        onClick={handleDownloadChrome}
                        className="download-button chrome"
                      >
                        <span className="button-text">Download Extension</span>
                        <span className="button-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number">2</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#355eff]">
                        Open Chrome Extensions
                      </h3>
                      <p className="text-[#5a6672]">
                        Go to{" "}
                        <code className="inline-code">chrome://extensions</code>{" "}
                        in your browser address bar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number">3</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#355eff]">
                        Enable Developer Mode
                      </h3>
                      <p className="text-[#5a6672]">
                        Toggle the "Developer mode" switch in the top-right
                        corner.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number">4</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#355eff]">
                        Install the extension
                      </h3>
                      <p className="text-[#5a6672]">
                        Drag and drop the downloaded .crx file onto the Chrome
                        extensions page.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number">5</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#355eff]">
                        Start using Mojimatic!
                      </h3>
                      <p className="text-[#5a6672]">
                        That's it! You should now see the Mojimatic icon in your
                        browser toolbar. Type emoji commands like{" "}
                        <code className="inline-code">:fire:</code> to get 🔥!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number firefox">1</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#ff3d77]">
                        Visit Firefox Add-ons
                      </h3>
                      <p className="text-[#5a6672] mb-4">
                        Click the button below to navigate to the Mojimatic page
                        on the Firefox Add-ons store.
                      </p>
                      <button
                        onClick={handleFirefoxInstall}
                        className="download-button firefox"
                      >
                        <span className="button-text">
                          Open Firefox Add-ons
                        </span>
                        <span className="button-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number firefox">2</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#ff3d77]">
                        Add to Firefox
                      </h3>
                      <p className="text-[#5a6672]">
                        On the add-on page, click the "Add to Firefox" button to
                        begin installation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number firefox">3</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#ff3d77]">
                        Confirm Installation
                      </h3>
                      <p className="text-[#5a6672]">
                        Review the permissions and click "Add" when prompted by
                        Firefox.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="step-item">
                  <div className="flex items-start gap-5">
                    <div className="step-number firefox">4</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-[#ff3d77]">
                        Start using Mojimatic!
                      </h3>
                      <p className="text-[#5a6672]">
                        That's it! You should now see the Mojimatic icon in your
                        browser toolbar. Type emoji commands like{" "}
                        <code className="inline-code">:fire:</code> to get 🔥!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 footer-section">
            <p className="text-[#5a6672] text-sm">
              Having trouble? Contact us or check out our{" "}
              <a
                href="#"
                className={`link-${
                  browser === "chrome" ? "chrome" : "firefox"
                }`}
              >
                installation troubleshooting guide
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Animation styles - replace style jsx with standard React approach */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Background blur animation */
            .backdrop-blur-animate-in {
              animation: blurIn 0.8s ease-out forwards;
            }

            .backdrop-blur-animate-out {
              animation: blurOut 0.6s ease-in forwards;
            }

            @keyframes blurIn {
              0% {
                backdrop-filter: blur(0px);
                opacity: 0;
              }
              100% {
                backdrop-filter: blur(10px);
                opacity: 1;
              }
            }

            @keyframes blurOut {
              0% {
                backdrop-filter: blur(10px);
                opacity: 1;
              }
              100% {
                backdrop-filter: blur(0px);
                opacity: 0;
              }
            }

            /* Modal container animation */
            .modal-animate-in {
              animation: modalContainerIn 0.5s ease-out forwards;
            }

            .modal-animate-out {
              animation: modalContainerOut 0.5s ease-in forwards;
            }

            @keyframes modalContainerIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            @keyframes modalContainerOut {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }

            /* Modal container */
            .modal-container {
              perspective: 1200px;
            }

            /* Elegant modal styling */
            .elegant-modal {
              background-color: #ffffff;
              border-radius: 16px;
              position: relative;
              transform-origin: center;
              color: #1d1e20;
              overflow: hidden;
              box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.08), 
                0 1px 2px rgba(0, 0, 0, 0.02),
                0 10px 15px rgba(0, 0, 0, 0.04);
              animation: modalIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              transform: translateY(30px) scale(0.97);
            }

            @keyframes modalIn {
              0% {
                opacity: 0;
                transform: translateY(30px) scale(0.97);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            .modal-animate-out .elegant-modal {
              animation: modalOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @keyframes modalOut {
              0% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
              100% {
                opacity: 0;
                transform: translateY(20px) scale(0.97);
              }
            }

            /* Theme variants */
            .chrome-theme {
              border-top: 4px solid #355eff;
            }

            .firefox-theme {
              border-top: 4px solid #ff3d77;
            }

            /* Decorative elements */
            .decorative-circle {
              position: absolute;
              border-radius: 50%;
              z-index: -1;
              opacity: 0.1;
              animation: rotateSlow 20s linear infinite;
            }

            .circle-1 {
              top: -150px;
              right: -80px;
              width: 300px;
              height: 300px;
              background: ${browser === "chrome" ? "#355eff" : "#ff3d77"};
            }

            .circle-2 {
              bottom: -100px;
              left: -60px;
              width: 200px;
              height: 200px;
              background: ${browser === "chrome" ? "#7b96ff" : "#ff85a8"};
            }

            .decorative-blob {
              position: absolute;
              top: 30%;
              right: -150px;
              width: 300px;
              height: 300px;
              background: ${browser === "chrome" ? "#355eff" : "#ff3d77"};
              border-radius: 70% 30% 50% 50% / 30% 70% 30% 70%;
              opacity: 0.04;
              z-index: -1;
              animation: blobAnimation 15s ease-in-out infinite alternate;
            }

            @keyframes rotateSlow {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            @keyframes blobAnimation {
              0% {
                border-radius: 70% 30% 50% 50% / 30% 70% 30% 70%;
              }
              50% {
                border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
              }
              100% {
                border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
              }
            }

            /* Section styling */
            .header-section {
              background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.6),
                rgba(255, 255, 255, 0.95)
              );
              position: relative;
              overflow: hidden;
            }

            .content-section {
              background-color: #ffffff;
              position: relative;
            }

            .footer-section {
              background-color: #f8fafb;
              border-top: 1px solid #f0f0f0;
            }

            /* Step styling */
            .step-item {
              animation: fadeUp 0.5s ease-out forwards;
              opacity: 0;
              transform: translateY(10px);
            }

            .step-item:nth-child(1) { animation-delay: 0.1s; }
            .step-item:nth-child(2) { animation-delay: 0.2s; }
            .step-item:nth-child(3) { animation-delay: 0.3s; }
            .step-item:nth-child(4) { animation-delay: 0.4s; }
            .step-item:nth-child(5) { animation-delay: 0.5s; }

            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Step number styling */
            .step-number {
              color: #355eff;
              background-color: #f0f7ff;
              border-radius: 50%;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              flex-shrink: 0;
              font-family: 'SF Mono', Monaco, monospace;
              box-shadow: 0 2px 10px rgba(53, 94, 255, 0.1);
              border: 1px solid rgba(53, 94, 255, 0.2);
            }

            .step-number.firefox {
              color: #ff3d77;
              background-color: #fff0f5;
              box-shadow: 0 2px 10px rgba(255, 61, 119, 0.1);
              border: 1px solid rgba(255, 61, 119, 0.2);
            }

            /* Button styling */
            .download-button {
              display: inline-flex;
              align-items: center;
              padding: 0.5rem 1.25rem;
              background-color: #355eff;
              color: white;
              font-weight: 500;
              border-radius: 8px;
              overflow: hidden;
              position: relative;
              transition: all 0.3s;
            }

            .download-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 15px rgba(53, 94, 255, 0.2);
            }

            .download-button.firefox {
              background-color: #ff3d77;
            }

            .download-button.firefox:hover {
              box-shadow: 0 6px 15px rgba(255, 61, 119, 0.2);
            }

            .button-text {
              display: inline-block;
              transition: transform 0.3s;
              z-index: 1;
            }

            .button-icon {
              margin-left: 8px;
              display: inline-flex;
              transition: transform 0.3s;
              z-index: 1;
            }

            .download-button:hover .button-text {
              transform: translateX(-4px);
            }

            .download-button:hover .button-icon {
              transform: translateX(4px);
            }

            /* Inline code styling */
            .inline-code {
              background-color: #f8f9fa;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'SF Mono', Monaco, monospace;
              font-size: 0.9em;
            }

            /* Link styling */
            .link-chrome {
              color: #355eff;
              transition: color 0.2s;
            }

            .link-firefox {
              color: #ff3d77;
              transition: color 0.2s;
            }

            .link-chrome:hover, .link-firefox:hover {
              text-decoration: underline;
            }

            /* Text reveal animation */
            .reveal-text {
              animation: revealText 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              opacity: 0;
              clip-path: inset(0 100% 0 0);
            }

            .reveal-text-delay {
              animation: revealText 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
              opacity: 0;
              clip-path: inset(0 100% 0 0);
            }

            @keyframes revealText {
              0% {
                opacity: 0;
                clip-path: inset(0 100% 0 0);
              }
              100% {
                opacity: 1;
                clip-path: inset(0 0 0 0);
              }
            }

            /* Close button hover effect */
            .close-btn {
              transition: all 0.3s;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .close-btn:hover {
              background-color: rgba(0, 0, 0, 0.05);
              transform: rotate(90deg);
            }
          `,
        }}
      />
    </div>
  );
};

export default InstallModal;
