import React, {useReducer} from "react";
import axios from 'axios';
import {FirebaseContext} from "./firebaseContext";
import {firebaseReducer} from "./firebaseReducer";
import {
    ADD_CANCELLED_NOTE, ADD_COMPLETED_NOTE,
    ADD_NOTE,
    CHANGE_NOTE, FETCH_CANCELLED_NOTES,
    FETCH_COMPLETED_NOTES,
    FETCH_NOTES, REMOVE_CANCELLED_NOTE, REMOVE_COMPLETED_NOTE,
    REMOVE_NOTE,
    SHOW_LOADER
} from "../Types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState =({children})=>{
    const initialState = {
        completed:[],
        cancelled:[],
        notes: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    const showLoader = ()=> dispatch({type:SHOW_LOADER});

    const fetchNotes = async (dataType)=>{
        showLoader();
        let contentType;
        let handlerType;
        switch(dataType){
            case "notes":
                contentType="notes";
                handlerType=FETCH_NOTES;
                break;
            case "cancelled":
                contentType="cancelled";
                handlerType=FETCH_CANCELLED_NOTES;
                break;
            case "completed":
                contentType="completed";
                handlerType=FETCH_COMPLETED_NOTES;
                break;
            default:
                return null;
        }
        const res = await axios.get(`${url}/${contentType}.json`);
        let payload;
        if(res.data){
            payload = Object.keys(res.data).map(key=>{
                return {
                    ...res.data[key],
                    id: key
                }
            });
        }else{
            payload =[]
        }
        dispatch({
            type: handlerType,
            payload
        })
    };

    const addNote = async title=>{
        const note={
            title,
            date:new Date().toJSON(),
        };
        try{
            const res= await axios.post(`${url}/notes.json`, note);
            const payload ={
                ...note,
                id:res.data.name
            };
            dispatch({
                type: ADD_NOTE,
                payload
            })
        }catch(err){
            throw new Error(err.message);
        }
    };

    const changeNote = async (id, title) =>{
        const note={
            title,
            date:new Date().toJSON(),
        };
        try{
            await axios.put(`${url}/notes/${id}.json`, note);
            const payload ={
                ...note,
                title
            };
            dispatch({
                type: CHANGE_NOTE,
                payload
            })
        }catch(err){
            throw new Error(err.message);
        }
    };

    const removeNote = async (id, noteType) =>{
        let dispatchType;
        switch(noteType){
            case "notes":
                dispatchType = REMOVE_NOTE;
                break;
            case "completed":
                dispatchType = REMOVE_COMPLETED_NOTE;
                break;
            case "cancelled":
                dispatchType = REMOVE_CANCELLED_NOTE;
                break;
            default:
                return null;
        }
        await axios.delete(`${url}/${noteType}/${id}.json`);

        dispatch({
            type:dispatchType,
            payload: id
        })
    };

    const cancelNote = async (id, title, noteType)=>{
        await removeNote(id, "notes");
        let submitType;
        let dispatchType;
        const cancelledNote = {
            title,
            date:new Date().toJSON(),
        };
        switch (noteType) {
            case "cancelled":
                dispatchType="cancelled";
                submitType=ADD_CANCELLED_NOTE;
                break;
            case "completed":
                dispatchType="completed";
                submitType=ADD_COMPLETED_NOTE;
                break;
            default:
                return null;
        }
        try{
            const res= await axios.post(`${url}/${dispatchType}.json`, cancelledNote);
            const payload ={
                ...cancelledNote,
                id:res.data.name
            };
            dispatch({
                type: submitType,
                payload
            })
        }catch(err){
            throw new Error(err);
        }
    };



    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes, changeNote, cancelNote,
            loading: state.loading,
            notes: state.notes,
            cancelled: state.cancelled,
            completed: state.completed
        }}>
            {children}
        </FirebaseContext.Provider>
    )
};