"use client";

import { useEffect } from "react";

export default function ElevenLabsWidget() {
  useEffect(() => {
    // Load the ElevenLabs ConvAI embed script
    if (!document.querySelector('script[src*="elevenlabs/convai-widget-embed"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    // @ts-expect-error — elevenlabs-convai is a custom web component
    <elevenlabs-convai agent-id="agent_5901kf1zaj3wfstavb700yr7s27n" />
  );
}
