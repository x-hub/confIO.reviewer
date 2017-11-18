import {ACTIONS} from "app/App/actionsType"
import {actions} from "app/Login/LoginWithSavedSession/index"
import navActions from 'app/Navigator/navigator.actions';
import _ from "lodash"
import {talkStatus} from "app/Home/index"
export default (state = {
    event:{},
    talks:[],
    type:talkStatus.NotReviewed
}, {type,payload,routeName,params}) => {
    switch (type) {
        case navActions.Navigate :
            if(routeName === "Swiper"){
                if(params && params.hasOwnProperty('talk')) {
                    let talks = state.talks.filter((item) => item.id != params.talk.id)
                    talks = _.shuffle(talks);
                    delete payload['talk']
                    return {
                        ...state,
                        talks
                    }
                }
                return {
                    ...state,
                    ...params
                }
            }
            return {
                ...state
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
