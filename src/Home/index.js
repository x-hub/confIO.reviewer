import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import navActions, { creators as navActionCreators } from 'app/Navigator/navigator.actions';
import template from './home.template';
import {  fetchActivities } from 'app/App/Services/EventService';
import nativeStorage from "app/App/Services/nativeStorage"
import _ from 'lodash'
import {of} from "rxjs";
import { switchMap } from 'rxjs/operators';

export const TALK_STATUS = {
    NOT_REVIEWED:"",
    REVIEWED:"reviewed",
    LATER:"later"
}
const actionCreators = {
    toNotReviewedTalks,
    toReviewedLaterTalks,
    toReviewedTalks,
    fetchActionsAndNavigateToSync,
};

function fetchActionsAndNavigateToSync(event) {
    const payload = fetchActivities(event.code).toPromise()
    .then(({ actions }) => ({event,actions}))
    return navActionCreators.navigateToSync(payload)
}

function fetchTalkDetail(event,talksId,type) {
    let ids = talksId.map((id)=>`${event.code}-talk-${id}`);
    const payload = nativeStorage.getArray(ids).pipe(switchMap((e)=>{
        return of({
            talks:e,
            event,
            type
        })
    })).toPromise()
    return navActionCreators.navigateToSwiper(
        payload
    )
}
function toReviewedTalks(event,talksId) {
    return fetchTalkDetail(event,talksId,TALK_STATUS.REVIEWED)
}
function toReviewedLaterTalks(event,talksId) {
    return fetchTalkDetail(event,talksId,TALK_STATUS.LATER)
}
function toNotReviewedTalks(event,talksId) {
    return fetchTalkDetail(event,talksId,TALK_STATUS.NOT_REVIEWED)
}
function mapStateToProps(state) {
    return state.home;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(template)
