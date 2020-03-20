import ApiStubs from "./stubs/RESTAPIStub";
import {IMap} from "../interface/AdvancedTypes";


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

    public static GET(url:string) {
        return getRandomDelay()
            .then(() => {
                const temp = new URL(url);
                return ApiStubs.GetStubs[temp.pathname](temp.search)
            }).then((result) => {
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
    constructor(url:string) {
        const [fullpath,search] = url.split("?");
        const [host, ...rest] = fullpath.split("/");
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
        const delayAmount = +((Math.random() * 1000)%3).toFixed(2);
        setTimeout(() => {
            resolve();
        }, delayAmount)
    })
}