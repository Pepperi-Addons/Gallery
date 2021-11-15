import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IGallery, IHostObject, Color } from '../gallery.model';
import  { GalleryService } from '../../common/gallery.service';
import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    
    @Input()
    set hostObject(value: IHostObject) {
            this._configuration = value?.configuration

    }

    private _configuration: IGallery;
    get configuration(): IGallery {
        return this._configuration;
    }

    

    private _screenSize: PepScreenSizeType;
    @Input()
    set screenSize(value: PepScreenSizeType) {
        this._screenSize = value;
    }
    get screenSize(): PepScreenSizeType {
        return this._screenSize;
    }

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService, private galleryService: GalleryService, private layoutService: PepLayoutService) { }

    ngOnInit(): void {
        this.layoutService.onResize$.subscribe((size: PepScreenSizeType) => {
            this.screenSize = size;
        });
       
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }

    getCardWidth (){
        if(this.screenSize < PepScreenSizeType.XS){
            return ('calc((100%  - ' + (this.configuration?.galleryConfig?.gap) * (this.configuration?.galleryConfig?.maxColumns - 1) + 'rem) /' + this.configuration?.galleryConfig?.maxColumns + ')' );
        }
        else{ // FOR EXTRA SMALL SCREENS
            return ('100%;');
        }
    }

    counter(i: number) {
        return new Array(i);
    }
}
