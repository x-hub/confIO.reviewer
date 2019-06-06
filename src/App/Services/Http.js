import {from, of, throwError} from "rxjs";
import {map, mergeMap} from "rxjs/operators"
let reactiveFetch  = (url, props) => from(fetch(url,{
    ...props
}))

let middlware = mergeMap((response)=>
     response.status == 200 || response.status ==304 ? of(response) : throwError(response)
)

module.exports = (()=>({
    get  : (url) => reactiveFetch(url).pipe(middlware),
    post : (url,props) => reactiveFetch(url,{
        method:"POST",
        ...props
    }).pipe(middlware),
    getBody : (url) => reactiveFetch(url).pipe(
        middlware,
        mergeMap((e)=>from(e.json()))
    )
}))();