import { useEffect, useRef } from "react";

export function FadeIn({ children, time, className }) {
  let myElement = useRef(0);

  function showIfOnScreen() {
    if (
      myElement.current &&
      window.pageYOffset + window.innerHeight > myElement.current.offsetTop
    ) {
      // when scrolling into an element
      myElement.current.style.animation = `fade-in ${time}`; // fade-in is defined in css below
      myElement.current.style.opacity = `1`;
    }
  }

  window.addEventListener("scroll", () => {
    showIfOnScreen();
  });

  // eslint-disable-next-line
  useEffect(() => showIfOnScreen(), []);

  return (
    <div ref={myElement} style={{ opacity: "0" }} className={className}>
      {children}
      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
            } to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
