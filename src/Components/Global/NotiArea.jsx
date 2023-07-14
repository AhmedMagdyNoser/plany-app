export default function NotiArea({ isOpened, setIsOpened }) {
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
        <Notification title="العنوان" discription="احمد مجدى ابراهيم حامد" />
        <Notification title="العنوان" discription="احمد مجدى ابراهيم حامد" />
        <Notification title="العنوان" discription="احمد مجدى ابراهيم حامد" />
      </div>
    </div>
  );
}

function Notification({ title, discription }) {
  return (
    <div className="gray-hover border-bottom p-3 d-flex gap-3 align-items-center ">
      <i className="fa-solid fa-message text-muted"></i>
      <div>
        <h5>{title}</h5>
        <p className="m-0 text-muted">{discription}</p>
      </div>
    </div>
  );
}
