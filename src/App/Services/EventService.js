import nativeStorage from "app/App/Services/nativeStorage"
import {forkJoin, of} from "rxjs"
import {switchMap, mergeMap, tap} from 'rxjs/operators';
import _ from 'lodash';
import {getBody} from './Http'

export const TALK_LIST_TYPE = {
    TALKS: 'talks',
    REVIEWED_TALKS: 'talks-reviewed',
    TBR_LATER: 'talks-later',
}

export function fetchTalks(event) {
    let talks = nativeStorage.get(`${event.code}-talks`)
    let talksReviewed = nativeStorage.get(`${event.code}-talks-reviewed`)
    let talksLater = nativeStorage.get(`${event.code}-talks-later`)
    let user = nativeStorage.get(`${event.code}-user`)
    return forkJoin([talks,talksReviewed,talksLater,user])
        .pipe(mergeMap(([talks,reviewed,later,user])=>of({event,talks,reviewed,later,user})));
}

export function persistTalks(event, talks, reviewedTalks, notReviewedTalks) {
    let talksKey = talks.map(talk => `${event.code}-talk-${talk.id}`)
    return forkJoin(
        nativeStorage.save(`${event.code}-talks`, notReviewedTalks),
        nativeStorage.save(`${event.code}-talks-reviewed`, reviewedTalks),
        nativeStorage.save(`${event.code}-talks-later`,[]),
        nativeStorage.save(talksKey, talks)
    )
}

export function firstSync({ baseUrl }) {
    const url = baseUrl.concat('cfpadmin/proposals/sync')
    return getBody(url)
}

export function getTalksList(eventCode, type) {
    return nativeStorage.get(`${eventCode}-${type}`)
}

export function setTalksListValue(eventCode, type, value) {
    return nativeStorage.save(`${eventCode}-${type}`, value)
}

export function fetchActivities(eventCode) {
    return nativeStorage.get(`${eventCode}-activity`)
        .pipe(switchMap(actions => of({ actions })))
}

export function saveActivities(eventCode, actions) {
    return nativeStorage.save(`${eventCode}-activity`, actions)
        .pipe(switchMap(actions => of({ actions })))
}

export  async function removeActivity(eventCode, action) {
    let updatedActivities  = await fetchActivities(eventCode).toPromise()
        .then(({ actions }) => {
            return _.filter(actions, ({ timestamp }) => timestamp !== action.timestamp)
        })
    await nativeStorage.save(`${eventCode}-activity`, updatedActivities).toPromise();
    return {
        actions : updatedActivities
    }

}

