import React, { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../context/Firebase/firebaseContext";
import { AlertContext } from "../context/alert/AlertContext";
import useOnClickOutside from "../utils/useOnclickOutside";

function Note({ note, onRemove, noteType }) {
  const inputStyle = {
    width: "400px",
  };

  const { changeNote } = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const [editing, toggleEditing] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, (e) => closeEditing(e));

  const [value, setValue] = useState(note.title);

  const changeNoteHandler = (e) => {
    e.preventDefault();
    if (value !== note.title) {
      if (value.trim()) {
        changeNote(note.id, value.trim())
          .then(() => {
            alert.show("Замітку було змінено", "success");
          })
          .catch(() => {
            alert.show("Щось пішло не так :с", "danger");
          });

        setValue(value.trim());
        toggleEditing(false);
      } else {
        alert.show("Введіть новий текст замітки");
      }
    }
    toggleEditing(false);
  };

  const closeEditing = (e) => {
    if (e.target.value !== value) {
      changeNoteHandler(e);
    }
    toggleEditing(false);
  };

  const openEditing = () => {
    toggleEditing(true);
  };
  return (
    <li className={"list-group-item note"}>
      {noteType === "notes" ? (
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={() => onRemove(note.id, note.title, "completed")}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="2 2 14 14"
            className="bi bi-check2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
      ) : null}
      {editing ? (
        <div className={"container"} ref={ref}>
          <form className="form-inline ml-2">
            <div className="form-group row">
              <input
                style={inputStyle}
                className="form-control"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <button
                type="button"
                className="btn btn-outline-primary btn-sm ml-2"
                onClick={changeNoteHandler}
              >
                Змінити
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={"container"}>
          <strong>
            {noteType === "completed" || noteType === "cancelled"
              ? note.title
              : value}
          </strong>
          <small>{note.date}</small>
          {noteType === "completed" || noteType === "cancelled" ? null : (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm ml-2"
              onClick={() => openEditing()}
            >
              Редагувати
            </button>
          )}
        </div>
      )}
      {noteType === "completed" || noteType === "cancelled" ? (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onRemove(note.id, noteType)}
        >
          &times;
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onRemove(note.id, note.title, "cancelled")}
        >
          Відмінити
        </button>
      )}
    </li>
  );
}

// Hook

export default Note;
