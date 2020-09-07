import React, {Fragment, useContext, useEffect} from "react";
import {Form} from "../components/Form";
import {Notes} from "../components/Notes";
import {FirebaseContext} from "../context/Firebase/firebaseContext";
import {Loader} from "../components/Loader";
import {Alert} from "../components/Alert";

export const Home = () =>{
    const {loading, notes, fetchNotes, cancelNote} = useContext(FirebaseContext);

    useEffect(()=>{
        fetchNotes("notes")
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Alert/>
            <Fragment>
                <Form  />
                <hr/>

                {loading
                    ? <Loader/>
                    : <Notes notes={notes} noteType={"notes"} onRemove={cancelNote} />}

            </Fragment>
        </div>

    )
};