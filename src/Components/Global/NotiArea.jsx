import { useSelector } from "react-redux";
import { FadeIn } from "../Utils/Fade";
import Notification from "../Notifications/Notification";

export default function NotiArea({ isOpened, setIsOpened }) {
  const notifications = useSelector((store) => store.notifications.data);

  return (
    <div className={`side-menu bg-white shadow ${!isOpened && "side-menu-closed"}`}>
      <header style={{ background: "#f8f8f8" }} className="border-bottom p-3 d-flex justify-content-between align-items-center">
        <span className="d-flex gap-2 align-items-center">
          <i className="fa-solid fa-bell"></i>
          <span className="fw-bold">الاشعارات</span>
        </span>
        <i onClick={() => setIsOpened(false)} className="fa-solid fa-xmark gray-hover p-2 rounded cursor-pointer"></i>
      </header>
      <div className="d-flex flex-column overflow-auto h-100">
        {notifications?.length ? (
          notifications.map((notification) => <Notification key={notification.id} notification={notification} />)
        ) : (
          <NoNotification />
        )}
      </div>
    </div>
  );
}

function NoNotification() {
  return (
    <FadeIn milliSeconds="1000" className="flex-center h-75 text-muted flex-column gap-3">
      <i className="fa-brands fa-pagelines gray-hover p-3 rounded" style={{ fontSize: "6.5rem" }}></i>
      <p>يبدو أنه لا توجد إشعارات الان</p>
    </FadeIn>
  );
}
