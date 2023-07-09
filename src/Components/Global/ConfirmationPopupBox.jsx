export default function ConfirmationPopupBox({
  isOpened,
  setIsOpened,
  action,
  message,
  confirmButtonTitle,
  discardButtonTitle,
}) {
  function handleDelete() {
    action();
    setIsOpened(false);
  }

  return (
    isOpened && (
      <div className="overlay">
        <div className="popup border bg-white px-5 py-4 rounded-3 shadow-sm">
          <div className="popup-content">
            <p className="border-bottom pb-2 text-center">{message}</p>
            <div className="d-flex gap-2">
              <button onClick={handleDelete} className="btn btn-danger w-100">
                {confirmButtonTitle}
              </button>
              <button
                onClick={() => setIsOpened(false)}
                className="btn btn-secondary w-100"
              >
                {discardButtonTitle}
              </button>
            </div>
          </div>
          <style>
            {`
            .overlay {
              background: #0002;
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
            }
            .popup {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .popup-content {
              width: 100%;
              min-width: 175px;
              max-width: 350px;
            }
          `}
          </style>
        </div>
      </div>
    )
  );
}
