"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { extractVideoThumbnail } from "@/lib/video-utils";

const cards = [
  {
    title: "Video Example",
    description: "Click to play video",
    videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/bent.sch.mp4",
    thumbnailUrl: "",
  },
  // Add more cards here if needed
];

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load thumbnails for all video cards
    const loadThumbnails = async () => {
      const newThumbnails: { [key: string]: string } = {};
      for (const card of cards) {
        if (card.videoUrl) {
          try {
            const thumbnail = await extractVideoThumbnail(card.videoUrl);
            newThumbnails[card.videoUrl] = thumbnail;
          } catch (error) {
            console.error("Error extracting thumbnail:", error);
          }
        }
      }
      setThumbnails(newThumbnails);
    };

    loadThumbnails();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            layoutId={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden cursor-pointer"
          >
            <motion.div
              layoutId={`image-${card.title}-${id}`}
              className="relative w-full h-48"
            >
              <img
                src={thumbnails[card.videoUrl] || "/placeholder.svg"}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-4">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-medium text-neutral-700 dark:text-neutral-200"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400"
              >
                {card.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[90vw] h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <video
                ref={videoRef}
                src={active.videoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  );
}