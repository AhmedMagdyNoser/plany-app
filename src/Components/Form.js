import { useRef } from "react";
import Fade from "./Fade";

export default function Form({ addTask }) {

  let AM = useRef(0);
  let PM = useRef(0);
  let period = 'صباحا';

  function setPeriod(e) {
    e.preventDefault();
    period = e.target.innerHTML;
    AM.current.classList.remove('active');
    PM.current.classList.remove('active');
    e.target.classList.add('active');
  }

  function addNewTask(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    addTask(formData.get('name'), formData.get('time') + ' ' + period);
    e.target.reset();
  }

  return (
    <Fade time='0.5s'>
      <form onSubmit={addNewTask}>

        <input name="name" required className='form-control shadow-none' placeholder='اسم المهمة' />

        <div className='d-flex gap-2 py-2'>
          <input name="time" type='number' min='1' max='12' required className='form-control shadow-none' placeholder='التوقيت بالساعة' />
          <div className='d-flex gap-2'>
            <button ref={AM} className='btn btn-outline-primary active' onClick={setPeriod}>صباحا</button>
            <button ref={PM} className='btn btn-outline-primary' onClick={setPeriod}>مساء</button>
          </div>
        </div>

        <div className="d-grid">
          <input type="submit" value='اضف' className="btn btn-primary" />
        </div>

      </form>
    </Fade>
  )
}