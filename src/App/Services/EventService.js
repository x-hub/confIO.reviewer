import nativeStorage from "app/App/Services/nativeStorage"
import { Observable } from 'rxjs';
import _ from 'lodash';
import Http from './Http'

export function fetchTalks(event) {
    let talks = nativeStorage.get(`${event.code}-talks`)
    let talksReviewed = nativeStorage.get(`${event.code}-talks-reviewed`)
    let talksLater = nativeStorage.get(`${event.code}-talks-later`)
    let user = nativeStorage.get(`${event.code}-user`)

    return Observable.forkJoin([talks,talksReviewed,talksLater,user])
        .switchMap(([talks,reviewed,later,user])=>Observable.of({event,talks,reviewed,later,user}))
        .toPromise()
}

export function firstSync({ baseUrl }) {
    const url = baseUrl.concat('cfpadmin/proposals/sync')
    return Http.getBody(url)
}

export function getTalksList(eventCode, type) {
    return nativeStorage.get(`${eventCode}-${type}`)
}

export function setTalksListValue(eventCode, type, value) {
    return nativeStorage.save(`${eventCode}-${type}`, value).toPromise()
}

export const TALK_LIST_TYPE = {
    TALKS: 'talks',
    REVIEWED_TALKS: 'talks-reviewed',
    TBR_LATER: 'talks-later',
}

export function fetchActivities(eventCode) {
    return nativeStorage.get(`${eventCode}-activity`)
        .switchMap(actions => Observable.of({ actions }))
        .toPromise()
}

export function saveActivities(eventCode, actions) {
    return nativeStorage.save(`${eventCode}-activity`, actions)
        .switchMap(actions => Observable.of({ actions }))
        .toPromise()
}

export function removeActivity(eventCode, action) {
    return fetchActivities(eventCode)
    .then(({ actions }) => {
        return _.filter(actions, ({ timestamp }) => timestamp !== action.timestamp)
    })
    .then((actions) => {
        return nativeStorage.save(`${eventCode}-activity`, actions)
            .toPromise()
            .then(() => ({ actions }))
    })
}

