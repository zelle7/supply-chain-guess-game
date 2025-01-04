import React from 'react';

export function StageCell({label, activeStage, stageNr, children}) {
    let className = 'cell';
    if (stageNr === activeStage) {
        className += ' active-stage';
    } else if (stageNr < activeStage) {
        className += ' completed-stage';
    } else {
        className += ' inactive-stage';
    }
    return (
        <div className={className}>
            {children}
        </div>
    );
}