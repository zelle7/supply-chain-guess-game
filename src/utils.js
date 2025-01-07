/**
 * Random function copied from https://stackoverflow.com/a/2450976
 * @param array
 */
export function shuffle(array) {
    let arrayCopy = array.slice()
    let currentIndex = arrayCopy.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
            arrayCopy[randomIndex], arrayCopy[currentIndex]];
    }
    return arrayCopy
}