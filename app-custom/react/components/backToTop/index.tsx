import React, { useEffect, useRef, useState } from "react";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = [
  "backToTop",
  "active",
  "hidden",
] as const;

export function BackToTop() {
  const { handles } = useCssHandles(CSS_HANDLES);
  const btnRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const minhaposicao = window.scrollY;
      const btn = btnRef.current;

      if (btn) {
        if (minhaposicao >= 100) {
          setIsActive(true);
          // fadeIn(btn);
        } else {
          setIsActive(false);
          // fadeOut(btn);
        }
      }
    };

    checkScrollPosition();

    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${handles.backToTop} ${isActive ? handles.active : handles.hidden}`}
      onClick={handleClick}
      ref={btnRef}
    />
  );
}
