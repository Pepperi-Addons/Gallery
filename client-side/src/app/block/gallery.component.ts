import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IGallery, IHostObject, Color } from '../gallery.model';
import  { GalleryService } from '../../common/gallery.service';
@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    
    @ViewChild('availableSlidesContainer', { read: ElementRef }) availableBlocksContainer: ElementRef;
    
    @Input()
    set hostObject(value: IHostObject) {
            this._configuration = value?.configuration

    }

    private _configuration: IGallery;
    get configuration(): IGallery {
        return this._configuration;
    }


    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService, private galleryService: GalleryService) { }

    ngOnInit(): void {
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }

    getCardWidth (){
        return ('calc((100%  - ' + (this.configuration?.galleryConfig?.gap) * (this.configuration?.galleryConfig?.maxColumns - 1) + 'rem) /' + this.configuration?.galleryConfig?.maxColumns + ')' );
    }

    counter(i: number) {
        return new Array(i);
    }
}
