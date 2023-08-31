import { Injectable } from "@angular/core";
import { IPepOption } from "@pepperi-addons/ngx-lib";
import { PapiClient, SchemeFieldType } from '@pepperi-addons/papi-sdk';
import { BehaviorSubject, Observable, distinctUntilChanged } from "rxjs";

@Injectable()
export class FlowService {

    constructor(){

    }

    ngOnInit() {
    }

    public prepareFlowHostObject(flow) {
        let flowHostObject = {};
        const runFlowData =  flow ? JSON.parse(atob(flow)) : null;
        //const runFlowData = this.menuItem?.Flow || null;
        debugger;
        const fields = {};

        if (runFlowData) {
            this.flowDynamicParameters.forEach((value, key) => {
                fields[key] = {
                    Type: value || 'String'
                };
            });
        }
        
        flowHostObject['runFlowData'] = runFlowData?.FlowKey ? runFlowData : undefined;
        flowHostObject['fields'] = fields;

        return flowHostObject;
    }

     // This subject is for load page parameter options on the filter editor (Usage only in edit mode).
     private _pageParameterOptionsSubject: BehaviorSubject<Array<IPepOption>> = new BehaviorSubject<Array<IPepOption>>([]);
     get pageParameterOptionsSubject$(): Observable<Array<IPepOption>> {
         return this._pageParameterOptionsSubject.asObservable().pipe(distinctUntilChanged());
     }
 
     // This subjects is for dynamic parameters in Options source flow (Usage only in edit mode).
     private _flowDynamicParameters = new Map<string, SchemeFieldType>();
     get flowDynamicParameters(): ReadonlyMap<string, SchemeFieldType> {
         return this._flowDynamicParameters;
     }
}