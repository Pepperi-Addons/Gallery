import { PepHorizontalAlignment, PepSizeType} from "@pepperi-addons/ngx-lib";
import { PepShadowSettings} from "@pepperi-addons/ngx-composite-lib/shadow-settings";
import { PepColorSettings } from "@pepperi-addons/ngx-composite-lib/color-settings";
export type textColor = 'system-primary' | 'dimmed' | 'invert' | 'strong';
export type verticalAlignment = 'start' | 'center' | 'end';
export type textPositionStyling = 'overlyed' | 'separated';
export type groupTitleAndDescription = 'grouped' | 'ungrouped';
export type FontWeight = 'normal' | 'bold' | 'bolder';

export interface IHostObject {
    configuration: IGallery;
    parameters: any;
    // pageConfiguration?: PageConfiguration;
    // pageType?: any;
    // context?: any;
    // filter?: any;
}

export class Asset {
    url: string;
    key: string;
}

export interface IGallery{
    galleryConfig: IGalleryEditor,
    cards: Array<ICardEditor>
}

export class IGalleryEditor {
    maxColumns: number = 1;
    gap: number = 0.5;
    cardHeight: number = 16;
    useText: boolean = true;
    cardTextColor: textColor = 'system-primary';
    verticalAlign: verticalAlignment  = 'center';
    horizontalAlign: PepHorizontalAlignment = 'center';
    textPosition: textPositionStyling = 'overlyed';
    useTitle: boolean = true;
    titleSize: PepSizeType = 'xl';
    titleWeight: FontWeight = 'normal';
    useDescription: boolean = true;
    groupTitleAndDescription: groupTitleAndDescription = 'ungrouped';
    descriptionSize: PepSizeType = 'sm';
    descriptionMaxNumOfLines: number = 1;
    border: PepColorSettings = new PepColorSettings();
    gradientOverlay: PepColorSettings = new PepColorSettings();
    overlay: PepColorSettings = new PepColorSettings();
    editSlideIndex: number = -1;

    dropShadow: PepShadowSettings = new PepShadowSettings();
    useRoundCorners: boolean = false;
    roundCornersSize: PepSizeType = 'md';
}

export class ICardEditor {
    id: number;
    title: string = "Gallery";
    description: string = "Description";
    asset: Asset = {
        url: '',
        key: ''
    };
    //imageURL: string = "";
    // linkTo: string = "";
    script: any;
}
