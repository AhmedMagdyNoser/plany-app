import { useEffect, useRef } from "react";

export function FadeIn({ children, milliSeconds, className }) {
  let myElement = useRef(0);

  function showIfOnScreen() {
    if (myElement.current && window.pageYOffset + window.innerHeight > myElement.current.offsetTop) {
      // When scrolling into an element
      myElement.current.style.animation = `fade-in ${milliSeconds}ms`; // fade-in animation should be defined in CSS
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
    </div>
  );
}

export function RemoveWithFadeOut({ children, milliSeconds, removeFunction, fadeOutElement, className }) {
  return (
    <span
      className={className}
      onClick={() => {
        setTimeout(() => {
          removeFunction();
        }, milliSeconds);
        fadeOutElement.style.animation = `fade-out ${+milliSeconds + 100}ms`; // fade-out animation should be defined in CSS
        fadeOutElement.style.opacity = "0";
      }}
    >
      {children}
    </span>
  );
}

/*

  // Add the animations to your CSS

  @keyframes fade-in {
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    } to {
      opacity: 0;
    }
  }

*/
