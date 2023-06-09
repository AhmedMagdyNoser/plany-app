import Fade from "./Fade";
import { useRef } from "react";
import { addTaskToStorage } from "../Storage";

export default function Form({ setTasks }) {

  let form = useRef(0);

  function toggleForm() {
    if (form.current.style.display === 'block') {
      form.current.style.display = 'none';
    } else {
      form.current.style.display = 'block';
    }
  }

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
    addTaskToStorage(
      {
        id: Math.floor(Math.random() * 10 ** 9),
        name: formData.get('name'),
        time: formData.get('time') + ' ' + period,
        checked: false
      },
      setTasks
    );
    e.target.reset();
  }

  return (
    <>

      <button className='btn btn-primary px-5 mb-3' onClick={toggleForm}>اضف مهمة جديدة</button>

      <div style={{ display: 'none' }} ref={form}>
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
      </div>

    </>
  )
}