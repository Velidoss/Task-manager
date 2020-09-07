import React, { Fragment, useContext, useEffect } from "react";
import { FirebaseContext } from "../context/Firebase/firebaseContext";
import { Loader } from "./Loader";
import { Notes } from "./Notes";
import { Alert } from "./Alert";

export const Completed = () => {
  const { loading, completed, fetchNotes, removeNote } = useContext(
    FirebaseContext
  );

  useEffect(() => {
    fetchNotes("completed");
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Alert />
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Notes
            notes={completed}
            noteType={"completed"}
            onRemove={removeNote}
          />
        )}
      </Fragment>
    </div>
  );
};
