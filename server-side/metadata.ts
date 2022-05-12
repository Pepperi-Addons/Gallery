import config from '../addon.config.json';
import { AddonDataScheme, Relation } from '@pepperi-addons/papi-sdk';

export const blockName = 'Gallery';

export const DimxRelations: Relation[] = [{
        AddonUUID: config.AddonUUID,
        Name: `${blockName}Import`,
        RelationName: 'DataImportResource',
        Type: 'AddonAPI',
        Description: `${blockName} Import Relation`,
        FixRelativeURL: '/api/import_mapping'
    },
    {
        AddonUUID: config.AddonUUID,
        Name: `${blockName}Export`,
        RelationName: 'DataExportResource',
        Type: 'AddonAPI',
        Description: `${blockName} Export Relation`,
        FixRelativeURL: '/api/export_mapping'
    }];

export const GalleryScheme: AddonDataScheme = {
    Name: blockName,
    Type: 'meta_data',
    Fields: {
        'galleryConfig': {
            'Type': 'Object',
            'Fields': {
                'maxColumns': {
                    'Type': 'Integer'
                },
                'gap': {
                    'Type': 'Integer'
                },
                'cardHeight': {
                    'Type': 'Integer'
                },
                'useText': {
                    'Type': 'Bool'
                },
                'cardTextColor': {
                    'Type': 'String'
                },
                'verticalAlign': {
                    'Type': 'String'
                },
                'horizontalAlign': {
                    'Type': 'String'
                },
                'textPosition': {
                    'Type': 'String'
                },
                'useTitle': {
                    'Type': 'Bool'
                },
                'titleSize': {
                    'Type': 'String'
                },
                'titleWeight': {
                    'Type': 'String'
                },
                'useDescription': {
                    'Type': 'Bool'
                },
                'groupTitleAndDescription': {
                    'Type': 'String'
                },
                'descriptionSize': {
                    'Type': 'String'
                },
                'descriptionMaxNumOfLines': {
                    'Type': 'Integer'
                },
                'border': { 
                    'Type': 'Object',
                    'Fields': {
                        'use': {
                            'Type': 'Bool'
                        },
                        'value': {
                            'Type': 'String' 
                        },
                        'opacity': {
                            'Type': 'Integer' 
                        }
                    }
                },
                'gradientOverlay': { 
                    'Type': 'Object',
                    'Fields': {
                        'use': {
                            'Type': 'Bool' 
                        },
                        'value': {
                            'Type': 'String' 
                        },
                        'opacity': {
                            'Type': 'Integer' 
                        }
                    }
                },
                'overlay': { 
                    'Type': 'Object',
                    'Fields': {
                        'use': {
                            'Type': 'Bool' 
                        },
                        'value': {
                            'Type': 'String' 
                        },
                        'opacity': {
                            'Type': 'Integer' 
                        }
                    }
                },
                'dropShadow': { 
                    'Type': 'Object',
                    'Fields': {
                        'use': {
                            'Type': 'Bool' 
                        },
                        'size': {
                            'Type': 'String' 
                        },
                        'intensity': {
                            'Type': 'String' 
                        }
                    }
                },
                'useRoundCorners': {
                    'Type': 'Bool'
                },
                'roundCornersSize': {
                    'Type': 'String'
                }
            }
        } as any,
        'cards': {
            'Type': 'Array',
            'Items': {
                'Type': 'Object',
                'Fields': {
                    'title': {
                        'Type': 'String'
                    },
                    'description': {
                        'Type': 'String'
                    },
                    'script': {
                        'Type': 'Object',
                         'Fields': {
                            'Key': {
                                'Type': 'String'
                            },
                            'Data': {
                                'Type': 'Object',
                                'Fields': {
                                    'TODO': 'ADD THE PARAMS'
                                }
                            }
                        }
                    },
                }
            }
        } as any
    }
}

