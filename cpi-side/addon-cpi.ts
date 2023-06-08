import '@pepperi-addons/cpi-node';
import GalleryCpiService from './gallery-cpi.service';
import { CLIENT_ACTION_ON_GALLERY_CARD_CLICKED, CLIENT_ACTION_ON_GALLERY_LOAD } from 'shared';
export const router:any = Router()
import path from 'path';

router.post('/prepare_assets', async (req, res)=>{
    const configuration = req.body.Configuration;
    if(!(await pepperi['environment'].isWebApp())) {
        const cards = configuration.Data.cards as any[];
        await Promise.all(cards.map(async (card) => {
            // overwrite the cards assetURL with the local file path
            return card.assetURL = await getFilePath(card)
        }))
        configuration.Data.cards = cards;
    }
    res.json({Configuration: configuration});
});

async function getFilePath(card) {
    let fileUrl;

    const assetKey = card.asset;
    try {
        const res = await pepperi.addons.pfs.uuid("ad909780-0c23-401e-8e8e-f514cc4f6aa2").schema("Assets").key(assetKey).get();
        fileUrl = res.URL;
    }
    catch (error) {
        fileUrl = card.assetURL;        
    }

    return fileUrl;
}

function fixURLIfNeeded(url) {
    // "'https://pfs.pepperi.com/2234563d-b17b-4ace-b836-916b039504ae/ad909780-0c23-401e-8e8e-f514cc4f6aa2/Assets/nof3.jpeg'"
    // remove the ' from the start and the end of the string only if they exist
    if (url.startsWith("'") && url.endsWith("'")) {
        url = url.substring(1, url.length - 1);
    }
    return url;
}

export async function load(configuration: any) {
    
}
/**********************************  client events starts /**********************************/
pepperi.events.intercept(CLIENT_ACTION_ON_GALLERY_CARD_CLICKED as any, {}, async (data): Promise<any> => {
    debugger;
    const cpiService = new GalleryCpiService();
    const res = cpiService.runFlowData(data.Key, data);
    return res;

});

pepperi.events.intercept(CLIENT_ACTION_ON_GALLERY_LOAD as any, {}, async (data): Promise<any> => {
    let gallery = data.gallery;

    return gallery;
});
/***********************************  client events ends /***********************************/

