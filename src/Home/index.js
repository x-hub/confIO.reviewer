import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import navActions, { creators as navActionCreators } from 'app/Navigator/navigator.actions';
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
function fetchTalkDetail(event,talksId,type) {
    let ids = talksId.map((id)=>`${event.code}-talk-${id}`);
    const payload = nativeStorage.getArray(ids).switchMap((e)=>{
        return Observable.of({
            talks:e,
            event,
            type
        })
    }).toPromise()
    return navActionCreators.navigateToSwiper(
        payload
    )
}
function toReviewedTalks(event,talksId) {
    return fetchTalkDetail(event,talksId,talkStatus.Reviewed)
}
function toReviewedLaterTalks(event,talksId) {
    return fetchTalkDetail(event,talksId,talkStatus.Later)
}
function toNotReviewedTalks(event,talksId) {
    return fetchTalkDetail(event,talksId,talkStatus.NotReviewed)
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
