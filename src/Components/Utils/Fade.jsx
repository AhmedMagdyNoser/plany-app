import { useEffect, useRef } from "react";

export function FadeIn({ children, milliSeconds, className, style }) {
  let element = useRef(0);

  function showIfOnScreen() {
    if (element.current && window.pageYOffset + window.innerHeight > element.current.offsetTop) {
      // When scrolling into an element
      element.current.style.animation = `fade-in ${milliSeconds}ms`; // fade-in animation should be defined in CSS
      element.current.style.opacity = `1`;
    }
  }

  useEffect(() => {
    showIfOnScreen();
    document.addEventListener("scroll", showIfOnScreen);
    // Cleanup function
    return () => {
      document.removeEventListener("scroll", showIfOnScreen);
    }; // The cleanup function is executed when the component unmounts.
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={element} style={{ opacity: "0", ...style }} className={className}>
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
