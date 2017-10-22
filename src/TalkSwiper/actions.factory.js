import {ACTIONS} from "app/App/actionsType"

export const actionCreators = {
    RateLater
};
function RateLater(talk) {
    return {
        type: ACTIONS.TALK_RATE_LATER,
        payload: talk
    }
}
