import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FadeIn } from "../Utils/Fade";
import Notification from "../Notifications/Notification";

export default function NotiArea({ setIsOpened, animationTime }) {
  const box = useRef();
  const notifications = useSelector((store) => store.notifications.data);

  function handleClose() {
    setTimeout(() => {
      setIsOpened(false);
    }, animationTime);
    box.current.style.animation = `close ${+animationTime}ms`;
    box.current.style.left = `-500px`;
  }

  function handleClickOutside(event) {
    if (box.current && !box.current.contains(event.target)) {
      handleClose();
    }
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      handleClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    }; // The cleanup function is executed when the component unmounts.
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={box} className="box bg-white shadow">
      <header style={{ background: "#f8f8f8" }} className="border-bottom p-3 flex-center justify-content-between">
        <span className="d-flex gap-2 align-items-center">
          <i className="fa-solid fa-bell"></i>
          <span className="fw-bold">الاشعارات</span>
        </span>
        <button onClick={handleClose} style={{ background: "transparent" }} className="p-2 gray-hover rounded border-0">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>
      <div className="d-flex flex-column overflow-auto h-100">
        {notifications?.length ? (
          notifications.map((notification) => <Notification key={notification.id} notification={notification} />)
        ) : (
          <NoNotification />
        )}
      </div>

      <style>
        {`
        .box {
          position: fixed;
          top: 0;
          left: 0;
          width: 500px;
          max-width: 100%;
          height: 100vh;
          z-index: 9;
          animation: open ${+animationTime}ms;
        }
        @keyframes open {
          from { left: -500px; } to { left: 0; }
        }
        @keyframes close {
          from { left: 0; } to { left: -500px; }
        }
        `}
      </style>
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
