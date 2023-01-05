export function getDataReducer (state = [], action) {
    switch (action.type) {
        case "GAMES_FOR_SERVER":
            return action.games;
        default:
            return state;
    }
    
}