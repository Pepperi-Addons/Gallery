import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PepColorService, PepLayoutService, PepScreenSizeType, PepSizeType, PepStyleType } from '@pepperi-addons/ngx-lib';
import { IGallery, IGalleryEditor, IHostObject, ICardEditor, Overlay  } from '../../gallery.model';
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
    
    getCardWidth (){
        return ('calc((100%  - ' + (this.galleryConfig?.gap) * (this.galleryConfig?.maxColumns - 1) + 'rem) /' + this.galleryConfig?.maxColumns + ')' );
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
