import {Observable} from "rxjs"


class Http {
    get (url) {
        return Observable.fromPromise(fetch(url));
    }

    getBody(url) {
        return Observable.fromPromise(fetch(url).then((e) => e.json()))
    }

    post(url, props) {
        return Observable.fromPromise(fetch(url, {
                method: "POST",
                ...props
            }
        ))
    }
}

module.exports = new Http();