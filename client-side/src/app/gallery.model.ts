import { PepHorizontalAlignment, PepSizeType} from "@pepperi-addons/ngx-lib";
import { PepShadowSettings} from "@pepperi-addons/ngx-composite-lib/shadow-settings";
import { PepColorSettings } from "@pepperi-addons/ngx-composite-lib/color-settings";
export type textColor = 'system-primary' | 'dimmed' | 'invert' | 'strong';
export type verticalAlignment = 'start' | 'middle' | 'end';
export type textPositionStyling = 'overlaid' | 'separated';
export type groupTitleAndDescription = 'grouped' | 'ungrouped';
export type FontWeight = 'regular' | 'bold' | 'bolder';

export interface IHostObject {
    configuration: IGallery;
    parameters: any;
    // pageConfiguration?: PageConfiguration;
    // pageType?: any;
    // context?: any;
    // filter?: any;
}

export interface IGallery{
    galleryConfig: IGalleryEditor,
    cards: Array<ICardEditor>
}

export class IGalleryEditor {
    maxColumns: number = 2;
    gap: PepSizeType = 'md';
    fillHeight: boolean = false;
    cardHeight: number = 16;
    useText: boolean = true;
    cardTextColor: textColor = 'system-primary';
    verticalAlign: verticalAlignment  = 'middle';
    horizontalAlign: PepHorizontalAlignment = 'center';
    textPosition: textPositionStyling = 'overlaid';
    useTitle: boolean = true;
    titleSize: PepSizeType = 'lg';
    titleWeight: FontWeight = 'regular';
    useDescription: boolean = true;
    groupTitleAndDescription: groupTitleAndDescription = 'grouped';
    descriptionSize: PepSizeType = 'md';
    descriptionMaxNumOfLines: number = 1;
    border: PepColorSettings = new PepColorSettings();
    overlay: PepColorSettings = new PepColorSettings(true, 'hsl(190, 100%, 50%)', 75);
    gradientOverlay: PepColorSettings  = new PepColorSettings(true, 'hsl(0, 0%, 90%)', 75);
    editSlideIndex: number = -1;

    dropShadow: PepShadowSettings = new PepShadowSettings();
    useRoundCorners: boolean = true;
    roundCornersSize: PepSizeType = 'md';
}

export class ICardEditor {
    id: number;
    title: string = "defaultTitle";
    description: string = "defaultDescription";
    asset: string = '';
    assetURL: string = '';
    script: any;
}
