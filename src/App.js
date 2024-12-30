import './App.css';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';
import React, {useState} from "react";
import {StageCell} from "./StageCell";
import harbor from './svgfiles/harbor.png';
import home from './svgfiles/home.jpeg';
import shop from './svgfiles/shop.jpeg';

import {
    CurvedStreet,
    FactoryItem,
    IndustrialTrainStation,
    Street,
    TrainTracks,
    VerticalStreet,
    WaterWithWaves
} from "./svgfiles/Svg";
import {EmptyCell} from "./components/EmptyCell";
import {
    allCorrect,
    checkCorrectness,
    COMP_TYPES_MAP,
    CON_TYPES_MAP,
    getFoundAnswers,
    initStateFromStage,
    isTypeAllFound,
    phases,
    PRO_TYPES_MAP,
    TRANSPORT_TYPES_MAP
} from "./gamestate";
import {Summary} from "./components/Summary";


//color feedback, weiter button finish screen, reset stage
function App() {
    const [currentPhase, setCurrentPhase] = useState(1);
    const [gameFinished, setGameFinished] = useState(false);
    const [currentPhaseData, setCurrentPhaseData] = useState(initStateFromStage(phases[currentPhase]));
    const [currentPhaseCompleted, setCurrentPhaseCompleted] = useState(false);


    function handleDragEnd(event) {
        const {active, over} = event;
        if (over === null) {
            return;
        }
        let chosenValue = active.data.current.value;
        if (checkCorrectness(currentPhaseData, over.id, chosenValue)) {
            if (allCorrect(currentPhaseData)) {
                if (currentPhase === Object.keys(phases).length) {
                    setGameFinished(true);
                    return;
                }
                setCurrentPhaseCompleted(true);
            } else {
                setCurrentPhaseData({...currentPhaseData});
            }
        } else {
            console.log(
                "Wrong",
                chosenValue,
                over.id,
                over.data.current.correctAnswers,
                active.data.current.value
            )
        }

    }

    let dragables = {};
    for (const curElement of currentPhaseData.stage.elements) {
        dragables[curElement.type] = [];
        let foundAnswers = getFoundAnswers(currentPhaseData, curElement.type);
        for (const answer of curElement.potentialAnswers.filter((answer) => !foundAnswers.includes(answer.id))) {
            dragables[curElement.type].push(
                <Draggable id={answer.id} key={"answ_" + answer.id} type={answer.type}>
                    <div>
                        <span className="button">{answer.name}</span>
                    </div>
                </Draggable>
            )
        }

    }

    function renderDropLine(element) {
        let elementType = element.type;
        if (elementType === 'transport' && currentPhaseData.transportTypeFound) {
            return <>
                <div className="cell">
                    <strong>Transportmittel</strong> {TRANSPORT_TYPES_MAP[currentPhaseData.transportNeeded]}</div>
                <div className="cell" style={{color: "green"}}>Richtig beantwortet</div>
            </>;
        }

        let label = '';
        let map = {};
        switch (element.type) {
            case 'transport':
                label = 'Transportmittel';
                break;
            case 'pro':
                label = '3 Vorteile';
                map = PRO_TYPES_MAP;
                break;
            case 'con':
                label = '3 Nachteile';
                map = CON_TYPES_MAP
                break;
            case 'comptype':
                label = 'Unternehmen';
                map = COMP_TYPES_MAP
                break;
            default:
                throw new Error('Unknown type');
        }
        if (elementType !== 'transport' && isTypeAllFound(currentPhaseData, elementType)) {
            return <>
                <div className="cell">
                    <strong>{label}</strong>
                    <ol style={{marginLeft: "15px"}}>
                        {element.correctAnswers.map((answer) => (
                            <li key={"correct_" + answer}>{map[answer]}</li>
                        ))}
                    </ol>
                </div>
                <div className="cell" style={{color: "green"}}>Richtig beantwortet</div>
            </>;
        }


        return <>
            <div className="cell">

                <Droppable id={element.type} key={element.type} correctAnswers={element.correctAnswers}>
                    {label}
                </Droppable>
                <ol style={{marginLeft: "15px"}}>
                    {getFoundAnswers(currentPhaseData, elementType).map((answer) => (
                        <li key={"found_" + answer}>{map[answer]}</li>
                    ))}
                </ol>
            </div>
            <div className="cell">
                {dragables[element.type]}
            </div>
        </>;
    }

    function renderSolutions() {
        if (currentPhaseData.transportTypeFound) {
            return currentPhaseData.stage.elements.map((element) => renderDropLine(element));
        }
        return renderDropLine(currentPhaseData.stage.elements[0]);

    }

    if (gameFinished) {
        return <Summary/>;
    }
    let phasePartCompletedPart = ''
    if (currentPhaseCompleted) {
        phasePartCompletedPart = (
            <>
                <button className="button is-success is-pulled-right" onClick={() => {
                    setCurrentPhase(currentPhase + 1);
                    setCurrentPhaseData(initStateFromStage(phases[currentPhase + 1]));
                    setCurrentPhaseCompleted(false);
                }}>Weiter
                </button>
                <button className="button is-warning is-light is-pulled-right" onClick={() => {
                    setCurrentPhase(currentPhase);
                    setCurrentPhaseData(initStateFromStage(phases[currentPhase]));
                    setCurrentPhaseCompleted(false);
                }}>Zurücksetzen
                </button>
            </>
        )
    }

    return (
        <>
            <section className="section">
                <div className="container">
                    <h1 className="title">
                        Transportmittel in der Supply Chain
                    </h1>

                    <div className="columns">
                        <div className="column">
                            <h1 className="title"><strong>Phase</strong> {currentPhaseData.title}</h1>
                            <DndContext onDragEnd={handleDragEnd}>
                                <div className="fixed-grid has-2-cols">
                                    <div className="grid">
                                        {renderSolutions()}
                                    </div>

                                </div>
                            </DndContext>
                            {phasePartCompletedPart}
                        </div>
                        <div className="column">
                            <h1 className="title">Karte</h1>
                            <div className="fixed-grid has-6-cols game-grid">
                                <div className="grid is-gap-0">
                                    <StageCell activeStage={currentPhase} stageNr={1} label="Shoe Factory Nike">
                                        <FactoryItem/>
                                    </StageCell>
                                    <Street/>
                                    <CurvedStreet/>
                                    <EmptyCell times={3}/>

                                    <EmptyCell times={2}/>
                                    <VerticalStreet/>
                                    <EmptyCell times={3}/>

                                    <EmptyCell times={2}/>
                                    <StageCell activeStage={currentPhase} stageNr={2} label="Hafen Asien">
                                        <img src={harbor}/>
                                    </StageCell>
                                    <WaterWithWaves/>
                                    <StageCell activeStage={currentPhase} stageNr={3} label="Hafen Europa">
                                        <img src={harbor}/>
                                    </StageCell>
                                    <EmptyCell times={3}/>

                                    <EmptyCell times={2}/>
                                    <div className="cell">
                                        <TrainTracks/>
                                    </div>
                                    <EmptyCell times={1}/>

                                    <EmptyCell times={2}/>
                                    <StageCell activeStage={currentPhase} stageNr={5} label="Schuhe boutique">
                                        <img src={shop}/>
                                    </StageCell>
                                    <Street/>
                                    <StageCell activeStage={currentPhase} stageNr={4} label="Bahnhof Wien">
                                        <IndustrialTrainStation/>
                                    </StageCell>
                                    <EmptyCell times={1}/>

                                    <EmptyCell times={2}/>
                                    <VerticalStreet/>
                                    <EmptyCell times={3}/>


                                    <EmptyCell times={2}/>
                                    <StageCell activeStage={currentPhase} stageNr={6} label="Zuhause">
                                        <img src={home}/>
                                    </StageCell>
                                </div>
                            </div>
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
