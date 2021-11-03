import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IHostObject, Color } from '../gallery.model';
import  { GalleryService } from '../../common/gallery.service';
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

    constructor(private translate: TranslateService, private galleryService: GalleryService) { }

    ngOnInit(): void {
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }

    getGradientOverlay(){

        let gradient = this.configuration.galleryConfig.gradientOverlay;
        let horAlign = this.configuration.galleryConfig.horizontalAlign;

        let alignTo = horAlign != 'center' ? horAlign : 'left';
        let gradStr = this.configuration.galleryConfig.useGradientOverlay ? (horAlign != 'center' ? this.galleryService.getRGBAcolor(gradient) +' , '+ this.galleryService.getRGBAcolor(gradient,0) : this.galleryService.getRGBAcolor(gradient,0) +' , '+ this.galleryService.getRGBAcolor(gradient) +' , '+ this.galleryService.getRGBAcolor(gradient,0)) : '';
        
        gradStr = gradStr != '' ? 'linear-gradient(to ' + alignTo +', ' +  gradStr +')' : '';
        
        return   gradStr;
    }

    getOverlay(){
       return  this.configuration?.galleryConfig?.useOverlay ?  'inset 0 0 0 100vh ' + this.galleryService.getRGBAcolor(this.configuration?.galleryConfig?.overlay) : 'unset' ;
    }
    
    getGalleryBorder() {
        if(this.configuration.galleryConfig.useBorder){
            let col: Color = this.configuration.galleryConfig.border;
            return  '1px solid ' + this.galleryService.getRGBAcolor(col);
        }
        else{
            return 'none';
        }
    }

    getCardWidth (){
        return ('calc((100%  - ' + (this.configuration?.galleryConfig?.gap) * (this.configuration?.galleryConfig?.maxColumns - 1) + 'rem) /' + this.configuration?.galleryConfig?.maxColumns + ')' );
        // return (100 / this.configuration?.galleryConfig?.maxColumns) + '%';  
    }

    counter(i: number) {
        return new Array(i);
    }
}
