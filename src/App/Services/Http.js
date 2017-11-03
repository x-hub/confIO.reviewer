import {Observable} from "rxjs"


class Http{
    get(url){
        return Observable.fromPromise(fetch(url).then((resp)=>resp.json()));
    }
    post(url,body,headers){
        return Observable.fromPromise(fetch(url,{
            methode:"POST",
            body,
            headers
        }))
    }
}
module.exports = new Http();