import './App.css';
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';
import React, {useState} from "react";
import {StageCell} from "./StageCell";
import harbor from './svgfiles/harbor.png';
import home from './svgfiles/home.jpeg';
import shop from './svgfiles/shop.jpeg';
import airport from './svgfiles/airport.jpg';
import trainstation from './svgfiles/trainstation.jpeg';


import {
    Clouds,
    CurvedStreet,
    FactoryItem,
    IndustrialTrainStation, River,
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

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    );


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
                    <div onClick={(e) => {
                        console.log(e)
                    }}>
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
                label = 'Vorteile';
                map = PRO_TYPES_MAP;
                break;
            case 'con':
                label = 'Nachteile';
                map = CON_TYPES_MAP
                break;
            case 'comptype':
                label = 'Reales Unternehmen';
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
                            <h2>Mit welchem Transportmittel werden die Wraen von .. zum .. lt. Grafik transportiert?</h2>
                            <h2 className="subtitle"><strong>Phase</strong> {currentPhaseData.title}</h2>
                            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
                                    <River/>
                                    <StageCell activeStage={currentPhase} stageNr={2} label="Hafen Asien">
                                        <img src={harbor}/>
                                    </StageCell>
                                    <EmptyCell times={3}/>

                                    <EmptyCell times={2}/>
                                    <WaterWithWaves/>
                                    <EmptyCell times={3}/>

                                    <EmptyCell times={2}/>

                                    <StageCell activeStage={currentPhase} stageNr={3} label="Hafen Europa">
                                        <img src={harbor}/>
                                    </StageCell>
                                    <Clouds/>
                                    <StageCell activeStage={currentPhase} stageNr={4} label="Flughafen Wien">
                                        <img src={airport}/>
                                    </StageCell>
                                    <EmptyCell times={1}/>


                                    <EmptyCell times={4}/>
                                    <TrainTracks/>
                                    <EmptyCell times={1}/>

                                    <EmptyCell times={2}/>
                                    <StageCell activeStage={currentPhase} stageNr={6} label="Geschäft">
                                        <img src={shop}/>
                                    </StageCell>
                                    <Street/>
                                    <StageCell activeStage={currentPhase} stageNr={5} label="Bahnhof Wien">
                                        <img src={trainstation}/>
                                    </StageCell>
                                    <EmptyCell times={1}/>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>Build by Petra & Christian Zellot - <a href="https://github.com/zelle7/supply-chain-guess-game">Github</a> </p>
                    <p>
                        Icons:
                        <ul style={{listStyleType: "none"}}>
                            <li><a href="https://www.flaticon.com/free-icons/train-station" title="train station icons">Train
                                station icons created by PIXARTIST - Flaticon</a></li>
                            <li><a href="https://www.flaticon.com/free-icons/airport" title="airport icons">Airport
                                icons</a></li>
                            <li><a
                                href="https://www.freepik.com/free-vector/airport-tower-concept-illustration_27638152.htm/"
                                title="Freepik">Airport tower</a></li>
                            <li><a
                                href="https://www.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_275995371.htm#fromView=keyword&page=1&position=8&uuid=49019d76-2d29-4469-b464-118a7056b0f0"
                                title="Freepik">Company Icon</a></li>
                            <li><a
                                href="https://www.freepik.com/premium-vector/https://de.freepik.com/icon/haus_5849126#fromView=keyword&page=1&position=74&uuid=989440b8-a3db-4113-81f8-5b133532ad96"
                                title="Freepik">House Icon</a></li>
                        </ul>

                    </p>
                </div>
            </footer>
        </>
    );
}

export default App;
