import React from "react"
import {NetInfo} from "react-native"
import {from} from "rxjs";


class RxNetInfo {

    status() {
        return this.toObservable(NetInfo.getConnectionInfo())
    }

    subscribeToChange(handler) {
        this.handler = handler
        NetInfo.addEventListener('connectionChange', handler)
    }

    unsubscribeToChange() {
        if (this.handler){
            NetInfo.removeEventListener('connectionChange', this.handler);
            this.handler = null
        }

    }

    toObservable(promise) {
        return from(promise);
    }
}

module.exports = new RxNetInfo()