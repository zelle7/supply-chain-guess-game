import React from "react";
import './svg.css';

export function Street() {
    return (
        <div className="cell">
            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="none">
                <rect width="100" height="100" fill="#666464"/>
                <rect y="45" x="5" width="25" height="10" fill="white"/>
                <rect y="45" x="35" width="25" height="10" fill="white"/>
                <rect y="45" x="65" width="25" height="10" fill="white"/>
            </svg>
        </div>
    );
}

export function CurvedStreet() {
    return (
        <div className="cell">
            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="none">
                <rect width="100" height="100" fill="#666464"/>
                <path d="M0,50 Q50,50 50,100" stroke="white" strokeWidth="10" fill="none"/>
            </svg>
        </div>
    );
}

export function VerticalStreet() {
    return (
        <div className="cell">
            <svg className="street" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="none">
                <rect width="100" height="100" fill="#666464"/>
                <rect y="5" x="45" height="25" width="10" fill="white"/>
                <rect y="35" x="45" height="25" width="10" fill="white"/>
                <rect y="65" x="45" height="25" width="10" fill="white"/>
            </svg>
        </div>
    );
}

export function FactoryItem() {
    return (
        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect x="10" y="50" width="80" height="40" fill="#888"/>
            <rect x="20" y="60" width="10" height="30" fill="#333"/>
            <rect x="40" y="60" width="10" height="30" fill="#333"/>
            <rect x="60" y="60" width="10" height="30" fill="#333"/>
            <rect x="80" y="60" width="10" height="30" fill="#333"/>
            <rect x="70" y="20" width="10" height="30" fill="#555"/>
            {/* Chimney */}
            <circle cx="75" cy="10" r="5" fill="#bbb"/>
            {/* Smoke */}
            <circle cx="80" cy="5" r="4" fill="#ccc"/>
            {/* Smoke */}
            <circle cx="85" cy="0" r="3" fill="#ddd"/>
            {/* Smoke */}
        </svg>
    );
}

export function AsianHarbor() {
    return (
        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Water */}
            <rect width="100" height="100" fill="#87CEEB"/>

            {/* Dock */}
            <rect x="10" y="70" width="80" height="10" fill="#8B4513"/>

            {/* Modern Warehouse */}
            <rect x="10" y="50" width="20" height="20" fill="#D2691E"/>
            <polygon points="10,50 20,40 30,50" fill="#8B4513"/>

            {/* Containers */}
            <rect x="40" y="60" width="10" height="10" fill="#FF6347"/>
            <rect x="55" y="60" width="10" height="10" fill="#4682B4"/>
            <rect x="70" y="60" width="10" height="10" fill="#32CD32"/>

            {/* Modern Crane */}
            <rect x="20" y="20" width="4" height="50" fill="#000"/>
            <rect x="20" y="20" width="30" height="4" fill="#000"/>
            <rect x="50" y="20" width="4" height="10" fill="#000"/>
            <line x1="50" y1="30" x2="40" y2="50" stroke="#000" strokeWidth="2"/>
            <line x1="40" y1="50" x2="30" y2="50" stroke="#000" strokeWidth="2"/>
            <rect x="28" y="50" width="4" height="10" fill="#000"/>
        </svg>
    );
}

export function EuropeanHarbor() {
    return (
        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Water */}
            <rect width="100" height="100" fill="#87CEEB"/>

            {/* Dock */}
            <rect x="10" y="70" width="80" height="10" fill="#8B4513"/>

            {/* Warehouse */}
            <rect x="10" y="50" width="20" height="20" fill="#D2691E"/>
            <polygon points="10,50 20,40 30,50" fill="#8B4513"/>

            {/* Containers */}
            <rect x="40" y="60" width="10" height="10" fill="#FF6347"/>
            <rect x="55" y="60" width="10" height="10" fill="#4682B4"/>
            <rect x="70" y="60" width="10" height="10" fill="#32CD32"/>


            {/* Modern Crane */}
            <rect x="20" y="20" width="4" height="50" fill="#000"/>
            <rect x="20" y="20" width="30" height="4" fill="#000"/>
            <rect x="50" y="20" width="4" height="10" fill="#000"/>
            <line x1="50" y1="30" x2="40" y2="50" stroke="#000" strokeWidth="2"/>
            <line x1="40" y1="50" x2="30" y2="50" stroke="#000" strokeWidth="2"/>
            <rect x="28" y="50" width="4" height="10" fill="#000"/>

        </svg>
    );
}

export function ConstructionSite() {
    return (
        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Background */}
            <rect width="100" height="100" fill="#87CEEB"/>

            {/* Ground */}
            <rect y="80" width="100" height="20" fill="#8B4513"/>

            {/* Crane */}
            <rect x="20" y="20" width="4" height="60" fill="#000"/>
            <rect x="20" y="20" width="40" height="4" fill="#000"/>
            <rect x="60" y="20" width="4" height="10" fill="#000"/>
            <line x1="60" y1="30" x2="40" y2="50" stroke="#000" strokeWidth="2"/>
            <line x1="40" y1="50" x2="30" y2="50" stroke="#000" strokeWidth="2"/>
            <rect x="28" y="50" width="4" height="10" fill="#000"/>

            {/* Building under construction */}
            <rect x="70" y="50" width="20" height="30" fill="#D3D3D3"/>
            <rect x="75" y="55" width="10" height="10" fill="#A9A9A9"/>
            <rect x="75" y="70" width="10" height="10" fill="#A9A9A9"/>
        </svg>
    );
}

export function TrainTracks() {
    return (
        <svg width="100" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
             xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#666464"/>
            <rect y="0" x="20" width="60" height="10" fill="#444"/>
            <rect y="20" x="20" width="60" height="10" fill="#444"/>
            <rect y="40" x="20" width="60" height="10" fill="#444"/>
            <rect y="60" x="20" width="60" height="10" fill="#444"/>
            <rect y="80" x="20" width="60" height="10" fill="#444"/>

            <rect x="34.5" width="5" height="100" fill="#999"/>
            <rect x="62.5" width="5" height="100" fill="#999"/>
        </svg>
    );
}

export function IndustrialTrainStation() {
    return (
        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Background */}
            <rect width="100" height="100" fill="#87CEEB"/>

            {/* Ground */}
            <rect y="80" width="100" height="20" fill="#8B4513"/>

            {/* Train Body */}
            <rect x="10" y="40" width="80" height="30" fill="#555"/>
            <rect x="15" y="45" width="20" height="20" fill="#777"/>
            <rect x="40" y="45" width="20" height="20" fill="#777"/>
            <rect x="65" y="45" width="20" height="20" fill="#777"/>

            {/* Train Windows */}
            <rect x="20" y="50" width="10" height="10" fill="#fff"/>
            <rect x="45" y="50" width="10" height="10" fill="#fff"/>
            <rect x="70" y="50" width="10" height="10" fill="#fff"/>

            {/* Train Wheels */}
            <circle cx="25" cy="75" r="5" fill="#000"/>
            <circle cx="50" cy="75" r="5" fill="#000"/>
            <circle cx="75" cy="75" r="5" fill="#000"/>


        </svg>
    );
}

export function WaterWithWaves() {
    return (
        <div className="cell">
            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="none">
                {/* Background */}
                <rect width="100" height="100" fill="#1E90FF"/>

                {/* Waves */}
                <path d="M10 32 Q 35 10, 50 30 T 90 30" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M10 50 Q 45 30, 50 50 T 90 50" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M10 70 Q 55 55, 50 70 T 90 70" stroke="white" strokeWidth="3" fill="none"/>
            </svg>
        </div>
    );
}

export function River() {
    return (
        <div className="cell">
            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="none">
                {/* Background */}
                <rect width="100" height="100" fill="green"/>

                {/* River Path */}
                <path d="M0 50 Q 20 40, 40 50 T 80 50 T 100 60" stroke="#1E90FF" strokeWidth="10" fill="none"/>
            </svg>
        </div>
    );
}

export function Clouds() {
    return (
        <div className="cell">
            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="none">
                {/* Background */}
                <rect width="100" height="100" fill="#87CEEB"/>

                {/* Clouds */}
                <g fill="white">
                    <ellipse cx="20" cy="30" rx="15" ry="10"/>
                    <ellipse cx="35" cy="30" rx="20" ry="12"/>
                    <ellipse cx="50" cy="30" rx="15" ry="10"/>

                    <ellipse cx="60" cy="50" rx="15" ry="10"/>
                    <ellipse cx="75" cy="50" rx="20" ry="12"/>
                    <ellipse cx="90" cy="50" rx="15" ry="10"/>
                </g>
            </svg>
        </div>
    );
}