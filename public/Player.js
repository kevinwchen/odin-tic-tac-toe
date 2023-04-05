// Player factory function
const Player = (playerName, playerMarker) => {
    let name = playerName
    let marker = playerMarker

    const setName = (newName) => {
        name = newName
    }

    const setMarker = (newMarker) => {
        marker = newMarker
    }
    const getName = () => name
    const getMarker = () => marker

    return {
        setName,
        setMarker,
        getName,
        getMarker,
    }
}

export default Player
