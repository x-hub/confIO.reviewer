import React from "react"
import {NetInfo} from "react-native"
import {Observable} from "rxjs"

class RxNetInfo {

    Info() {
        return this.toObservable(NetInfo.getConnectionInfo())
    }

    SubscribeToChange(handler) {
        this.handler = handler
        NetInfo.addEventListener('connectionChange', handler)
    }

    UnsubscribeToChange() {
        if (this.handler){
            NetInfo.addEventListener('connectionChange', this.handler);
            delete this["handler"]
        }

    }

    toObservable(promise) {
        return Observable.fromPromise(promise);
    }
}

module.exports = new RxNetInfo()