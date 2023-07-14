import { useDispatch, useSelector } from "react-redux";
import { formatDateAndTimeEn } from "../../utils";
import { removeNotification } from "../../Redux/notificationsSlice";
import { useRef } from "react";
import { FadeIn } from "../Utils/Fade";

export default function NotiArea({ isOpened, setIsOpened }) {
  const notifications = useSelector((store) => store.notifications.data);

  return (
    <div className={`side-menu bg-white shadow ${!isOpened && "side-menu-closed"}`}>
      <div style={{ background: "#f8f8f8" }} className="border-bottom p-3 d-flex justify-content-between align-items-center">
        <span className="d-flex gap-2 align-items-center">
          <i className="fa-solid fa-bell"></i>
          <span className="fw-bold">الاشعارات</span>
        </span>
        <i onClick={() => setIsOpened(false)} className="fa-solid fa-xmark gray-hover p-2 rounded cursor-pointer"></i>
      </div>
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

function Notification({ notification }) {
  const dispatch = useDispatch();
  const card = useRef(0);

  return (
    <FadeIn time="1s">
      <div ref={card} className="gray-hover border-bottom p-3 d-flex flex-column gap-2">
        <div className="flex-center justify-content-between">
          <div className="flex-center gap-2 text-muted">
            <i className="fa-solid fa-message"></i>
            <span>قائمة المهام</span>
          </div>
          <small dir="ltr" className="text-muted fw-bold m-0">
            {formatDateAndTimeEn(notification.time)}
          </small>
        </div>
        <div className="flex-center">
          <div>
            <h5 className="m-0 text-dark fw-bold mb-2">{notification.name}</h5>
            <small className="text-muted">
              هل قمت بتنفيذ مهمة <span className="fw-bold">{notification.name}</span> ؟ يرجى التحقق من قائمة المهام الخاصة بك وإكمال المهمة في
              أقرب وقت ممكن.
            </small>
          </div>
          <div>
            <i
              onClick={() => {
                // we can simply dispatch(removeNotification(notification.id)); but let's add animation
                setTimeout(() => {
                  dispatch(removeNotification(notification.id));
                }, 250);
                card.current.style.animation = "fade-out 350ms";
                card.current.style.opacity = "0";
              }}
              className="fa-solid fa-trash-can fs-5 mx-3 opacity-hover cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function NoNotification() {
  return (
    <FadeIn time="1s" className="flex-center h-75 text-muted flex-column gap-3">
      <i className="fa-brands fa-pagelines gray-hover p-3 rounded" style={{ fontSize: "6.5rem" }}></i>
      <p>يبدو أنه لا توجد إشعارات الان</p>
    </FadeIn>
  );
}
