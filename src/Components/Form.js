import { useRef } from "react";
import { FadeIn } from "./Utils/Fade";
import { addTaskToStorage } from "../Storage";
import { RadioButton, RadioButtonsGroup } from "./Utils/RadioButtons";

export default function Form({ setTasks }) {

  let form = useRef(0);

  function toggleForm() {
    if (form.current.style.display === 'block') {
      form.current.style.display = 'none';
    } else {
      form.current.style.display = 'block';
    }
  }

  function addNewTask(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    addTaskToStorage(
      {
        id: Math.floor(Math.random() * 10 ** 9),
        name: formData.get('name'),
        time: formData.get('time') + ' ' + formData.get('period'),
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
        <FadeIn time='0.5s'>
          <form onSubmit={addNewTask} className="d-flex flex-column gap-2">

            <input name="name" required className='form-control shadow-none' placeholder='اسم المهمة' />
            <input name="time" type='number' min='1' max='12' required className='form-control shadow-none' placeholder='التوقيت بالساعة' />

            <RadioButtonsGroup name='period' className="d-flex gap-2">
              <RadioButton value="صباحا" checked />
              <RadioButton value="مساء" />
            </RadioButtonsGroup>

            <div className="d-grid">
              <input type="submit" value='اضف' className="btn btn-primary" />
            </div>

          </form>
        </FadeIn>
      </div>

    </>
  )
}