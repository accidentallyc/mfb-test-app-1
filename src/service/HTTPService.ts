import ApiStubs from "./stubs/RESTAPIStub";
import {IMap} from "../interface/AdvancedTypes";


export class HTTPService {
    public static POST(url:string, payload:any) {
        return getRandomDelay()
            .then(() => {
                const temp = new URL(url);
                return ApiStubs.POST[temp.pathname](payload)
            }).catch((err:Error) => {
                return {
                    status:500,
                    body: err.stack,
                }
            })
    }

    public static GET(url:string) {
        return getRandomDelay()
            .then(() => {
                const temp = new URL(url);
                return ApiStubs.POST[temp.pathname](temp.search)
            }).catch((err:Error) => {
                return {
                    status:500,
                    body: err.stack,
                }
            })
    }
}

export interface IResponseStub {
    status:200|404|500,
    body: any,
}

class URL {
    public search:IMap<string>|null;
    public pathname:string;
    constructor(url:string) {
        const [pathname,search] = url.split("?");
        this.pathname = pathname;
        if(search) {
            const queryParamPairs = search.split("&");
            this.search = queryParamPairs.reduce((map:any,pair) => {
                const [key,value] = pair.split("=");
                map[key] = value;
            }, {})
        } else {
            this.search = null;
        }
    }
}

function getRandomDelay() {
    return new Promise((resolve,reject) => {
        const delayAmount = +((Math.random() * 1000)%3).toFixed(2);
        setTimeout(() => {
            resolve();
        }, delayAmount)
    })
}