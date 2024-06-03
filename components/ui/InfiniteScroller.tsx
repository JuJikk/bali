import React, { useEffect, useRef, useState } from "react";

type ScrollerProps = {
  direction?: "up" | "down";
  children: React.ReactNode;
  listLength: number;
  isPaused: boolean;
};

const InfiniteScroller: React.FC<ScrollerProps> = ({
  direction = "up",
  listLength = 0,
  isPaused,
  children,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const calculateAnimationDuration = (length: number): number => {
    const baseDuration = 20;
    const maxDuration = 600;
    const divisor = 25;

    const duration =
      baseDuration +
      ((maxDuration - baseDuration) * (Math.exp(length / divisor) - 1)) /
        (Math.exp(89 / divisor) - 1);

    return duration;
  };

  const animationDuration = calculateAnimationDuration(listLength) * 1.3;

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(matchMedia.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches);
    };

    matchMedia.addEventListener("change", handleMediaChange);
    return () => {
      matchMedia.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isReducedMotion && scrollerRef.current) {
      const scroller = scrollerRef.current;
      const scrollerInner = scroller.firstChild as HTMLElement;
      const scrollerContent = Array.from(scrollerInner.childNodes);

      const existingChildCount = scrollerContent.length;
      const maxChildCount = 4;

      scrollerContent.forEach((item: Node, index: number) => {
        if (index < maxChildCount - existingChildCount) {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        }
      });
    }
  }, [isReducedMotion, children]);

  return (
    <div
      ref={scrollerRef}
      className={`scroller ${direction}`}
      data-animated={!isReducedMotion}
      style={
        {
          "--_animation-duration": `${animationDuration}s`,
        } as React.CSSProperties
      }
    >
      <div className="scroller__inner">{children}</div>
    </div>
  );
};

export default InfiniteScroller;
