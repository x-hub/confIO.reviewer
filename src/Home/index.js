import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import navActions from 'app/Navigator/navigator.actions';
import template from './home.template';
import nativeStorage from "app/App/Services/nativeStorage"
import {Observable} from "rxjs"

export const talkStatus = {
    NotReviewed:"",
    Reviewed:"reviewed",
    Later:"later"
}
const actionCreators = {
    toNotReviewedTalks,
    toReviewedLaterTalks,
    toReviewedTalks

};
function fetchTalkDetail(actionType,event,talksId,type) {
    let ids = talksId.map((id)=>`${event.code}-talk-${id}`);
    return nativeStorage.getArray(ids).switchMap((e)=>{
        return Observable.of({
            type:actionType,
            payload:{
                talks:e,
                type
            }
        })
    }).toPromise()
}
function toReviewedTalks(event,talksId) {
    return fetchTalkDetail(navActions.GOTO_Swiper,event,talksId,talkStatus.Reviewed)
}
function toReviewedLaterTalks(event,talksId) {
    return fetchTalkDetail(navActions.GOTO_Swiper,event,talksId,talkStatus.Later)
}
function toNotReviewedTalks(event,talksId) {
    return fetchTalkDetail(navActions.GOTO_Swiper,event,talksId,talkStatus.NotReviewed)
}
function mapStateToProps(state) {
    return {
        ...state.home
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(template)
