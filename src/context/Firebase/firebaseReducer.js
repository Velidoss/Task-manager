import {
    ADD_NOTE,
    FETCH_NOTES,
    REMOVE_NOTE,
    SHOW_LOADER,
    CHANGE_NOTE,
    ADD_CANCELLED_NOTE,
    ADD_COMPLETED_NOTE,
    FETCH_COMPLETED_NOTES,
    FETCH_CANCELLED_NOTES, REMOVE_COMPLETED_NOTE, REMOVE_CANCELLED_NOTE,
} from "../Types";

const handlers = {
    [SHOW_LOADER]: state=>({...state, loading:true}),
    [ADD_NOTE]: (state, {payload})=>({
        ...state,
        notes:[...state.notes, payload]
    }),
    [FETCH_NOTES]: (state, {payload})=>({...state, notes: payload, loading:false}),
    [FETCH_COMPLETED_NOTES]: (state, {payload})=>({...state, completed: payload, loading:false}),
    [FETCH_CANCELLED_NOTES]: (state, {payload})=>({...state, cancelled: payload, loading:false}),
    [REMOVE_NOTE]: (state, {payload})=>({
        ...state,
        notes: state.notes.filter(note=>note.id !==payload)
    }),
    [REMOVE_COMPLETED_NOTE]: (state, {payload})=>({
        ...state,
        completed: state.completed.filter(note=>note.id !==payload)
    }),
    [REMOVE_CANCELLED_NOTE]: (state, {payload})=>({
        ...state,
        cancelled: state.cancelled.filter(note=>note.id !==payload)
    }),
    [CHANGE_NOTE]: (state, {payload})=>({
        ...state,
        notes: state.notes.map(note=>{
            if(note.id === payload){
                return payload;
            }
            return note;
        })
    }),
    [ADD_CANCELLED_NOTE]: (state, {payload})=>({
       ...state,
        cancelled:[...state.cancelled, payload]
    }),
    [ADD_COMPLETED_NOTE]: (state, {payload})=>({
        ...state,
        completed:[...state.cancelled, payload]
    }),
    DEFAULT: state=> state,
};

export const firebaseReducer = (state, action)=>{
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};