import nativeStorage from "app/App/Services/nativeStorage"
import { Observable } from 'rxjs';

export function fetchTalks(event) {
    let talks = nativeStorage.get(`${event.code}-talks`)
    let talksReviewed = nativeStorage.get(`${event.code}-talks-reviewed`)
    let talksLater = nativeStorage.get(`${event.code}-talks-later`)
    let user = nativeStorage.get(`${event.code}-user`)

    return Observable.forkJoin([talks,talksReviewed,talksLater,user])
        .switchMap(([talks,reviewed,later,user])=>Observable.of({event,talks,reviewed,later,user}))
        .toPromise()
}


export function fetchActivities(eventCode) {
    return nativeStorage.get(`${eventCode}-activity`)
        .switchMap(actions => Observable.of({ actions }))
        .toPromise()
}
