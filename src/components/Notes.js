import React from "react";
import {TransitionGroup,CSSTransition} from "react-transition-group";
import Note from "../pages/Note";


export const Notes =({notes, onRemove, noteType})=>{
    return (

    <TransitionGroup component={'ul'} className={'list-group'}>
        {notes.length>0 ? notes.map(note=>(
            <CSSTransition
                classNames={'note'}
                timeout={800}
                key={note.id}
            >
                <Note note={note} noteType={noteType} onRemove={onRemove} />
            </CSSTransition>
        )) : <div className="alert alert-light text-center" role="alert" >
                Замітки відсутні
            </div>}
    </TransitionGroup>
)};
