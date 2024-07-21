import { useState } from "react";
import PromptMessage from "./components/PromptMessage";
import DeletingForm from "./components/DeletingForm";

function DeleteSection() {
  const [promptOpened, setPromptOpened] = useState<boolean>(false);
  const [deletingFormOpened, setDeletingFormOpened] = useState<boolean>(false);

  function openForm() {
    setDeletingFormOpened(true);
    setPromptOpened(false);
  }

  function cancel() {
    setDeletingFormOpened(false);
    setPromptOpened(false);
  }

  return (
    <section className="animate-fade-in">
      {promptOpened ? (
        <PromptMessage openForm={openForm} cancel={cancel} />
      ) : deletingFormOpened ? (
        <DeletingForm cancel={cancel} />
      ) : (
        <button className="btn-red-light" onClick={() => setPromptOpened(true)}>
          Delete Your Account
        </button>
      )}
    </section>
  );
}

export default DeleteSection;
