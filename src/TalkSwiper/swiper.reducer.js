import { ACTIONS } from 'app/App/actionsType';
import talks from "app/Data/talks"
export default (state = {
    talksReviewed:[],
    talksNotReviewed:[],
    talksToBeReviewedLater:[],
    current:talks
}, action) => {
    switch(action.type) {
        case ACTIONS.TALK_RATE:
            let talks = state.current.filter((e)=>e.talk.id != action.payload.talk.id)
            const talksReviewed = state.talksReviewed.slice();
            talksReviewed.push(action.payload);
            return {
                ...state,
                current:talks,
                talksReviewed
            };
        case ACTIONS.TALK_RATE_LATER:
             talks = state.current.filter((e)=>e.talk.id != action.payload.talk.id)
            const talksToBeReviewedLater = state.talksToBeReviewedLater.slice();
            talksToBeReviewedLater.push(action.payload);
            return {
                ...state,
                current:talks,
                talksToBeReviewedLater
            }
        default:
            return state;
    }
}