import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PepColorService, PepLayoutService, PepScreenSizeType, PepSizeType, PepStyleType } from '@pepperi-addons/ngx-lib';
import { IGallery, IGalleryEditor, IHostObject, ICardEditor  } from '../../gallery.model';
import { GalleryService } from 'src/common/gallery.service';
import { PepColorSettings } from '@pepperi-addons/ngx-composite-lib/color-settings';

@Component({
    selector: 'gallery-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
   //@ViewChild('mainSlideCont', { static: true }) slideContainer: ElementRef;

    screenSize: PepScreenSizeType;
    @Input() cardIndex: number;
    @Input() galleryConfig: IGalleryEditor;
    @Input() card : ICardEditor;
    @Input() cardWidth: string;
    @Input() showSlide: boolean;

    @Output() cardClick: EventEmitter<any> = new EventEmitter();
  //public slideIndex;

    constructor(
        public layoutService: PepLayoutService,
        private pepColorService: PepColorService,
        public translate: TranslateService,
        public galleryService: GalleryService
    ) {
        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });

    }
    
    private getDefaultHostObject(): IGallery {
        return { galleryConfig: new IGalleryEditor(), cards: Array<ICardEditor>() };
    }

    // getCardImageURL() {
    //        return this.card?.assetURL !== '' ? 'url("' + this.card.assetURL + '")' : '';
    // }

    ngOnChanges(changes) { 
        if (changes) {
        }
    }

    ngOnInit() {

    }
    
    getGalleryBorder() {
        if(this.galleryConfig?.border?.use){
            let col: PepColorSettings = this.galleryConfig?.border;
            return  '1px solid ' + this.galleryService.getRGBAcolor(col);
        }
        else{
            return 'none';
        }
    }

    getGradientOverlay(){
        let gradient = this.galleryConfig?.gradientOverlay;
        let horAlign = this.galleryConfig?.horizontalAlign;
        let verAlign = this.galleryConfig?.verticalAlign; // 'top' | 'middle' | 'bottom'

        let direction = '0';

        switch(horAlign){
            case 'left':{
                direction = verAlign === 'start' ? '135' : verAlign === 'middle' ? '90' : '45';
                break;
            }
            case 'center':{
                direction = verAlign === 'start' ? '180' : verAlign === 'middle' ? 'circle' : '0';
                break;
            }
            case 'right':{
                direction = verAlign === 'start' ? '225' : verAlign === 'middle' ? '135' : '315';
                break;
            }
        }
            direction = direction === 'circle' ? direction : direction + 'deg';

        let colorsStr =  direction !== 'circle' ? this.galleryService.getRGBAcolor(gradient,0) +' , '+ this.galleryService.getRGBAcolor(gradient) :
                                                 this.galleryService.getRGBAcolor(gradient,100) +' , '+ this.galleryService.getRGBAcolor(gradient,0);
        
                                                 let gradType = direction === 'circle' ? 'radial-gradient' : 'linear-gradient';

        let gradStr = this.galleryConfig.gradientOverlay.use ? gradType + '(' + direction +' , '+ colorsStr +')' : '';

        if(gradStr != ''){
            return gradStr ;
        }
        else{
            return 'unset';
        }
    
    }

    getOrdinal(n) {
        var s = ["th ", "st ", "nd ", "rd "];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    getAssetWithPos(){
        
        let imageSrc = this.card?.assetURL !== '' ? 'url(' +this.card?.assetURL + ')' : '';

        if(imageSrc != ''){
            return imageSrc ;
        }
        else{
            return 'unset';
        }
    }

    getOverlay(){
       return  this.galleryConfig?.overlay?.use ?  'inset 0 0 0 100vh ' + this.galleryService.getRGBAcolor(this.galleryConfig?.overlay) : 'unset' ;
    }

    onCardClicked() {
        const runScriptData = this.card?.script?.runScriptData;
        if (runScriptData) {
            // Implement script click
            this.cardClick.emit(runScriptData);
        }
    }
}
