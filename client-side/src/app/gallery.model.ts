import { PepHorizontalAlignment, PepSizeType} from "@pepperi-addons/ngx-lib";
import { PepColorService } from '@pepperi-addons/ngx-lib';
export type textColor = 'system-primary' | 'dimmed' | 'invert' | 'strong';
export type verticalAlignment = 'start' | 'center' | 'end';
export type textPositionStyling = 'overlyed' | 'separated';
export type groupTitleAndDescription = 'grouped' | 'ungrouped';
export type Intensity = 'soft' | 'regular' | 'hard';

export interface IHostObject {
    configuration: IGallery;
    // pageConfiguration?: PageConfiguration;
    // pageType?: any;
    // context?: any;
    // filter?: any;
}

export class DropShadow {
    type: Intensity = 'regular';
    size: PepSizeType = 'md';
}

export interface IGallery{
    galleryConfig: IGalleryEditor,
    cards: Array<ICardEditor>
}

export class Overlay {
    useGradientOverlay: boolean = true;
    color: string = 'hsl(0, 0%, 57%)';
    opacity: string = '50';
}

export class Color {
    color: string = 'hsl(0, 0%, 57%)';
    opacity: string = '50';
}

export class IGalleryEditor {
    maxColumns: number = 1;
    gap: number = 0.5;
    cardHeight: number = 16;
    useText: boolean = true;
    cardTextColor: textColor = 'invert';
    verticalAlign: verticalAlignment  = 'center';
    horizontalAlign: PepHorizontalAlignment = 'center';
    textPosition: textPositionStyling = 'overlyed';
    useTitle: boolean = true;
    titleSize: PepSizeType = 'xl';
    useDescription: boolean = true;
    groupTitleAndDescription: groupTitleAndDescription = 'ungrouped';
    descriptionSize: PepSizeType = 'sm';
    descriptionMaxNumOfLines: number = 1;
    useBorder: boolean = false;
    border: Color = new Color();
    useGradientOverlay: boolean = true;
    gradientOverlay: Color = new Color();
    useOverlay: boolean = false;
    overlay: Color = new Color();
    editSlideIndex: number = -1;
    useDropShadow: boolean = true;
    dropShadow: DropShadow = new DropShadow();
    useRoundCorners: boolean = false;
    roundCornersSize: PepSizeType = 'md';
}

export class ICardEditor {
    id: number;
    title: string = "Gallery";
    description: string = "Description";
    imageURL: string = "";
    linkTo: string = "";
}
