import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import BentoGrid from "./components/BentoGrid";
import CommandDemo from "./components/CommandDemo";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <ParallaxProvider>
      <div className="bg-[#d8e2e3] text-[#1d1e20] w-screen min-h-screen overflow-x-hidden">
        <LandingPage />
        <BentoGrid />
        <CommandDemo />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default App;
