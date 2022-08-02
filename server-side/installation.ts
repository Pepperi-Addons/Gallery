
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
import { blockName, DimxRelations, GalleryScheme } from './metadata';

// export async function install(client: Client, request: Request): Promise<any> {
//     const res = await runMigration(client);
//     return res;
// }

export async function install(client: Client, request: Request): Promise<any> {

    const galleryRelationsRes = await runMigration(client);
    const dimxRes = await createDimxRelations(client);
    const dimxSchemeRes = await addDimxScheme(client);
   
    return {
        success: galleryRelationsRes.success && dimxRes.success && dimxSchemeRes.success,
        errorMessage: `galleryRelationsRes: ${galleryRelationsRes.errorMessage}, userDeviceResourceRes: ${dimxRes.errorMessage}, userDeviceResourceRes: ${dimxSchemeRes.errorMessage}`
    };
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    // If there is any change run migration code here
    const res = await runMigration(client);
    return {success:true,resultObject:{res}}
    
    // return {success:true,resultObject:{}}
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

async function runMigration(client){
    try {
        const pageComponentRelation: Relation = {
            RelationName: "PageBlock",
            Name: blockName,
            Description: `${blockName} block`,
            Type: "NgComponent",
            SubType: "NG14",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: blockName.toLowerCase(),
            ComponentName: `${blockName}Component`,
            ModuleName: `${blockName}Module`,
            EditorComponentName: `${blockName}EditorComponent`,
            EditorModuleName: `${blockName}EditorModule`,
            ElementsModule: 'WebComponents',
            ElementName: `${blockName.toLocaleLowerCase()}-element`,
            EditorElementName: `${blockName.toLocaleLowerCase()}-editor-element`,
            Schema: {
                "Fields": {
                    "galleryConfig": {
                        "Type": "Object",
                        "Fields": {
                            "maxColumns": {
                                "Type": "Integer",
                                "ConfigurationPerScreenSize": true
                            },
                            "gap": {
                                "Type": "Integer",
                                "ConfigurationPerScreenSize": true
                            },
                            "cardHeight": {
                                "Type": "Integer",
                                "ConfigurationPerScreenSize": true
                            },
                            /*"useText": {
                                "Type": "Bool",
                                "ConfigurationPerScreenSize": true
                            },
                            "cardTextColor": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },*/
                            "verticalAlign": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },
                            "horizontalAlign": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },
                            "textPosition": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },
                            /*"useTitle": {
                                "Type": "Bool",
                                "ConfigurationPerScreenSize": true
                            },*/
                            "titleSize": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },
                            /*"titleWeight": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },
                            "useDescription": {
                                "Type": "Bool",
                                "ConfigurationPerScreenSize": true
                            },*/
                            "groupTitleAndDescription": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },
                            "descriptionSize": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            },
                            "descriptionMaxNumOfLines": {
                                "Type": "Integer",
                                "ConfigurationPerScreenSize": true
                            },
                            /*"border": { 
                                "Type": "Object",
                                "Fields": {
                                    "use": {
                                        "Type": "Bool",
                                        "SupportScreenSizes": true, 
                                    },
                                    "value": {
                                        "Type": "String",
                                        "SupportScreenSizes": true, 
                                    },
                                    "opacity": {
                                        "Type": "Integer",
                                        "SupportScreenSizes": true, 
                                    }
                                }
                            },
                            "gradientOverlay": { 
                                "Type": "Object",
                                "Fields": {
                                    "use": {
                                        "Type": "Bool",
                                        "SupportScreenSizes": true, 
                                    },
                                    "value": {
                                        "Type": "String",
                                        "SupportScreenSizes": true, 
                                    },
                                    "opacity": {
                                        "Type": "Integer",
                                        "SupportScreenSizes": true, 
                                    }
                                }
                            },
                            "overlay": { 
                                "Type": "Object",
                                "Fields": {
                                    "use": {
                                        "Type": "Bool",
                                        "SupportScreenSizes": true, 
                                    },
                                    "value": {
                                        "Type": "String",
                                        "SupportScreenSizes": true, 
                                    },
                                    "opacity": {
                                        "Type": "Integer",
                                        "SupportScreenSizes": true, 
                                    }
                                }
                            },
                            "dropShadow": { 
                                "Type": "Object",
                                "Fields": {
                                    "use": {
                                        "Type": "Bool",
                                        "SupportScreenSizes": true, 
                                    },
                                    "size": {
                                        "Type": "String",
                                        "SupportScreenSizes": true, 
                                    },
                                    "intensity": {
                                        "Type": "String",
                                        "SupportScreenSizes": true, 
                                    }
                                }
                            },
                            "useRoundCorners": {
                                "Type": "Bool",
                                "ConfigurationPerScreenSize": true
                            },
                            "roundCornersSize": {
                                "Type": "String",
                                "ConfigurationPerScreenSize": true
                            }*/
                        }
                    }
                }
            }
        };

        const service = new MyService(client);
        const result = await service.upsertRelation(pageComponentRelation);
        return {success:true, errorMessage: '' };
    } catch(e) {
        return { success: false, errorMessage: e || '' };
    }
}

async function createDimxRelations(client) {
    
    let relations: Relation[] = DimxRelations;
    let relationName = '';

    try {
        const service = new MyService(client);

        relations.forEach(async (relation) => {
            relationName = relation.RelationName;
            const result = await service.upsertRelation(relation);
        });
        return {
            success: true,
            errorMessage: ''
        }
    }
    catch (err) {
        return {
            success: false,
            errorMessage: relationName + ' ' + (err ? err : 'Unknown Error Occured'),
        }
    }
}

async function addDimxScheme(client) {
    try {
        const service = new MyService(client);
        service.papiClient.addons.data.schemes.post(GalleryScheme);
        return {
            success: true,
            errorMessage: ''
        }
    }
    catch (err) {
            return {
                success: false,
                errorMessage: `Error in creating gallery scheme for dimx . error - ${err}`
            }
    }
}