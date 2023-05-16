import { useEffect, useRef } from "react"

export default function Fade(props) {

  let myElement = useRef(0);

  function showIfOnScreen() {
    if (myElement.current && window.pageYOffset + window.innerHeight > myElement.current.offsetTop) { // when scrolling into an element
      myElement.current.style.animation = `fade-in ${props.time}`; // fade-in should be defined in css
      myElement.current.style.opacity = `1`;
    }
  }

  window.addEventListener("scroll", () => {
    showIfOnScreen();
  });

  useEffect(() => showIfOnScreen());

  return (
    <div ref={myElement} style={{ opacity: '0' }} >
      {props.children}
      <style jsx>
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
  )

}

/*

you need to add 

@keyframes fade-in {
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
}

to your css master file

*/