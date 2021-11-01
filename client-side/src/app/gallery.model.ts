import { PepHorizontalAlignment, PepSizeType} from "@pepperi-addons/ngx-lib";

export type textColor = 'system-primary' | 'dimmed' | 'inverted' | 'strong';
export type verticalAlignment = 'start' | 'center' | 'end';
export type textPositionStyling = 'overlyed' | 'separated';
export type groupTitleAndDescription = 'grouped' | 'ungrouped';

export interface IHostObject {
    configuration: IGallery;
    // pageConfiguration?: PageConfiguration;
    // pageType?: any;
    // context?: any;
    // filter?: any;
}

export interface IGallery{
    galleryConfig: IGalleryEditor,
    cards: Array<ICardEditor>
}

export class Overlay {
    useGradientOverlay: boolean = true;
    color: string = 'hsl(0, 0%, 100%)';
    opacity: string = '0';
}

export class IGalleryEditor {
    maxColumns: number = 3;
    gap: number = 1;
    imageHeight: number = 4;
    useText: boolean = true;
    cardTextColor: textColor = 'system-primary';
    verticalAlign: verticalAlignment  = 'center';
    horizontalAlign: PepHorizontalAlignment = 'left';
    textPosition: textPositionStyling = 'separated';
    useTitle: boolean = true;
    titleSize: PepSizeType = 'lg';
    useDescription: boolean = true;
    groupTitleAndDescription: groupTitleAndDescription = 'grouped';
    descriptionSize: PepSizeType = 'md';
    descriptionMaxNumOfLines: number = 3;

}

export class ICardEditor {

}