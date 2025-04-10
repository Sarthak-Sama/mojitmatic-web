import { useState, useEffect } from "react";

function BentoGrid() {
  const [activeTab, setActiveTab] = useState("chrome");
  const [emojisPerDay, setEmojisPerDay] = useState(20);
  const [timeScale, setTimeScale] = useState("year");
  const [savedTime, setSavedTime] = useState({
    minutes: 0,
    hours: 0,
    days: 0,
  });
  const [showModal, setShowModal] = useState(false);

  // Calculate time savings based on emoji usage
  useEffect(() => {
    // Assume 5 seconds saved per emoji
    const secondsPerEmoji = 5;
    const totalEmojis = emojisPerDay * getTimeMultiplier(timeScale);
    const savedSeconds = totalEmojis * secondsPerEmoji;

    // Convert to appropriate units
    const minutes = Math.floor(savedSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    setSavedTime({ minutes, hours, days });
  }, [emojisPerDay, timeScale]);

  const getTimeMultiplier = (scale: string) => {
    switch (scale) {
      case "day":
        return 1;
      case "week":
        return 7;
      case "month":
        return 30;
      case "year":
        return 365;
      default:
        return 365;
    }
  };

  // Function to handle download button click
  const handleDownloadClick = () => {
    setShowModal(true);
  };

  // Function to handle actual Chrome extension download
  const handleChromeDownload = () => {
    // Download the extension file
    const link = document.createElement("a");
    link.href = "/extensions/mojimatic.crx"; // Update with actual path to your .crx file
    link.download = "mojimatic.crx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-32 bg-[#d8e2e3]">
      {/* Main content container with gradient border */}
      <div className="w-[80%] max-w-6xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-[#355eff] opacity-50"></div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-[#ff3d77] opacity-50"></div>

        {/* Content section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main info card */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[4rem] md:text-[5rem] font-[excon] text-transparent bg-clip-text bg-gradient-to-r from-[#1d1e20] to-[#3a3b40] leading-none">
                Mojimatic
              </h3>
              <div className="px-3 py-1 bg-[#f0f4f5] rounded-full text-xs text-[#5a6672] uppercase tracking-wider">
                Free
              </div>
            </div>

            <p className="text-[1.25rem] font-['switzer'] text-[#1d1e20] mb-6 leading-relaxed">
              Ever feel like scrolling through the emoji menu is as pointless as
              your last Zoom meeting that could've been an email? With
              Mojimatic, you can kick that tedious ritual to the curb. Just type
              your command and let the emojis fly—no need to slide through
              endless options like you're trying to find meaning in your Twitter
              feed.
            </p>

            <div className="mt-6 p-4 bg-[#f0f4f5] rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2 text-[#5a6672] mb-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Pro Tip</span>
              </div>
              <p className="text-[0.95rem] text-[#5a6672] italic">
                If you're a chronically online person like me who has a good
                habit of using emojis via commands and not like those boomers
                manually picking them, then this extension is your new digital
                best friend.
              </p>
            </div>
          </div>

          {/* Time Savings Calculator - NEW COMPONENT */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div className="text-[#1d1e20] font-medium">
                Time Savings Calculator
              </div>
              <div className="text-lg">⏱️</div>
            </div>
            <div className="p-5 h-full flex flex-col">
              <p className="text-sm text-[#5a6672] mb-4">
                See how much time you'll save by using emoji commands instead of
                menus
              </p>

              <div className="mb-4">
                <label
                  htmlFor="emojis-slider"
                  className="block text-sm text-[#5a6672] mb-1"
                >
                  Emojis used per day:{" "}
                  <span className="font-medium text-[#1d1e20]">
                    {emojisPerDay}
                  </span>
                </label>
                <input
                  id="emojis-slider"
                  type="range"
                  min="1"
                  max="100"
                  value={emojisPerDay}
                  onChange={(e) => setEmojisPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[#5a6672] mt-1">
                  <span>1</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm text-[#5a6672] mb-2">
                  Time period:
                </label>
                <div className="flex gap-2">
                  {["day", "week", "month", "year"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeScale(period)}
                      className={`py-1 px-3 text-sm rounded-full ${
                        timeScale === period
                          ? "bg-[#355eff] text-white"
                          : "bg-[#f0f4f5] text-[#5a6672] hover:bg-gray-200"
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#355eff]">
                    {savedTime.hours > 24
                      ? `${savedTime.days}d ${savedTime.hours % 24}h`
                      : savedTime.minutes > 60
                      ? `${savedTime.hours}h ${savedTime.minutes % 60}m`
                      : `${savedTime.minutes}m`}
                  </div>
                  <div className="text-[#5a6672] mt-1">
                    Time saved per {timeScale}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-xs text-[#5a6672] italic">
                    That's {(savedTime.hours / 24).toFixed(1)} days you could
                    spend doing literally anything else
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Browser section - modified with click handlers */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "chrome"
                  ? "text-[#1d1e20] bg-[#f0f4f5]"
                  : "text-[#5a6672] hover:text-[#1d1e20]"
              }`}
              onClick={() => setActiveTab("chrome")}
            >
              Chrome
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "firefox"
                  ? "text-[#1d1e20] bg-[#f0f4f5]"
                  : "text-[#5a6672] hover:text-[#1d1e20]"
              }`}
              onClick={() => setActiveTab("firefox")}
            >
              Firefox
            </button>
          </div>

          <div className="p-8 relative min-h-[15rem]">
            {activeTab === "chrome" && (
              <div className="flex flex-col md:flex-row items-center gap-8 animate-fadeIn">
                <div className="flex-1">
                  <h3 className="text-2xl font-[excon] text-[#1d1e20] mb-4">
                    Chrome Extension
                  </h3>
                  <p className="text-[#5a6672] mb-6">
                    One click to install, zero clicks to enjoy. Works seamlessly
                    across all your favorite websites.
                  </p>
                  <button
                    className="px-6 py-3 bg-[#355eff] hover:bg-[#355eff]/90 text-white font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#355eff]/20 focus:outline-none"
                    onClick={handleDownloadClick}
                  >
                    Download for Chrome
                  </button>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#355eff] rounded-full opacity-10 blur-3xl"></div>
                  <img
                    src="/media/chromeFanart.png"
                    alt="Chrome Extension"
                    className="w-full max-w-[260px] mx-auto object-contain relative z-10"
                  />
                </div>
              </div>
            )}

            {activeTab === "firefox" && (
              <div className="flex flex-col md:flex-row items-center gap-8 animate-fadeIn">
                <div className="flex-1">
                  <h3 className="text-2xl font-[excon] text-[#1d1e20] mb-4">
                    Firefox Add-on
                  </h3>
                  <p className="text-[#5a6672] mb-6">
                    Privacy-focused and lightning fast. Your emoji commands
                    follow you everywhere on the web.
                  </p>
                  <button
                    className="px-6 py-3 bg-[#ff3d77] hover:bg-[#ff3d77]/90 text-white font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#ff3d77]/20 focus:outline-none"
                    onClick={handleDownloadClick}
                  >
                    Download for Firefox
                  </button>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ff3d77] rounded-full opacity-10 blur-3xl"></div>
                  <img
                    src="/media/firefoxFanart.png"
                    alt="Firefox Add-on"
                    className="w-full max-w-[260px] mx-auto object-contain relative z-10"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Installation modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal content */}
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-xl max-h-[90vh] overflow-y-auto relative z-10 animate-modalSlideIn">
            {/* Modal header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-2xl font-[excon] text-[#1d1e20]">
                {activeTab === "chrome"
                  ? "Install Chrome Extension"
                  : "Install Firefox Add-on"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
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
            </div>

            {/* Modal body - different content based on browser */}
            <div className="p-6">
              {activeTab === "chrome" ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      The Chrome extension requires manual installation
                    </span>
                  </div>

                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <div className="font-medium">
                        Download the extension file
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Click the button below to download the extension file
                        (.crx)
                      </p>
                      <button
                        onClick={handleChromeDownload}
                        className="px-4 py-2 bg-[#355eff] hover:bg-[#355eff]/90 text-white font-medium rounded-lg transition-all text-sm"
                      >
                        Download extension file
                      </button>
                    </li>
                    <li>
                      <div className="font-medium">
                        Open Chrome Extensions page
                      </div>
                      <p className="text-sm text-gray-600">
                        Type{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          chrome://extensions
                        </code>{" "}
                        in your Chrome address bar and press Enter
                      </p>
                    </li>
                    <li>
                      <div className="font-medium">Enable Developer Mode</div>
                      <p className="text-sm text-gray-600">
                        Toggle the "Developer mode" switch in the top-right
                        corner
                      </p>
                      <div className="mt-2 bg-gray-100 rounded-lg p-3">
                        <img
                          src="/media/chrome-dev-mode.png"
                          alt="Enable Developer Mode"
                          className="w-full rounded border border-gray-200"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">Install the extension</div>
                      <p className="text-sm text-gray-600">
                        Drag and drop the downloaded .crx file onto the Chrome
                        extensions page
                      </p>
                      <div className="mt-2 bg-gray-100 rounded-lg p-3">
                        <img
                          src="/media/chrome-drag-drop.png"
                          alt="Drag and drop"
                          className="w-full rounded border border-gray-200"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">Confirm installation</div>
                      <p className="text-sm text-gray-600">
                        Click "Add extension" in the prompt that appears
                      </p>
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Firefox installation is quick and easy!</span>
                  </div>

                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <div className="font-medium">
                        Visit the Firefox Add-ons Store
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Click the button below to open the Mojimatic page in the
                        Firefox Add-ons store
                      </p>
                      <a
                        href="https://addons.mozilla.org/en-US/firefox/addon/mojimatic/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#ff3d77] hover:bg-[#ff3d77]/90 text-white font-medium rounded-lg transition-all text-sm inline-flex items-center gap-2"
                      >
                        <span>Open Firefox Add-ons Store</span>
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <div className="font-medium">Click "Add to Firefox"</div>
                      <p className="text-sm text-gray-600">
                        Click the "Add to Firefox" button on the add-on page
                      </p>
                      <div className="mt-2 bg-gray-100 rounded-lg p-3">
                        <img
                          src="/media/firefox-add.png"
                          alt="Add to Firefox"
                          className="w-full rounded border border-gray-200"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">Confirm installation</div>
                      <p className="text-sm text-gray-600">
                        Click "Add" in the confirmation dialog
                      </p>
                    </li>
                    <li>
                      <div className="font-medium">Start using Mojimatic!</div>
                      <p className="text-sm text-gray-600">
                        You're all set! Try typing{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          :fire:
                        </code>{" "}
                        to see 🔥
                      </p>
                    </li>
                  </ol>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add global styles for animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .animate-blink {
            animation: blink 1s step-end infinite;
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }

          .animate-modalSlideIn {
            animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `,
        }}
      />
    </div>
  );
}

export default BentoGrid;
