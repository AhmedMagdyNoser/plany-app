import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../Redux/tasksSlice";
import Datetime from "react-datetime";
import "../../styles/react-datetime.css";
import PopupBox from "../Utils/PopupBox";
import { formatDateAndTime, randomDigits } from "../../utils";
import { setTaskReminderNotification } from "../Notifications/AddNotification";

export default function AddTask() {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState(new Date());
  const [settingTimeMode, setSettingTimeMode] = useState(false);
  const [settingTimeWindow, setSettingTimeWindow] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const [validationMessage, setValidationMessage] = useState("");

  const inputRef = useRef();

  function handleDateChange(date) {
    setTaskTime(date);
  }

  function handleSettingTimeMode() {
    if (settingTimeMode) {
      setSettingTimeMode(false);
    } else {
      setSettingTimeMode(true);
      setSettingTimeWindow(true);
    }
  }

  function handleNotificationMode() {
    isNotificationOn ? setIsNotificationOn(false) : setIsNotificationOn(true);
  }

  function formValidation() {
    if (!taskTitle) {
      setValidationMessage("من فضلك ادخل اسما للمهمة !");
      inputRef.current.focus();
      return false;
    } else {
      setValidationMessage("");
    }
    if (settingTimeMode) {
      const userDateTime = new Date(taskTime);
      const currentDateTime = new Date();
      if (taskTime.length === 0 || userDateTime < currentDateTime) {
        setValidationMessage("من فضلك ادخل وقتا فى المستقبل !");
        return false;
      } else {
        setValidationMessage("");
      }
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let id = randomDigits(9);
    if (!formValidation()) return;
    dispatch(
      addTask({
        id: id,
        isChecked: false,
        title: taskTitle,
        time: settingTimeMode ? taskTime.toISOString() : null,
        isNotificationOn: settingTimeMode ? isNotificationOn : null,
        isNotified: settingTimeMode ? false : null,
      })
    );
    settingTimeMode && setTaskReminderNotification(id, taskTime);
    e.target.reset();
    setTaskTitle("");
    setSettingTimeMode(false);
    setIsNotificationOn(false);
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
      <div className={"d-flex align-items-stretch justify-content-between flex-wrap gap-2 bg-white rounded p-2"}>
        <div className="flex-center" style={{ flexGrow: "10" }}>
          <i className="fa-solid fa-plus mx-2"></i>
          <input
            type="text"
            ref={inputRef}
            placeholder="اضف مهمة جديدة"
            onChange={(e) => setTaskTitle(e.target.value)}
            tabIndex={settingTimeWindow ? -1 : 1}
            className="flex-grow-1 py-2 border-0"
            autoComplete="off"
          />
        </div>

        <div className="d-flex justify-content-end gap-2 flex-wrap" style={{ flexGrow: "1" }}>
          {settingTimeMode && (
            <>
              {/* Notification Mode */}
              <FormButton onClick={handleNotificationMode} tabIndex={settingTimeWindow ? -1 : 1}>
                <i className={isNotificationOn ? "fa-solid fa-bell text-primary" : "fa-regular fa-bell-slash"}></i>
              </FormButton>
              {/* Selected Time */}
              <FormButton
                onClick={() => setSettingTimeWindow(true)}
                tabIndex={settingTimeWindow ? -1 : 1}
                className="flex-center flex-grow-1 gap-2"
              >
                <span className="text-nowrap">{formatDateAndTime(taskTime.toISOString(), "ar")}</span>
              </FormButton>
            </>
          )}
          {/* Time Mode */}
          <FormButton tabIndex={settingTimeWindow ? -1 : 1} className="flex-center gap-2" onClick={handleSettingTimeMode}>
            <i className={(settingTimeMode && "text-primary") + " fa-solid fa-clock"}></i>
          </FormButton>
        </div>
      </div>

      {validationMessage && (
        <div className="text-danger">
          <i className="fa-solid fa-triangle-exclamation mx-2"></i>
          {validationMessage}
        </div>
      )}

      {settingTimeWindow && (
        <PopupBox
          setIsOpened={setSettingTimeWindow}
          style={{ width: "450px", maxWidth: "100%", margin: "10px" }}
          className="p-2 rounded bg-white"
          cancelButtonTitle="موافق"
          cancelButtonClass="btn btn-primary w-100 mt-2"
          animationTime={350}
        >
          <div className="rounded overflow-hidden">
            <Datetime input={false} onChange={handleDateChange} initialValue={taskTime} />
          </div>
        </PopupBox>
      )}

      <input type="submit" className="btn btn-primary w-100" value="أضف" tabIndex={settingTimeWindow ? -1 : 1} />
    </form>
  );
}

function FormButton({ children, className, onClick, tabIndex }) {
  return (
    <button
      type="button"
      style={{ minHeight: "40px" }}
      className={"text-muted bg-light gray-hover border-0 rounded px-3 " + className}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
