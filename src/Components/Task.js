import { useEffect, useRef, useState } from "react"
import { removeTaskFromStorage, updateTaskInStorage } from "../Storage";
import { FadeIn } from "./Utils/Fade"

let uncheckedStyle = 'fa-regular fa-circle fa-xl icon-hover'
let checkedStyle = 'fa-solid fa-circle-check fa-xl icon-hover'
let hoverStyle = 'fa-regular fa-circle-check fa-xl icon-hover'

export default function Task({ task, setTasks }) {

  let [checked, setChecked] = useState(task.checked);
  let [iconStyle, setIconStyle] = useState('')
  let [titleStyle, setTitleStyle] = useState('');

  let card = useRef(0);

  function checkIfChecked() {
    if (checked) {
      setIconStyle(checkedStyle)
      setTitleStyle('text-decoration-line-through')
    } else {
      setIconStyle(uncheckedStyle)
      setTitleStyle('')
    }
  }

  // eslint-disable-next-line
  useEffect(() => { checkIfChecked(); }, [checked]);

  function updateTask() {
    if (checked)
      updateTaskInStorage(task.id, false, setChecked)
    else
      updateTaskInStorage(task.id, true, setChecked)
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
    <FadeIn time='1s'>
      <div ref={card} className='py-3 px-4 d-flex align-items-center justify-content-between border-bottom task-hover'>

        <div className="d-flex align-items-center">
          <i onClick={updateTask} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={iconStyle}></i>
          <div className='px-3'>
            <p className={'my-1 fw-bold ' + titleStyle} >{task.name}</p>
            <span className='text-muted' >{task.time}</span>
          </div>
        </div>

        <i
          onClick={() => {
            // we can simply removeTaskFromStorage(task.id, setTasks) but let's add animation
            setTimeout(removeTaskFromStorage, 250, task.id, setTasks);
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
    </FadeIn>
  )
}
