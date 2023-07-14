import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../Redux/tasksSlice";
import { randomDigits } from "../../utils";

export default function AddTask() {
  const dispatch = useDispatch();

  const [settingTimeMode, setSettingTimeMode] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const [invalidName, setInvlidName] = useState("");
  const [invalidTime, setInvlidTime] = useState("");

  function handleSettingTimeMode() {
    settingTimeMode ? setSettingTimeMode(false) : setSettingTimeMode(true);
  }

  function handleNotificationMode() {
    isNotificationOn ? setIsNotificationOn(false) : setIsNotificationOn(true);
  }

  function formValidation(formData) {
    if (!formData.get("name")) {
      setInvlidName("من فضلك ادخل اسما للمهمة");
      return false;
    } else {
      setInvlidName("");
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
    let formData = new FormData(e.target);
    if (!formValidation(formData)) return;
    dispatch(
      addTask({
        checked: false,
        id: randomDigits(9),
        name: formData.get("name"),
        time: settingTimeMode ? formData.get("time") : null,
        notify: settingTimeMode ? isNotificationOn : null,
      })
    );
    e.target.reset();
    setSettingTimeMode(false);
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
      {/* Task Name */}
      <div className={"p-2 gap-2 rounded flex-center bg-white" + (invalidName && " border-danger border")}>
        <i className="fa-solid fa-plus me-3"></i>
        <input name="name" type="text" placeholder="اضف مهمة جديدة" autoComplete="off" className="w-100 py-2 border-0" />
        <div className="flex-center gap-2 py-2 px-3 rounded gray-hover cursor-pointer text-secondary" onClick={handleSettingTimeMode}>
          <span className="text-nowrap">{settingTimeMode ? "إلغاء" : "اضف ميعادا"}</span>
          <i className={(settingTimeMode ? "fa-spin text-primary" : "fa-regular") + " fa-solid fa-clock"}></i>
        </div>
      </div>
      {invalidName && (
        <div className="text-danger">
          <i className="fa-solid fa-triangle-exclamation mx-2"></i>
          {invalidName}
        </div>
      )}

      {/* Task Time */}
      {settingTimeMode && (
        <div className={"p-2 gap-2 rounded flex-center justify-content-between flex-wrap bg-white" + (invalidTime && " border-danger border")}>
          <div className="flex-center gap-2 py-2 px-3 rounded gray-hover cursor-pointer text-secondary" onClick={handleNotificationMode}>
            <i className={isNotificationOn ? "fa-bounce fa-solid fa-bell text-primary" : "fa-regular fa-bell-slash"}></i>
            <span className="text-nowrap">{isNotificationOn ? "الاشعارات مفعلة" : "تشغيل الاشعارات"}</span>
          </div>
          <div className="flex-center">
            <div className="datetime-input">
              <input name="time" type="datetime-local" className="btn btn-outline-primary" />
            </div>
          </div>
        </div>
      )}
      {invalidTime && settingTimeMode && (
        <div className="text-danger">
          <i className="fa-solid fa-triangle-exclamation mx-2"></i>
          {invalidTime}
        </div>
      )}

      <input type="submit" className="btn btn-primary w-100" value="أضف" />
    </form>
  );
}
