import { useNavigate } from "react-router-dom";

export default function NotiArea({ isOpened, setIsOpened }) {
  return (
    <div
      className={`noti-area bg-white shadow ${!isOpened && "noti-area-closed"}`}
    >
      <div
        style={{ background: "#f5f5f5" }}
        className="border-bottom p-3 d-flex justify-content-between align-items-center"
      >
        <span className="fw-bold">الاشعارات</span>
        <i
          onClick={() => setIsOpened(false)}
          className="fa-solid fa-xmark p-2 rounded cursor-pointer"
        ></i>
      </div>
      <div className="d-flex flex-column overflow-auto h-100">
        <Notification title="العنوان" discription="احمد مجدى ابراهيم حامد" />
        <Notification title="العنوان" discription="احمد مجدى ابراهيم حامد" />
        <Notification title="العنوان" discription="احمد مجدى ابراهيم حامد" />
      </div>

      <style>
        {`
          .noti-area {
            position: fixed;
            top: 0;
            left: 0;
            width: 325px;
            max-width: 100%;
            height: 100vh;
            z-index: 9;
            transition: 0.35s
          }
          .noti-area-closed {
            left: -350px;
            box-shadow: none !important;
          }
          .fa-xmark {
            transition: 0.25s;
          }
          .fa-xmark:hover {
            background: #eee;
          }
        `}
      </style>
    </div>
  );
}

function Notification({ title, discription }) {
  return (
    <div className="notification border-bottom p-3 d-flex gap-3 align-items-center ">
      <i className="fa-solid fa-message text-muted"></i>
      <div>
        <h5>{title}</h5>
        <p className="m-0 text-muted">{discription}</p>
      </div>
    </div>
  );
}
