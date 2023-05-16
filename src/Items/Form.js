import { useRef } from "react";
export default function Form({addTask}) {
  
  let taskName = useRef(0);
  let time = useRef(0);
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
    addTask(taskName.current.value, time.current.value + ' ' + period);
    taskName.current.value='';
    time.current.value='';
  }

  return (
    <form id='form' className='collapse py-3' onSubmit={addNewTask}>

      <input ref={taskName} required className='form-control shadow-none fw-bold' placeholder='اسم المهمة'  title='' />

      <div className='d-flex gap-2 py-2'>
        <input type='number' min='1' max='12' ref={time} required className='form-control shadow-none fw-bold' placeholder='التوقيت بالساعة' title='' />
        <div className='d-flex gap-2'>
          <button ref={AM} className='btn btn-outline-primary active' onClick={setPeriod}>صباحا</button>
          <button ref={PM} className='btn btn-outline-primary' onClick={setPeriod}>مساء</button>
        </div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">اضف</button>
      </div>

    </form>
  )
}