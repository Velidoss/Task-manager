import React, { Fragment, useContext, useEffect } from "react";
import { FirebaseContext } from "../context/Firebase/firebaseContext";
import { Loader } from "./Loader";
import { Notes } from "./Notes";
import { Alert } from "./Alert";

export const Cancelled = () => {
  const { loading, cancelled, fetchNotes, removeNote } = useContext(
    FirebaseContext
  );

  useEffect(() => {
    fetchNotes("cancelled");
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
            notes={cancelled}
            noteType={"cancelled"}
            onRemove={removeNote}
          />
        )}
      </Fragment>
    </div>
  );
};
