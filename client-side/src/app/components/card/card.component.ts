import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PepColorService, PepLayoutService, PepScreenSizeType, PepSizeType, PepStyleType } from '@pepperi-addons/ngx-lib';
import { IGallery, IGalleryEditor, IHostObject, ICardEditor, Overlay  } from '../../gallery.model';

@Component({
    selector: 'gallery-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
   //@ViewChild('mainSlideCont', { static: true }) slideContainer: ElementRef;

    screenSize: PepScreenSizeType;
    
    @Input() galleryConfig: IGalleryEditor;
    @Input() card : ICardEditor;
    @Input() showSlide: boolean;

  //public slideIndex;

    constructor(
        public layoutService: PepLayoutService,
        private pepColorService: PepColorService,
        public translate: TranslateService
    ) {

        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });

    }
    
    private getDefaultHostObject(): IGallery {
        return { galleryConfig: new IGalleryEditor(), cards: Array<ICardEditor>() };
    }
    
    getCardWidth (){
        return ('calc((100%  - ' + (this.galleryConfig?.gap) * (this.galleryConfig?.maxColumns - 1) + 'rem) /' + this.galleryConfig?.maxColumns + ')' );
        // return (100 / this.configuration?.galleryConfig?.maxColumns) + '%';  
    }
    
    
    
    
    
    
    
    getRGBAcolor(colObj: Overlay, opac = null){
        let rgba = 'rgba(255,255,255,0';
            if(colObj){
                let color = colObj.color;
                let opacity = opac != null ? opac : parseInt(colObj.opacity);

                opacity = opacity > 0 ? opacity / 100 : 0;
                //check if allready rgba
                
                let hsl = this.pepColorService.hslString2hsl(color);
                let rgb = this.pepColorService.hsl2rgb(hsl);
                
                rgba = 'rgba('+ rgb.r + ','  + rgb.g + ',' + rgb.b + ',' + opacity + ')';
        }
        return rgba;
    }

    getBackground(){
        // todo - right left center ( 0 , color , 0 )
        //let gradient = this.card?.gradientOverlay;

        //let alignTo = this.slide?.horizontalAlign != 'center' ? this.slide?.horizontalAlign : 'left';
        //let imageSrc = this.slide?.image?.useImage ? 'url('+this.slide?.image?.src + ')' : '';
        //let gradStr = this.slide?.gradientOverlay?.useGradientOverlay ? (this.slide?.horizontalAlign != 'center' ? this.getRGBAcolor(gradient) +' , '+ this.getRGBAcolor(gradient,0) : this.getRGBAcolor(gradient,0) +' , '+ this.getRGBAcolor(gradient) +' , '+ this.getRGBAcolor(gradient,0)) : '';
        
        //gradStr = gradStr != '' ? 'linear-gradient(to ' + alignTo +', ' +  gradStr +')' : '';
        
        //return   gradStr  +  (this.slide?.image?.useImage && this.slide?.gradientOverlay?.useGradientOverlay ?  ',' : '') + imageSrc;
    }

    getSlideboxHeight() {
           // let height = parseInt(this.galleryConfig.height);
            //let remTodecrease =  8 * (100 / document.documentElement.clientHeight);
            //return (height - remTodecrease).toString() + this.slideshowConfig.heightUnit;
    }

    ngOnChanges(changes) { 
        if (changes) {
        }
    }

    ngOnInit() {
        //this.carIdndex = this.card.id;
    }

    onSlideButtonClicked(btnName: string){
        if(this.card[btnName] && this.card[btnName].linkTo != ''){
            var linkTo = window.open('', '_blank');
            linkTo.location.href = this.card[btnName].linkTo;
        }
    }

}
