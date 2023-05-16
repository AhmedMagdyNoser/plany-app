import { useRef, useState } from "react"
import Fade from "./Fade"

let uncheckedStyle = 'fa-regular fa-circle fa-xl icon-hover'
let hoverStyle = 'fa-regular fa-circle-check fa-xl icon-hover'
let checkedStyle = 'fa-solid fa-circle-check fa-xl icon-hover'

export default function Task({ id, taskName, time, deleteTask }) {

  let [iconStyle, setIconStyle] = useState(uncheckedStyle)
  let [checked, setChecked] = useState(false);

  let card = useRef(0);
  let titleElement = useRef(0);

  function handleClick() {
    if (checked) {
      setChecked(false);
      setIconStyle(uncheckedStyle)
      titleElement.current.classList.remove('text-decoration-line-through');
    } else {
      setChecked(true);
      setIconStyle(checkedStyle)
      titleElement.current.classList.add('text-decoration-line-through');
    }
  }

  function handleMouseEnter() {
    setIconStyle(hoverStyle)
  }

  function handleMouseLeave() {
    if (checked) {
      setIconStyle(checkedStyle)
    } else {
      setIconStyle(uncheckedStyle)
    }
  }

  return (
    <Fade time='1s'>
      <div ref={card} className='py-3 px-4 d-flex align-items-center justify-content-between border-bottom task-hover'>

        <div className="d-flex align-items-center">
          <i onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={iconStyle}></i>
          <div className='px-3'>
            <p ref={titleElement} className='my-1 fw-bold'>{taskName}</p>
            <span className='text-muted'>{time}</span>
          </div>
        </div>

        <i
          onClick={() => {
            // we can simply deleteTask(id) but let's add animation
            setTimeout(deleteTask, 250, id);
            card.current.style.animation = 'fade-out 350ms'
            card.current.style.opacity = '0';
          }}
          className="fa-solid fa-trash-can fa-lg mx-2 opacity-75 trash-icon-hover"
        ></i>
        
        <style>
          {`
            @keyframes fade-out {
              from {
                opacity: 1;
              } to {
                opacity: 0;
              }
            }
          `}
        </style>

      </div>
    </Fade>
  )
}
