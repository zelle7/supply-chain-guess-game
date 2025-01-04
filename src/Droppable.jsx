import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef, node} = useDroppable({
        id: props.id,
        data: {
            correctAnswers: props.correctAnswers,
        }
    });
    console.log(node);
    const style = {
        color: isOver ? 'white' : undefined,
        backgroundColor: isOver ? 'lightblue' : undefined,
        height: '100px',
        textAlign: 'center',
        horizontalAlign: 'center',
        border: '1px solid black',
        paddingTop: '20px',
    };


    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}