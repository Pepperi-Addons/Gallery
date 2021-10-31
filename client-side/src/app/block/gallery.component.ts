import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IHostObject } from '../gallery.model';

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


    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService) { }

    ngOnInit(): void {
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }

    getCardWidth(){
        return ('calc((100%  - ' + (this.configuration?.galleryConfig?.gap) * (this.configuration?.galleryConfig?.maxColumns - 1) + 'rem) /' + this.configuration?.galleryConfig?.maxColumns + ')' );
        // return (100 / this.configuration?.galleryConfig?.maxColumns) + '%';
        
    }
    counter(i: number) {
        return new Array(i);
    }
}
