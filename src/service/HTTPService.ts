import ApiStubs from "./stubs/RESTAPIStub";
import {IMap} from "../interface/AdvancedTypes";
import _ from "lodash";
import {FoodBag} from "../model/FoodBag";


export class HTTPService {
    public static POST(url:string, payload:any) {
        return getRandomDelay()
            .then(() => {
                const temp = new URL(url);
                return ApiStubs.PostStubs[temp.pathname](payload)
            })
            .then((result) => {
                return {
                    body:result,
                    status:200
                } as IResponseStub
            })
            .catch((err:Error) => {
                return {
                    status:500,
                    body: err.stack,
                } as IResponseStub
            })
    }

    public static PUT(url:string,body:any):Promise<object>{
        return fetch(url,{
            method: 'PUT',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( response => {
            if(response.status==200) {
                return response.json();
            } else {
                return null;
            }
        });
    }

    public static GET(url:string):Promise<object> {
        return fetch(url)
            .then( response => {
                if(response.status==200) {
                    return response.json();
                } else {
                    return null;
                }
            });
    }
}

export interface IResponseStub {
    status:200|404|500,
    body: any,
}

class URL {
    public search:IMap<string>|null;
    public pathname:string;
    public host:string;
    public fullpath: string;
    constructor(url:string) {
        const [fullpath,search] = url.split("?");
        const [host, ...rest] = fullpath.split("/");
        this.fullpath = fullpath;
        this.pathname = rest.join("/");
        this.host = host;
        if(search) {
            const queryParamPairs = search.split("&");
            this.search = queryParamPairs.reduce((map:any,pair) => {
                const [key,value] = pair.split("=");
                map[key] = value;
                return map;
            }, {})
        } else {
            this.search = null;
        }
    }
}

function getRandomDelay() {
    return new Promise((resolve,reject) => {
        const delayAmount = _.random(1000, 5000);
        setTimeout(() => {
            resolve();
        }, delayAmount)
    })
}