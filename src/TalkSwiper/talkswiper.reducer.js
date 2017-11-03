import {ACTIONS} from 'app/App/actionsType';


export default (state = {
    event:null,
    talksReviewed: [],
    talksNotReviewed: [],
    talksToBeReviewedLater: [],
    current: []
}, action) => {
    switch (action.type) {
        case ACTIONS.INIT_TALKS:
            return{
                ...state,
                event:action.payload.event,
                current:action.payload.talks,
                talksNotReviewed:action.payload.talks
            }
        case ACTIONS.TALK_RATE:
            let talks = filterList(state.current,action.payload)
            const talksReviewed = state.talksReviewed.slice();
            talksReviewed.push(action.payload);
            if(state.current == state.talksNotReviewed) {
                console.log("talk not reviwed")
                return {
                    ...state,
                    talksNotReviewed: talks,
                    current: talks,
                    talksReviewed
                };
            }
            if(state.current == state.talksToBeReviewedLater)
                return {
                    ...state,
                    talksToBeReviewedLater:talks,
                    current: talks,
                    talksReviewed
                };
            if(state.current == state.talksReviewed)
                return {
                    ...state
                }
        case ACTIONS.TALK_RATE_LATER:
            talks = state.current.filter((e) => e.talk.id != action.payload.talk.id)
            const talksToBeReviewedLater = state.talksToBeReviewedLater.slice();
            talksToBeReviewedLater.push(action.payload);
            return {
                ...state,
                talksNotReviewed:talks,
                current: talks,
                talksToBeReviewedLater
            }
        case ACTIONS.SET_NOT_REVIEWED_CURRENT:
            return {
                ...state,
                current:state.talksNotReviewed
            }
        case ACTIONS.SET_REVIEWED_LATER_CURRENT :
            return {
                ...state,
                current:state.talksToBeReviewedLater
            }
        case ACTIONS.SET_REVIEWED_CURRENT:
            return {
                ...state,
                current:state.talksReviewed
            }
        default:
            return state;
    }
}
function filterList(list,slot) {
    return list.filter((e) => e.talk.id != slot.talk.id)
}
