"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const ROTATION_INTERVAL_MS = 8000;

type EventSlideshowProps = {
  eventCount: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function useEventSlideshow(eventCount: number, initialIndex: number) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const shouldPause = manuallyPaused || interactionPaused;

  useEffect(() => {
    if (eventCount <= 1 || shouldPause) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % eventCount);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, eventCount, shouldPause]);

  return {
    activeIndex,
    isPaused: manuallyPaused,
    setInteractionPaused,
    togglePaused: () => setManuallyPaused((paused) => !paused),
    selectEvent: (index: number) => setActiveIndex(index),
  };
}

export function EventSlideshowControls({
  eventCount,
  activeIndex,
  onSelect,
  isPaused,
  onTogglePaused,
}: EventSlideshowProps & {
  isPaused: boolean;
  onTogglePaused: () => void;
}) {
  if (eventCount <= 1) {
    return null;
  }

  return (
    <div
      className="mt-5 flex flex-wrap items-center justify-between gap-4"
      role="group"
      aria-label="Upcoming event slideshow controls"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect((activeIndex - 1 + eventCount) % eventCount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0B1F3A] transition hover:border-orange-400 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          aria-label="Show previous event"
        >
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: eventCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={`h-2.5 rounded-full transition-all ${
              activeIndex === index
                ? "w-7 bg-orange-500"
                : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Show event ${index + 1} of ${eventCount}`}
            aria-pressed={activeIndex === index}
          />
        ))}
        <button
          type="button"
          onClick={() => onSelect((activeIndex + 1) % eventCount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0B1F3A] transition hover:border-orange-400 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          aria-label="Show next event"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <button
        type="button"
        onClick={onTogglePaused}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#0B1F3A] transition hover:border-orange-400 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        aria-label={isPaused ? "Resume automatic event rotation" : "Pause automatic event rotation"}
      >
        {isPaused ? <Play size={14} /> : <Pause size={14} />}
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}
