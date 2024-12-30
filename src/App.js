import './App.css';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';
import React, {useState} from "react";
import {StageCell} from "./StageCell";

const TRANSPORT_TYPES = [
    {
        id: 'truck',
        name: 'LKW',
        type: 'transport',
    },
    {
        id: 'ship',
        name: 'Schiff',
        type: 'transport',
    },
    {
        id: 'airplane',
        name: 'Flugzeug',
        type: 'transport',
    },
    {
        id: 'train',
        name: 'Zug',
        type: 'transport',
    },
];

const PRO_TYPES = [
    {
        id: 'cheap',
        name: 'Billig',
        type: 'pro',
    },
    {
        id: 'fast',
        name: 'Schnell',
        type: 'pro',
    },
];


const phases = {
    1: {
        elements: [
            {
                type: 'transport',
                label: 'Transportmittel',
                correctAnswers: ['truck'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                label: 'Vorteile',
                correctAnswers: ['fast'],
                potentialAnswers: PRO_TYPES,
            }
        ],
        title: 'Fabrik',
    },
    2: {
        elements: [
            {
                type: 'transport',
                label: 'Transportmittel',
                correctAnswers: ['ship'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                label: 'Vorteile',
                correctAnswers: ['cheap'],
                potentialAnswers: PRO_TYPES,
            }
        ],
        title: 'Hafen Asien',
    },
    3: {
        elements: [
            {
                type: 'transport',
                label: 'Transportmittel',
                correctAnswers: ['ship'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                label: 'Vorteile',
                correctAnswers: ['cheap'],
                potentialAnswers: PRO_TYPES,
            }
        ],
        title: 'Hafen Europa',
    },
    4: {
        elements: [
            {
                type: 'transport',
                label: 'Transportmittel',
                correctAnswers: ['ship'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                label: 'Vorteile',
                correctAnswers: ['cheap'],
                potentialAnswers: PRO_TYPES,
            }
        ],
        title: 'Bahnhof Wien',
    },
    5: {
        elements: [
            {
                type: 'transport',
                label: 'Transportmittel',
                correctAnswers: ['ship'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                label: 'Vorteile',
                correctAnswers: ['cheap'],
                potentialAnswers: PRO_TYPES,
            }
        ],
        title: 'Schuh boutique',
    }
}

function trainTrack() {
    return <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg" >
        <rect width="200" height="100" fill="#666464"/>
        <rect y="20" width="200" height="10" fill="#444"/>
        <rect y="70" width="200" height="10" fill="#444"/>
        <rect x="45" width="10" height="100" fill="#444"/>
        <rect x="145" width="10" height="100" fill="#444"/>
    </svg>;
}

function curvedTrainTrack() {
    return (
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#666464" />

            <path d="M 20 180 Q 100 100 180 20" stroke="#444" stroke-width="10" fill="none" />

            <rect x="45" y="0" width="10" height="200" fill="#444" />
            <rect x="145" y="0" width="10" height="200" fill="#444" />
        </svg>
    );
}

function App() {
    const [currentPhase, setCurrentPhase] = useState(1);
    const [currentPhaseData, setCurrentPhaseData] = useState(phases[1]);
    const [typesAnswered, setTypesAnswered] = useState([]);


    function handleDragEnd(event) {
        const {active, over} = event;
        if (over === null) {
            return;
        }
        if (active.data.current.type === over.id && over.data.current.correctAnswers.includes(active.data.current.value)) {
            let newTypeAnswered = [...typesAnswered, active.data.current.type];
            setTypesAnswered(newTypeAnswered);
            if(newTypeAnswered.length === currentPhaseData.elements.length){
                let newPhase = currentPhase + 1;
                let phaseData = phases[newPhase];
                setCurrentPhase(newPhase);
                setCurrentPhaseData(phaseData);
                setTypesAnswered([]);
            }
        } else {
            console.log(
                "Wrong",
                active.data.current.type,
                over.id,
                over.data.current.correctAnswers,
                active.data.current.value
            )
        }

    }


    let dragables = {};
    for (const curElement of currentPhaseData.elements) {
        dragables[curElement.type] = [];
        for (const answer of curElement.potentialAnswers) {
            dragables[curElement.type].push(
                <Draggable id={answer.id} key={answer.id} type={answer.type}>
                    <div>
                        <button className="button is-large">{answer.name}</button>
                    </div>
                </Draggable>
            )
        }

    }

    function renderDropLine(element) {
        if (typesAnswered.includes(element.type)) {
            return <>
                <div className="cell">{element.label}</div>
                <div className="cell" style={{color: "green"}}>Richtig beantwortet</div>
            </>;

        }
        return <>
            <div className="cell">

                <Droppable id={element.type} key={element.type} correctAnswers={element.correctAnswers}>
                    {element.label}
                </Droppable>

            </div>
            <div className="cell">
                {dragables[element.type]}
            </div>
        </>;
    }

    return (
        <>
            <section className="section" style={{"width": "1200px"}}>
                <div className="container">
                    <h1 className="title">
                        Transportmittel in der Supply Chain
                    </h1>
                    <DndContext onDragEnd={handleDragEnd}>
                        <div className="fixed-grid has-2-cols">
                            <h2 className="subtitle"><strong>Phase</strong> {currentPhaseData.title}</h2>
                            <div className="grid">
                                {currentPhaseData.elements.map((element) => renderDropLine(element))}


                            </div>

                        </div>
                    </DndContext>
                    <h1 className="title">Karte</h1>
                    <div className="fixed-grid has-6-cols game-grid">
                        <div className="grid">
                            <StageCell activeStage={currentPhase} stageNr={1} label="Shoe Factory Nike"/>
                            <div className="cell street-background street-lines"></div>
                            <div className="cell street-background">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell street-lines-vertical">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell street-lines-vertical">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <StageCell activeStage={currentPhase} stageNr={2} label="Hafen Asien"/>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell water">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell water">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <StageCell activeStage={currentPhase} stageNr={3} label="Hafen Europa"/>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">
                                {trainTrack()}
                            </div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">
                                {trainTrack()}
                            </div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">
                                {trainTrack()}
                            </div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">1</div>
                            <div className="cell">1</div>
                            <StageCell activeStage={currentPhase} stageNr={4} label="Bahnhof Wien"/>
                            <div className="cell">1</div>
                            <div className="cell">1</div>
                            <div className="cell">1</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell street-lines-vertical">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell street-lines-vertical">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>
                            <div className="cell">&nbsp;</div>

                            <div className="cell">1</div>
                            <div className="cell">1</div>
                            <StageCell activeStage={currentPhase} stageNr={5} label="Schuhe boutique"/>
                            <div className="cell">1</div>
                            <div className="cell">1</div>
                            <div className="cell">1</div>

                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        Icons used by <a href="https://www.flaticon.com/free-icons/factory" title="factory icons">Factory
                        icons created by Freepik - Flaticon</a>
                    </p>
                </div>
            </footer>
        </>
    );
}

export default App;
