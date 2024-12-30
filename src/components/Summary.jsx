import React from "react";
import {
    COMP_TYPES_MAP,
    CON_TYPES_MAP,
    initStateFromStage,
    phases,
    PRO_TYPES_MAP,
    TRANSPORT_TYPES_MAP
} from "../gamestate";

export function Summary() {
    let allStages = Object.values(phases).map((phase) => {
        return initStateFromStage(phase);
    });
    return (
        <section className="section">
            <div className="container">
                <button className="button is-primary is-large is-pulled-right" onClick={() => {
                    window.print();
                }}>Speichern
                </button>
                <h1 className="title">
                    Transportmittel in der Supply Chain
                </h1>

                <div className="" style={{paddingTop: "15px"}}>
                    {allStages.map((stage) => {
                        return <div className="panel is-info">
                            <div className="panel-heading">
                                <strong>Transportmittel:</strong> {TRANSPORT_TYPES_MAP[stage.transportNeeded]}
                            </div>
                            <div className="panel-block columns">
                                <div className="column">
                                    <strong>Vorteile:</strong>
                                    <ol style={{marginLeft: "15px"}}>
                                        {stage.proNeeded.map((pro) => {
                                            return <li>{PRO_TYPES_MAP[pro]}</li>
                                        })}
                                    </ol>
                                </div>
                                <div className="column">
                                    <strong>Nachteile:</strong>
                                    <ol style={{marginLeft: "15px"}}>
                                        {stage.conNeeded.map((con) => {
                                            return <li>{CON_TYPES_MAP[con]}</li>
                                        })}
                                    </ol>
                                </div>
                                <div className="column">
                                    <strong>Unternehmen:</strong>
                                    <ol>
                                        {stage.compNeeded.map((comp) => {
                                            return <li>{COMP_TYPES_MAP[comp]}</li>
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </section>
    );
}