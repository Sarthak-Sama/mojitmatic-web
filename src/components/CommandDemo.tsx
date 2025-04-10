import React, { useState, useEffect, useRef } from "react";

// Define interfaces for type safety
interface EmojiSuggestion {
  name: string;
  emoji: string;
}

interface EmojiDictionary {
  [key: string]: string;
}

function CommandDemo() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [emojiDict, setEmojiDict] = useState<EmojiDictionary>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState<EmojiSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load emoji dictionary from JSON file
  useEffect(() => {
    fetch("/emojiDictionary.json")
      .then((response) => response.json())
      .then((data: EmojiDictionary) => {
        setEmojiDict(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load emoji dictionary:", error);
        setIsLoading(false);
      });
  }, []);

  // Process emoji commands in the input text
  useEffect(() => {
    if (!isLoading) {
      let processedText = inputText;
      const regex = /:([\w+-]+):/g;

      processedText = processedText.replace(regex, (match, emojiName) => {
        return emojiDict[emojiName] || match;
      });

      setOutputText(processedText);
    }
  }, [inputText, emojiDict, isLoading]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the current emoji command being typed
  const getCurrentCommand = (text: string, position: number): string | null => {
    const textBeforeCursor = text.substring(0, position);
    const colonIndex = textBeforeCursor.lastIndexOf(":");

    if (colonIndex === -1) return null;

    // Check if there's a completed command or space after the last colon
    const afterColon = textBeforeCursor.substring(colonIndex + 1);
    if (afterColon.includes(":") || afterColon.includes(" ")) return null;

    return afterColon;
  };

  // Filter suggestions based on current input
  const filterSuggestions = (command: string | null): EmojiSuggestion[] => {
    if (!command) return [];

    const matches = Object.keys(emojiDict)
      .filter((key) => key.toLowerCase().includes(command.toLowerCase()))
      .slice(0, 5) // Limit to 5 suggestions
      .map((key) => ({ name: key, emoji: emojiDict[key] }));

    return matches;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const newPosition = e.target.selectionStart || 0;
    setInputText(newText);
    setCursorPosition(newPosition);

    const command = getCurrentCommand(newText, newPosition);

    if (command) {
      const filtered = filterSuggestions(command);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle selection of a suggestion
  const handleSelectSuggestion = (suggestion: EmojiSuggestion) => {
    const textBeforeCursor = inputText.substring(0, cursorPosition);
    const colonIndex = textBeforeCursor.lastIndexOf(":");
    const textBeforeColon = inputText.substring(0, colonIndex);
    const textAfterCursor = inputText.substring(cursorPosition);

    const newText = `${textBeforeColon}:${suggestion.name}:${textAfterCursor}`;
    setInputText(newText);
    setShowSuggestions(false);

    // Set focus back to input and place cursor after the inserted emoji command
    const newCursorPosition = colonIndex + suggestion.name.length + 2;
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
        setCursorPosition(newCursorPosition);
      }
    }, 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (suggestions.length > 0) {
          handleSelectSuggestion(suggestions[selectedSuggestion]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowSuggestions(false);
        break;
      case "Tab":
        e.preventDefault();
        if (suggestions.length > 0) {
          handleSelectSuggestion(suggestions[selectedSuggestion]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-16 px-4 mb-[10rem]">
      <h2 className="text-3xl font-[excon] text-center mb-8">
        Try it yourself
      </h2>

      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
        <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
          <span className="text-[#5a6672] ml-2 text-sm">
            Mojimatic Playground
          </span>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <label className="block text-[#5a6672] text-sm mb-2">
                Type with commands
              </label>
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={(e) =>
                  setCursorPosition(e.currentTarget.selectionStart || 0)
                }
                placeholder="Try typing :heart: or :fire: or start with : and see suggestions"
                className="w-full h-40 p-4 bg-[#f0f4f5] rounded-lg border border-gray-100 font-mono text-[#1d1e20] focus:outline-none focus:ring-2 focus:ring-[#355eff]/30 resize-none"
              />

              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 py-1 max-h-60 overflow-y-auto w-64"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.name}
                      className={`flex items-center px-3 py-2 cursor-pointer ${
                        index === selectedSuggestion
                          ? "bg-[#f0f4f5]"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      onMouseEnter={() => setSelectedSuggestion(index)}
                    >
                      <span className="text-lg mr-2">{suggestion.emoji}</span>
                      <span className="font-mono text-sm">
                        :{suggestion.name}:
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-2 text-xs text-[#5a6672] flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
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
                Type <code className="px-1 bg-gray-100 rounded">:</code>{" "}
                followed by text to see suggestions
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-[#5a6672] text-sm mb-2">
                Magic result
              </label>
              <div className="w-full h-40 p-4 bg-[#f0f4f5] rounded-lg border border-gray-100 font-mono text-[#1d1e20] overflow-auto whitespace-pre-wrap">
                {isLoading ? (
                  <div className="text-[#5a6672] opacity-70">
                    Loading emoji dictionary...
                  </div>
                ) : outputText ? (
                  outputText
                ) : (
                  <div className="text-[#5a6672] opacity-70">
                    Your emoji-filled text will appear here
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-[#5a6672] flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
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
                Just like in Discord - use arrow keys to navigate suggestions
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <button
              onClick={() => setInputText("")}
              className="px-4 py-2 rounded-lg border border-[#355eff] text-[#355eff] hover:bg-[#355eff]/5 transition-colors mb-4 sm:mb-0"
            >
              Clear playground
            </button>

            <div className="text-[#5a6672] text-sm">
              <span className="font-medium">Pro tip:</span> Press Tab or Enter
              to select a suggestion
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#f0f4f5] rounded-xl border border-gray-100">
            <h3 className="font-medium text-[#1d1e20] mb-2">
              Popular emoji commands
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <span>:heart:</span>
                <span>❤️</span>
              </div>
              <div className="flex items-center gap-2">
                <span>:joy:</span>
                <span>😂</span>
              </div>
              <div className="flex items-center gap-2">
                <span>:fire:</span>
                <span>🔥</span>
              </div>
              <div className="flex items-center gap-2">
                <span>:100:</span>
                <span>💯</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommandDemo;
