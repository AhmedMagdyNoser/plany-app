import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../Redux/tasksSlice";
import Datetime from "react-datetime";
import "../../styles/react-datetime.css";
import PopupBox from "../Utils/PopupBox";
import { FadeIn } from "../Utils/Fade";
import { formatDateAndTime, randomDigits } from "../../utils";
import { setTaskReminderNotification } from "../Notifications/AddNotification";

export default function AddTask() {
  const dispatch = useDispatch();

  const [settingTimeMode, setSettingTimeMode] = useState(false);
  const [settingTimeWindow, setSettingTimeWindow] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const [validationMessage, setValidationMessage] = useState("");
  const [invalidTime, setInvlidTime] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleSettingTimeMode() {
    if (settingTimeMode) {
      setSettingTimeMode(false);
    } else {
      setSettingTimeMode(true);
    }
  }

  function handleNotificationMode() {
    isNotificationOn ? setIsNotificationOn(false) : setIsNotificationOn(true);
  }

  function formValidation(formData) {
    if (!formData.get("title")) {
      setValidationMessage("من فضلك ادخل اسما للمهمة");
      return false;
    } else {
      setValidationMessage("");
    }
    if (settingTimeMode) {
      const userDateTime = new Date(formData.get("time"));
      const currentDateTime = new Date();
      if (formData.get("time").length === 0 || userDateTime < currentDateTime) {
        setInvlidTime("من فضلك ادخل وقتا فى المستقبل");
        return false;
      } else {
        setInvlidTime("");
      }
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let id = randomDigits(9);
    let formData = new FormData(e.target);
    if (!formValidation(formData)) return;
    dispatch(
      addTask({
        id: id,
        isChecked: false,
        title: formData.get("title"),
        time: settingTimeMode ? formData.get("time") : null,
        isNotificationOn: settingTimeMode ? isNotificationOn : null,
        isNotified: settingTimeMode ? false : null,
      })
    );
    settingTimeMode && setTaskReminderNotification(id, formData.get("time"));
    e.target.reset();
    setSettingTimeMode(false);
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
      <div
        className={
          "d-flex align-items-stretch justify-content-between flex-wrap gap-2 bg-white rounded p-2" +
          (validationMessage && " border-bottom border-danger")
        }
      >
        <div className="flex-center" style={{ flexGrow: "5" }}>
          <i className="fa-solid fa-plus mx-2"></i>
          <input name="title" type="text" placeholder="اضف مهمة جديدة" autoComplete="off" className="rounded flex-grow-1 py-2 border-0" />
        </div>

        <div className="d-flex justify-content-end gap-2" style={{ flexGrow: "1", minHeight: "40px" }}>
          {settingTimeMode && (
            <>
              {/* Notification Mode */}
              <FormButton onClick={handleNotificationMode}>
                <i className={isNotificationOn ? "fa-solid fa-bell text-primary" : "fa-regular fa-bell-slash"}></i>
              </FormButton>
              {/* Selected Time */}
              <FormButton className="flex-center flex-grow-1 gap-2" onClick={() => setSettingTimeWindow(true)}>
                <span className="text-nowrap">{formatDateAndTime(selectedDate.toISOString(), "ar")}</span>
              </FormButton>
            </>
          )}
          {/* Time Mode */}
          <FormButton className="flex-center gap-2" onClick={handleSettingTimeMode}>
            {!settingTimeMode && <span className="text-nowrap">اضف ميعادا</span>}
            <i className={(settingTimeMode ? "text-primary" : "fa-regular") + " fa-solid fa-clock"}></i>
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
          style={{ width: "450px", maxWidth: "100%" }}
          className="p-2 rounded bg-white"
          buttonTitle="ادخل"
          buttonClass="btn btn-primary w-100 mt-2"
          animationTime={350}
        >
          <div className="rounded overflow-hidden">
            <Datetime input={false} onChange={handleDateChange} initialValue={selectedDate} />
          </div>
        </PopupBox>
      )}

      <input type="submit" className="btn btn-primary w-100" value="أضف" />
    </form>
  );
}

function FormButton({ children, className, onClick }) {
  return (
    <button type="button" className={"text-muted bg-light gray-hover border-0 rounded px-3 " + className} onClick={onClick}>
      {children}
    </button>
  );
}
