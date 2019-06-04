import React from 'react';
import {AsyncStorage} from 'react-native';
import _ from "lodash"
import {from,of} from "rxjs";


class nativeStorage {

    save(key, value) {

        return from(!_.isArray(key) ?
            AsyncStorage.setItem(key, JSON.stringify(value)) :
            AsyncStorage.multiSet(_.zip(key, value.map(JSON.stringify)))
        )
    }

    get (key) {
        return from(!_.isArray(key) ?
            AsyncStorage.getItem(key).then(JSON.parse) :
            AsyncStorage.multiGet(key).then((e) => {
                let unzipArray = _.unzip(e);
                let keys = unzipArray[0];
                let values = unzipArray[1].map(JSON.parse)
                return _.zipObject(keys, values)
            })
        )
    }
    getArray(keys){
        if(keys.length == 0) return of([])
        return from(AsyncStorage.multiGet(keys).then((e) => {
            let unzipArray = _.unzip(e);
            return unzipArray[1].map(JSON.parse)
        }))
    }
    getAllKeys() {
        return from(AsyncStorage.getAllKeys())
    }


    update(key, value) {
        return from(AsyncStorage.setItem(key, JSON.stringify(value)));
    }

    merge(key, value) {
        return from(!_.isArray(key) ?
            AsyncStorage.mergeItem(key, JSON.stringify(value)) :
            AsyncStorage.multiMerge(_.zip(key, value))
        )

    }

    remove(key) {
        return from(!_.isArray(key) ?
            AsyncStorage.removeItem(key) : AsyncStorage.multiRemove(key))
    }

    clear() {
        return from(AsyncStorage.clear());
    }


}

module.exports = new nativeStorage();
