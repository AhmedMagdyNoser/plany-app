import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { formatDateAndTime } from "../../utils";
import { FadeIn, RemoveWithFadeOut } from "../Utils/Fade";
import { removeNotification } from "../../Redux/notificationsSlice";

export default function Notification({ notification }) {
  const card = useRef(0);
  const dispatch = useDispatch();
  const [isCardDefined, setIsCardDefined] = useState(false);

  function handleRemoveNotification() {
    dispatch(removeNotification(notification.id));
  }

  useEffect(() => {
    card.current && setIsCardDefined(true);
  }, []);

  return (
    <FadeIn milliSeconds="1000">
      <div ref={card} className="gray-hover border-bottom p-3 d-flex flex-column gap-2">
        <header className="flex-center justify-content-between">
          <div className="flex-center gap-2 text-muted">
            <i className="fa-solid fa-message"></i>
            <span>{notification.type === "task" ? "قائمة المهام" : "مجهول"}</span>
          </div>
          <small className="text-muted fw-bold m-0">{formatDateAndTime(notification.time, "ar")}</small>
        </header>
        <div className="flex-center justify-content-between">
          <div>
            <h5 className="m-0 text-dark fw-bold mb-2">{notification.title}</h5>
            {notification.type === "task" ? (
              <small className="text-muted">
                هل قمت بتنفيذ مهمة <span className="fw-bold">{notification.title}</span> ؟ يرجى التحقق من قائمة المهام الخاصة بك وإكمال المهمة في
                أقرب وقت ممكن.
              </small>
            ) : null}
          </div>
          <div>
            {isCardDefined && (
              <RemoveWithFadeOut milliSeconds="250" fadeOutElement={card.current} removeFunction={handleRemoveNotification} className="mx-3">
                <i className="fa-solid fa-trash-can fs-5 opacity-hover cursor-pointer"></i>
              </RemoveWithFadeOut>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
