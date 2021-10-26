
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { Relation } from '@pepperi-addons/papi-sdk'
import MyService from './my.service';

export async function install(client: Client, request: Request): Promise<any> {
    const res = await runMigration(client);
    return {success:true,resultObject:{res}}
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    // If there is any change run migration code here
    // const res = await runMigration(client);
    // return {success:true,resultObject:{res}}
    
    return {success:true,resultObject:{}}
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

async function runMigration(client){
    try {
        const blockName = 'Gallary';

        const pageComponentRelation: Relation = {
            RelationName: "PageBlock",
            Name: blockName, // TODO: change to block name
            Description: blockName + 'Description', // TODO: change to block description
            Type: "NgComponent",
            SubType: "NG11",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: blockName.toLowerCase(), // TODO: Change to uniqueName that declared in webpack.config.js
            ComponentName: `${blockName}Component`, // TODO: Change to block component name
            ModuleName: `${blockName}Module`, // TODO: Change to block module name
            EditorComponentName: `${blockName}EditorComponent`, // TODO: Change to block editor component name
            EditorModuleName: `${blockName}EditorModule` // TODO: Change to block editor module name
        };

        const service = new MyService(client);
        const result = await service.upsertRelation(pageComponentRelation);
        return result;
    } catch(e) {
        return { success: false };
    }
}