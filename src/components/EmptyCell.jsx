import React from 'react';

export function EmptyCell({times}) {
    if (!times) {
        times = 1;
    }
    return (
        <>
            {Array.from({length: times}).map((_, index) => (
                <div key={Math.random()} className="cell">
                    &nbsp;
                </div>
            ))}
        </>

    );
}