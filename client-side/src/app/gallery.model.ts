import { getMatScrollStrategyAlreadyAttachedError } from "@angular/cdk/overlay/scroll/scroll-strategy";
import { PepHorizontalAlignment, PepSizeType} from "@pepperi-addons/ngx-lib";
import { PepColorService } from '@pepperi-addons/ngx-lib';
export type textColor = 'system-primary' | 'dimmed' | 'invert' | 'strong';
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
    color: string = 'hsl(0, 0%, 57%)';
    opacity: string = '0';
}

export class Color {
    color: string = 'hsl(0, 0%, 57%)';
    opacity: string = '0';
}

export class IGalleryEditor {
    maxColumns: number = 1;
    gap: number = 1;
    cardHeight: number = 16;
    useText: boolean = true;
    cardTextColor: textColor = 'invert';
    verticalAlign: verticalAlignment  = 'start';
    horizontalAlign: PepHorizontalAlignment = 'center';
    textPosition: textPositionStyling = 'separated';
    useTitle: boolean = true;
    titleSize: PepSizeType = 'xl';
    useDescription: boolean = true;
    groupTitleAndDescription: groupTitleAndDescription = 'ungrouped';
    descriptionSize: PepSizeType = 'sm';
    descriptionMaxNumOfLines: number = 2;
    useBorder: boolean = false;
    border: Color = new Color();
    useGradientOverlay: boolean = false;
    gradientOverlay: Color = new Color();
    useOverlay: boolean = false;
    overlay: Color = new Color();
}

export class ICardEditor {

}
