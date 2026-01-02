"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

export default function LottieFishAnimation() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [fishAnimation1, setFishAnimation1] = useState<any>(null);
  const [fishAnimation2, setFishAnimation2] = useState<any>(null);

  useEffect(() => {
    // Load both animation files
    const loadAnimations = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch("/assets/animations/fish.json"),
          fetch("/assets/animations/Fish%20Animation.json"),
        ]);
        
        const data1 = await response1.json();
        const data2 = await response2.json();
        
        setFishAnimation1(data1);
        setFishAnimation2(data2);
      } catch (err) {
        console.error("Failed to load fish animations:", err);
      }
    };
    loadAnimations();
  }, []);

  useEffect(() => {
    // Make animation loop and play
    if (lottieRef.current && fishAnimation1) {
      lottieRef.current.setSpeed(0.8); // Slightly slower for more natural movement
    }
  }, [fishAnimation1]);

  if (!fishAnimation1 || !fishAnimation2) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {/* Fish Animation 1 (fish.json) - Multiple instances */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 opacity-60">
        <Lottie
          lottieRef={lottieRef}
          animationData={fishAnimation1}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="absolute top-[30%] right-[10%] w-40 h-40 opacity-50">
        <Lottie
          animationData={fishAnimation1}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
        />
      </div>
      <div className="absolute top-[50%] left-[15%] w-36 h-36 opacity-55">
        <Lottie
          animationData={fishAnimation1}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="absolute bottom-[20%] right-[20%] w-44 h-44 opacity-45">
        <Lottie
          animationData={fishAnimation1}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
        />
      </div>
      <div className="absolute bottom-[40%] left-[8%] w-28 h-28 opacity-50">
        <Lottie
          animationData={fishAnimation1}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="absolute top-[70%] right-[5%] w-38 h-38 opacity-55">
        <Lottie
          animationData={fishAnimation1}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Fish Animation 2 (Fish Animation.json) - Larger instances */}
      <div className="absolute top-[15%] right-[15%] w-64 h-64 opacity-50">
        <Lottie
          animationData={fishAnimation2}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="absolute top-[60%] left-[10%] w-72 h-72 opacity-45">
        <Lottie
          animationData={fishAnimation2}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
        />
      </div>
      <div className="absolute bottom-[30%] right-[8%] w-68 h-68 opacity-55">
        <Lottie
          animationData={fishAnimation2}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="absolute top-[80%] left-[25%] w-60 h-60 opacity-50">
        <Lottie
          animationData={fishAnimation2}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="absolute bottom-[10%] left-[20%] w-70 h-70 opacity-45">
        <Lottie
          animationData={fishAnimation2}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
        />
      </div>
      <div className="absolute top-[40%] right-[30%] w-66 h-66 opacity-60">
        <Lottie
          animationData={fishAnimation2}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

