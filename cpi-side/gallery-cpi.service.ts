import { Client, Context, IClient, IContext } from '@pepperi-addons/cpi-node/build/cpi-side/events';
import { CLIENT_ACTION_ON_GALLERY_CARD_CLICK } from 'shared';
import { AddonUUID } from '../addon.config.json';

class GalleryCpiService {
    
    constructor() {}

    /***********************************************************************************************/
    //                              Private functions
    /************************************************************************************************/
    
    private async getGallery(headerKey: string): Promise<any> {
     

        return {};
    }

    public async runFlowData(flowData, context){
        let res;
        try{
            res = await pepperi.flows.run({
                // The runFlow object
                RunFlow: flowData,  
                // dynamic parameters that will be set to the flow data
                Data: {
                   
                },
                // optional, but needed for executing client actions within flow
                // this is taken from the interceptor data
                context: context
            });
        }
        catch(err){
            res = {
                success: false
            }
        }

        return res;
    }
     /***********************************************************************************************/
    //                              Public functions
    /************************************************************************************************/


}
export default GalleryCpiService;