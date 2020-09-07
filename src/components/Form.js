import React, { useState, useContext } from "react";
import { AlertContext } from "../context/alert/AlertContext";
import { FirebaseContext } from "../context/Firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show("Замітку було створено", "success");
        })
        .catch(() => {
          alert.show("Щось пішло не так :с", "danger");
        });

      setValue("");
    } else {
      alert.show("Введіть текст замітки");
    }
  };

  return (
    <form className="form-inline" onSubmit={submitHandler}>
      <div className="form-group row col-sm-12">
        <input
          type="text"
          className="form-control col-sm-9 mr-3"
          placeholder={"Введіть назву замітки"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary col-sm-2 ">
          Додати замітку
        </button>
      </div>
    </form>
  );
};
