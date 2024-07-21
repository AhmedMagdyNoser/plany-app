function PromptMessage({ openForm, cancel }: { openForm: () => void; cancel: () => void }) {
  return (
    <div className="flex animate-fade-in flex-col items-center gap-3">
      <span className="txt-basic-h text-center text-sm font-bold sm:text-base">
        Are you sure you want to delete your account?
      </span>
      <p className="text-center">
        All data associated with your account will be <b>lost!</b>
      </p>
      <div className="flex gap-2">
        <button className="btn-red" onClick={openForm}>
          Continue
        </button>
        <button className="btn-basic" onClick={cancel}>
          Cancel
        </button>
      </div>
      <span className="text-center">This action cannot be undone.</span>
    </div>
  );
}

export default PromptMessage;
