import {ACTIONS} from "app/App/actionsType"
import {actions} from "app/Login/LoginWithSavedSession/index"
import navActions from 'app/Navigator/navigator.actions';
import _ from "lodash"
import {talkStatus} from "app/Home/index"
export default (state = {
    event:{},
    talks:[],

    type:talkStatus.NotReviewed
}, {type,payload}) => {
    switch (type) {
        case actions.SELECT_EVENT :
        case  navActions.GOTO_Home :
            return{
                ...state,
                event:payload.event
            }
        case navActions.GOTO_Swiper :
            if(payload.hasOwnProperty('talk')) {
                let talks = state.talks.filter((item) => item.id != payload.talk.id)
                talks = _.shuffle(talks);
                delete payload['talk']
                payload.talks = talks;
            }
            return {
                ...state,
                ...payload

            }
        case ACTIONS.TALK_RATE_LATER :
            let talks = state.talks.filter((item)=> item.id != payload.talk.id)
            return{
                ...state,
                  talks:_.shuffle(talks)
            }
        default:
            return {
                ...state
            }
    }
}

