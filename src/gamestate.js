import {shuffle} from "./utils";

export function mapConstantsToMap(constantArray) {
    return constantArray.reduce((acc, cur) => {
        acc[cur.id] = cur.name;
        return acc;
    }, {});
}

export const TRANSPORT_TYPES = [
    {
        id: 'truck',
        name: 'LKW',
        type: 'transport',
    },
    {
        id: 'ship1',
        name: 'Binnenschiff',
        type: 'transport',
    },
    {
        id: 'ship2',
        name: 'Seeschiff',
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
export const TRANSPORT_TYPES_MAP = mapConstantsToMap(TRANSPORT_TYPES);

const PRO_TYPES = [
    {id: 'pro1', name: 'Kostengünstig', type: 'pro'},
    {id: 'pro2', name: 'Flexibel bei Route und Reichweite', type: 'pro'},
    {id: 'pro3', name: 'Haus-zu-Haus Zustellung', type: 'pro'},
    {id: 'pro4', name: 'Umweltfreundlich', type: 'pro'},
    {id: 'pro5', name: 'Relativ sicher', type: 'pro'},
    {id: 'pro6', name: 'Kein Staurisiko', type: 'pro'},
    {id: 'pro7', name: 'Große Ladekapazität', type: 'pro'},
    {id: 'pro8', name: 'Größte Ladekapazität', type: 'pro'},
    {id: 'pro9', name: 'Größte Gütermengen möglich im Fernverkehr', type: 'pro'},
    {id: 'pro10', name: 'Schnell', type: 'pro'},
    {id: 'pro11', name: 'Hohe Netzdichte', type: 'pro'},
    {id: 'pro12', name: 'Geringe Beschädigungs-Gefahr', type: 'pro'},
];

export const PRO_TYPES_MAP = mapConstantsToMap(PRO_TYPES);

const CON_TYPES = [
    {id: "con1", name: "Schadstoffreich", type: "con"},
    {id: "con2", name: "Sonn- und Feiertagsfahrverbot", type: "con"},
    {id: "con3", name: "Lieferungen durch Staus und Unfälle gefährdet", type: "con"},
    {id: "con4", name: "An Schienennetz gebunden", type: "con"},
    {id: "con5", name: "Notwendigkeit des Umladens", type: "con"},
    {id: "con6", name: "An Fahrpläne gebunden", type: "con"},
    {id: "con7", name: "Relativ langsam", type: "con"},
    {id: "con8", name: "An Flussnetz gebunden", type: "con"},
    {id: "con9", name: "Schadensanfällig/Piraterie", type: "con"},
    {id: "con10", name: "Am Teuersten", type: "con"},
    {id: "con11", name: "Geringe Ladekapazität", type: "con"},
    {id: "con12", name: "Hohe Lärm- und Luftbelastung", type: "con"},
];

export const CON_TYPES_MAP = mapConstantsToMap(CON_TYPES);

export const COMP_TYPES = [
    {
        id: 'comp1',
        name: 'Gartner KG',
        type: 'comptype',
    },
    {
        id: 'comp2',
        name: 'Rail Cargo Group',
        type: 'comptype',
    },
    {
        id: 'comp3',
        name: 'Gebr. Väth GmbH & Co. KG',
        type: 'comptype',
    },
    {
        id: 'comp4',
        name: 'Hapag-Lloyd AG',
        type: 'comptype',
    },
    {
        id: 'comp5',
        name: 'Lufthansa Cargo AG',
        type: 'comptype',
    },
];

export const COMP_TYPES_MAP = mapConstantsToMap(COMP_TYPES);

export const phases = {
    1: {
        elements: [
            {
                type: 'transport',
                correctAnswers: ['ship1'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                correctAnswers: ['pro1', 'pro4', 'pro7'],
                potentialAnswers: shuffle(PRO_TYPES),
            },
            {
                type: 'con',
                correctAnswers: ['con7', 'con5', 'con8'],
                potentialAnswers: shuffle(CON_TYPES),
            },
            {
                type: 'comptype',
                correctAnswers: ['comp3'],
                potentialAnswers: shuffle(COMP_TYPES),
            }
        ],
        title: 'Fabrik -> Hafen Asien',
    },
    2: {
        elements: [
            {
                type: 'transport',
                correctAnswers: ['ship2'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                correctAnswers: ['pro1', 'pro8', 'pro9'],
                potentialAnswers: shuffle(PRO_TYPES),
            },
            {
                type: 'con',
                correctAnswers: ['con7', 'con5', 'con9'],
                potentialAnswers: shuffle(CON_TYPES),
            },
            {
                type: 'comptype',
                correctAnswers: ['comp4'],
                potentialAnswers: shuffle(COMP_TYPES),
            }
        ],
        title: 'Hafen Asien -> Hafen Europa',
    },
    3: {
        elements: [
            {
                type: 'transport',
                correctAnswers: ['airplane'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                correctAnswers: ['pro10', 'pro11', 'pro12'],
                potentialAnswers: shuffle(PRO_TYPES),
            },
            {
                type: 'con',
                correctAnswers: ['con10', 'con11', 'con12'],
                potentialAnswers: shuffle(CON_TYPES),
            },
            {
                type: 'comptype',
                correctAnswers: ['comp5'],
                potentialAnswers: shuffle(COMP_TYPES),
            }
        ],
        title: 'Hafen Europa -> Flughafen Wien',
    },
    4: {
        elements: [
            {
                type: 'transport',
                correctAnswers: ['train'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                correctAnswers: ['pro4', 'pro5', 'pro6'],
                potentialAnswers: shuffle(PRO_TYPES),
            },
            {
                type: 'con',
                correctAnswers: ['con4', 'con5', 'con6'],
                potentialAnswers: shuffle(CON_TYPES),
            },
            {
                type: 'comptype',
                correctAnswers: ['comp2'],
                potentialAnswers: shuffle(COMP_TYPES),
            }
        ],
        title: 'Flughafen Wien -> Bahnhof Wien',
    },
    5: {
        elements: [
            {
                type: 'transport',
                correctAnswers: ['truck'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                correctAnswers: ['pro1', 'pro2', 'pro3'],
                potentialAnswers: shuffle(PRO_TYPES),
            },
            {
                type: 'con',
                correctAnswers: ['con1', 'con2', 'con3'],
                potentialAnswers: shuffle(CON_TYPES),
            },
            {
                type: 'comptype',
                correctAnswers: ['comp1'],
                potentialAnswers: shuffle(COMP_TYPES),
            }
        ],
        title: 'Bahnhof Wien -> Geschäft',
    },
    6: {
        elements: [
            {
                type: 'transport',
                correctAnswers: ['truck'],
                potentialAnswers: TRANSPORT_TYPES,
            },
            {
                type: 'pro',
                correctAnswers: ['pro1', 'pro2', 'pro3'],
                potentialAnswers: shuffle(PRO_TYPES),
            },
            {
                type: 'con',
                correctAnswers: ['con1', 'con2', 'con3'],
                potentialAnswers: shuffle(CON_TYPES),
            },
            {
                type: 'comptype',
                correctAnswers: ['comp1'],
                potentialAnswers: shuffle(COMP_TYPES),
            }
        ],
        title: 'Geschäft -> Zuhause',
    },
}


export function initStateFromStage(stage) {
    return {
        title: stage.title,
        transportTypeFound: false,
        stage: stage,
        transportNeeded: stage.elements[0].correctAnswers[0],
        foundPro: [],
        proNeeded: stage.elements.filter((element) => element.type === 'pro')[0].correctAnswers,
        foundCon: [],
        conNeeded: stage.elements.filter((element) => element.type === 'con')[0].correctAnswers,
        foundComp: [],
        compNeeded: stage.elements.filter((element) => element.type === 'comptype')[0].correctAnswers,
    }
}

export function allCorrect(state) {
    return isTypeAllFound(state, 'pro') && isTypeAllFound(state, 'con') && isTypeAllFound(state, 'comptype') && state.transportTypeFound;
}

export function isTypeAllFound(state, type) {
    switch (type) {
        case 'pro':
            return state.foundPro.length === state.proNeeded.length;
        case 'con':
            return state.foundCon.length === state.conNeeded.length;
        case 'comptype':
            return state.foundComp.length === state.compNeeded.length;
        case 'transport':
            return state.transportTypeFound;
        default:
            throw new Error('Unknown type');
    }
}

export function checkCorrectness(state, type, id) {
    if (state.transportNeeded === id) {
        state.transportTypeFound = true;
        return true;
    }
    if (type === 'pro' && state.proNeeded.includes(id)) {
        state.foundPro.push(id);
        return true;
    } else if (type === 'con' && state.conNeeded.includes(id)) {
        state.foundCon.push(id);
        return true;
    } else if (type === 'comptype' && state.compNeeded.includes(id)) {
        state.foundComp.push(id);
        return true;
    }
    return false;
}

export function getFoundAnswers(state, type) {
    switch (type) {
        case 'pro':
            return state.foundPro;
        case 'con':
            return state.foundCon;
        case 'comptype':
            return state.foundComp;
        default:
            return [];
    }
}

