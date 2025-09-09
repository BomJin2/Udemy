import { createPortal } from "react-dom";

function Modal({ children, caption, ref }) {
  return createPortal(
    <dialog ref={ref}>
      {children}
      <form action="modal">
        <button>{caption}</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}
export default Modal;
