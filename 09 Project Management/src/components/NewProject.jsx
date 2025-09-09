import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

function NewProject({ onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const dialog = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredDueDate.trim() === "") {
      dialog.current.showModal();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={dialog} caption={"Close"}>
        <h2>입력 확인</h2>
        <p>입력에 다 안넣은듯</p>
        <p>다시 한번 확인 해보셈 ㅋ</p>
      </Modal>
      <div className="w-[32rem] mt-16 ">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Dscription" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
export default NewProject;
