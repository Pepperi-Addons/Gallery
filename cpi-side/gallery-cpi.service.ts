import { Client, Context, IClient, IContext } from '@pepperi-addons/cpi-node/build/cpi-side/events';
import { CLIENT_ACTION_ON_GALLERY_CARD_CLICKED, CLIENT_ACTION_ON_GALLERY_LOAD } from 'shared';
import { AddonUUID } from '../addon.config.json';

class GalleryCpiService {
    
    constructor() {}

    /***********************************************************************************************/
    //                              Private functions
    /************************************************************************************************/
    
    private async getGallery(headerKey: string): Promise<any> {
     

        return {};
    }

    public async runFlowData(flowData){
        let res;
        try{
            //pepperi.papiClient.fl
                const flow = JSON.parse(Buffer.from(flowData, 'base64').toString('utf8'));
                //todo - change to pepperi.flows(script.FlowKey).run
                res = await pepperi.flows.run(flow);
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