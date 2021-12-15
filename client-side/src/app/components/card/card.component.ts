import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PepColorService, PepLayoutService, PepScreenSizeType, PepSizeType, PepStyleType } from '@pepperi-addons/ngx-lib';
import { IGallery, IGalleryEditor, IHostObject, ICardEditor, Overlay, Color  } from '../../gallery.model';
import { GalleryService } from 'src/common/gallery.service';

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
        public translate: TranslateService,
        private galleryService: GalleryService
    ) {

        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });

    }
    
    private getDefaultHostObject(): IGallery {
        return { galleryConfig: new IGalleryEditor(), cards: Array<ICardEditor>() };
    }

    getCardImageURL() {
           return this.card?.imageURL !== '' ? 'url("' + this.card.imageURL + '")' : '';
    }

    ngOnChanges(changes) { 
        if (changes) {
        }
    }

    ngOnInit() {
        //this.carIdndex = this.card.id;
    }
    getGalleryBorder() {
        if(this.galleryConfig?.useBorder){
            let col: Color = this.galleryConfig?.border;
            return  '1px solid ' + this.galleryService.getRGBAcolor(col);
        }
        else{
            return 'none';
        }
    }

    getGradientOverlay(){

        let gradient = this.galleryConfig?.gradientOverlay;
        let horAlign = this.galleryConfig?.horizontalAlign;
        let verAlign = this.galleryConfig?.verticalAlign;

        let direction = '0';

        switch(horAlign){
            case 'left':{
                direction = verAlign === 'start' ? '315' : verAlign === 'center' ? '270' : '225';
                break;
            }
            case 'center':{
                direction = verAlign === 'start' ? '0' : verAlign === 'center' ? 'circle' : '180';
                break;
            }
            case 'right':{
                direction = verAlign === 'start' ? '45' : verAlign === 'center' ? '315' : '135';
                break;
            }
        }
            direction = direction === 'circle' ? direction : direction + 'deg';

        let colorsStr =  direction ! == 'circle' ? this.galleryService.getRGBAcolor(gradient,0) +' , '+ this.galleryService.getRGBAcolor(gradient) :
                                                   this.galleryService.getRGBAcolor(gradient) +' , '+ this.galleryService.getRGBAcolor(gradient,0);
        let imageSrc = this.card?.imageURL !== '' ? 'url('+this.card?.imageURL + ')' : '';
        let gradType = direction === 'circle' ? 'radial-gradient' : 'linear-gradient';

        return gradType + '(' + direction +' , '+ colorsStr +'),'+ imageSrc ;
    
    }

    getOverlay(){
       return  this.galleryConfig?.useOverlay ?  'inset 0 0 0 100vh ' + this.galleryService.getRGBAcolor(this.galleryConfig?.overlay) : 'unset' ;
    }

    onCardClicked(){
        if(this.card?.linkTo && this.card.linkTo != ''){
            var linkTo = window.open('', '_blank');
            linkTo.location.href = this.card.linkTo;
        }
    }

}
