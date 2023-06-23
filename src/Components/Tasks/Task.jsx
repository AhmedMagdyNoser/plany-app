import { useEffect, useRef, useState } from "react"
import { removeTask, updateTask } from "../../Redux/tasksSlice";
import { FadeIn } from "../Utils/Fade"
import { useDispatch } from "react-redux";

let uncheckedStyle = 'fa-regular fa-circle fa-xl icon-hover'
let checkedStyle = 'fa-solid fa-circle-check fa-xl icon-hover'
let hoverStyle = 'fa-regular fa-circle-check fa-xl icon-hover'

export default function Task({ task }) {

  const dispatch = useDispatch()

  let [iconStyle, setIconStyle] = useState('')
  let [titleStyle, setTitleStyle] = useState('');

  let card = useRef(0);

  function checkIfChecked() {
    if (task.checked) {
      setIconStyle(checkedStyle)
      setTitleStyle('text-decoration-line-through')
    } else {
      setIconStyle(uncheckedStyle)
      setTitleStyle('')
    }
  }

  // eslint-disable-next-line
  useEffect(() => { checkIfChecked(); }, [task.checked]);

  function handleMouseEnter() {
    setIconStyle(hoverStyle)
  }

  function handleMouseLeave() {
    if (task.checked) {
      setIconStyle(checkedStyle)
    } else {
      setIconStyle(uncheckedStyle)
    }
  }

  function handleUpdateTask() {
    if (task.checked)
      dispatch(updateTask({ id: task.id, checked: false }))
    else
      dispatch(updateTask({ id: task.id, checked: true }))
  }

  return (
    <FadeIn time='1s'>
      <div ref={card} className='py-3 px-4 d-flex align-items-center justify-content-between border-bottom task-hover'>

        <div className="d-flex align-items-center">
          <i onClick={handleUpdateTask} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={iconStyle}></i>
          <div className='px-3'>
            <p className={'my-1 fw-bold ' + titleStyle} >{task.name}</p>
            <span className='text-muted' >{task.time}</span>
          </div>
        </div>

        <i
          onClick={() => {
            // we can simply dispatch(removeTask(task.id)); but let's add animation
            setTimeout(() => { dispatch(removeTask(task.id)) }, 250);
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
