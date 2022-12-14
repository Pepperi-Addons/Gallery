import '@pepperi-addons/cpi-node'
export const router:any = Router()

router.post('/prepare_assets', async (req, res)=>{
    debugger
    const configuration = req.body.Configuration;
    const cards = configuration.Data.cards as any[];
    await Promise.all(cards.map(async (card) => {
        // overwrite the cards assetURL with the local file path
        return card.assetURL = await getFilePath(card.assetURL)
    }))
    configuration.Data.cards = cards;
    res.json(configuration);
});

async function getFilePath(url) {
    // url = 'https://pfs.pepperi.com/2234563d-b17b-4ace-b836-916b039504ae/ad909780-0c23-401e-8e8e-f514cc4f6aa2/Assets/bibi.jpeg';
    const fixedURL = fixURLIfNeeded(url);
    const filePath = new URL(fixedURL).pathname;
    const fileBaseURL = new URL(fixedURL).origin;
    // TODO need to replace with funtion from Saar
    let fileUrl = '';
    try {
        fileUrl = await global['app'].getLocaFilePath(filePath, fileBaseURL);        
    } catch (error) {
        console.error(error);
        fileUrl = url;        
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

