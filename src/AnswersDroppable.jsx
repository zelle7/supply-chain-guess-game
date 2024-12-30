
import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {Droppable} from "./Droppable";

export function AnswersDroppable(props) {
    return (
        <section>
            {props.answers.map((answer) => (
                <Droppable id={answer.key} key={answer.key}>
                    {answer.label}
                </Droppable>
            ))}
        </section>
    );
}
