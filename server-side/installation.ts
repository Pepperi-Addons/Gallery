
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
    return res;
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
        const blockName = 'Gallery';

        const pageComponentRelation: Relation = {
            RelationName: "PageBlock",
            Name: blockName,
            Description: `${blockName} block`,
            Type: "NgComponent",
            SubType: "NG11",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: blockName.toLowerCase(),
            ComponentName: `${blockName}Component`,
            ModuleName: `${blockName}Module`,
            EditorComponentName: `${blockName}EditorComponent`,
            EditorModuleName: `${blockName}EditorModule`,

            Schema: {
                "Fields": {
                    "galleryConfig": {
                        "Type": "Object",
                        "Fields": {
                            "maxColumn": {
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
                            "useText": {
                                "Type": "Bool",
                                "ConfigurationPerScreenSize": true
                            },
                            "cardTextColor": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "verticalAlign": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "horizontalAlign": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "textPosition": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "useTitle": {
                                "Type": "Bool",
                                "ConfigurationPerScreenSize": true
                            },
                            "titleSize": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "titleWeight": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "useDescription": {
                                "Type": "Bool",
                                "ConfigurationPerScreenSize": true
                            },
                            "groupTitleAndDescription": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "descriptionSize": {
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                            "descriptionMaxNumOfLines": {
                                "Type": "Integer",
                                "ConfigurationPerScreenSize": true
                            },
                            "border": { 
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
                                "Type": "MultipleStringValues",
                                "ConfigurationPerScreenSize": true
                            },
                        }
                    }
                }
            }
        };

        const service = new MyService(client);
        const result = await service.upsertRelation(pageComponentRelation);
        return { success:true, resultObject: result };
    } catch(err) {
        return { success: false, resultObject: err };
    }
}