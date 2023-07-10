export default function ConfirmBox({
  isOpened,
  setIsOpened,
  action,
  message,
  confirmButtonTitle,
  discardButtonTitle,
}) {
  function handleAction() {
    action();
    setIsOpened(false);
  }

  return (
    <div className="overlay d-flex align-items-center justify-content-center">
      <div className="popup border bg-white px-5 py-4 rounded-3 shadow-sm">
        <div className="popup-content d-flex flex-column align-items-center justify-content-center">
          <span className="fs-1 fw-bold text-warning mb-3 circle d-flex align-items-center justify-content-center border border-warning">
            !
          </span>
          <p className="border-bottom pb-2 text-center">{message}</p>
          <div className="d-flex gap-2 w-100">
            <button onClick={handleAction} className="btn btn-danger flex-fill">
              {confirmButtonTitle}
            </button>
            <button
              onClick={() => setIsOpened(false)}
              className="btn btn-secondary flex-fill"
            >
              {discardButtonTitle}
            </button>
          </div>
        </div>
        <style>
          {`
            .overlay {
              background: #0003;
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              transition: 250ms;
              ${isOpened ? 'pointer-events: auto; opacity: 1;' : 'pointer-events: none; opacity: 0;'}
            }
            .popup {
              transition: 250ms;
              ${isOpened ? 'scale: 1; opacity: 1;' : 'scale: 0; opacity: 0;'}
            }
            .popup-content {
              width: 100%;
              min-width: 175px;
              max-width: 350px;
            }
            span.circle {
              border-radius: 50% !important;
              width: 65px;
              height: 65px;
            }
          `}
        </style>
      </div>
    </div>
  );
}
