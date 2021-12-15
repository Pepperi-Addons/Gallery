import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IGalleryEditor, IHostObject, ICardEditor, Overlay } from '../gallery.model';
import { PepButton } from '@pepperi-addons/ngx-lib/button';
import { PepColorService } from '@pepperi-addons/ngx-lib';
import { GalleryService } from 'src/common/gallery.service';
import {CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
    selector: 'gallery-editor',
    templateUrl: './gallery-editor.component.html',
    styleUrls: ['./gallery-editor.component.scss']
})
export class GalleryEditorComponent implements OnInit {
    // @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    currentCardindex: number;
    blockLoaded = false;

    @Input()
    set hostObject(value: IHostObject) {
        if (value && value.configuration) {
            this._configuration = value.configuration
        } else {
            // TODO - NEED TO ADD DEFAULT CARD
            if(this.blockLoaded){
                this.loadDefaultConfiguration();
            }
        }
    }
    
    private _configuration: IGallery;
    get configuration(): IGallery {
        return this._configuration;
    }

    public textColor: Array<PepButton> = [];
    public VerticalAlign: Array<PepButton> = [];
    public HorizentalAlign: Array<PepButton> = [];
    public TextPositionStyling: Array<PepButton> = [];
    public TitleSizes: Array<PepButton> = [];
    public DescriptionSizes: Array<PepButton> = [];
    public RoundCornersSizes: Array<PepButton> = [];
    public GroupTitleAndDescription: Array<PepButton> = [];
    public DropShadowStyle: Array<PepButton> = [];
    public DropShadowSizes: Array<PepButton> = [];

    constructor(private translate: TranslateService, private pepColorService: PepColorService, private galleryService: GalleryService) { }

    async ngOnInit(): Promise<void> {
        if (!this.configuration) {
            this.loadDefaultConfiguration();
        }
        const desktopTitle = await this.translate.get('SLIDESHOW.HEIGHTUNITS_REM').toPromise();

        this.textColor = [
            { key: 'system-primary', value:this.translate.instant('GALLERY_EDITOR.TEXT_COLOR.SYSTEM') },
            { key: 'invert', value:this.translate.instant('GALLERY_EDITOR.TEXT_COLOR.INVERT') }
        ]

        this.VerticalAlign =  [
            { key: 'start', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.TOP') },
            { key: 'center', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.MIDDLE'), disabled: this.configuration?.galleryConfig?.groupTitleAndDescription === 'ungrouped' },
            { key: 'end', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.BOTTOM') }
        ];

        this.HorizentalAlign =  [
            { key: 'left', iconName: 'text_align_right' },
            { key: 'center', iconName: 'text_align_center' },
            { key: 'right', iconName: 'text_align_left' }
        ];

        this.TextPositionStyling =  [
            { key: 'overlyed', value: this.translate.instant('GALLERY_EDITOR.TEXT_POSITION.OVERLYED') },
            { key: 'separated', value: this.translate.instant('GALLERY_EDITOR.TEXT_POSITION.SEPARATED') }
        ];

        this.DescriptionSizes = [
            { key: '2xs', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.SM') },
            { key: 'sm', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.MD') },
            { key: 'md', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.LG') },
            { key: 'lg', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.XL') }
        ];

        this.RoundCornersSizes = [
            { key: 'sm', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.SM') },
            { key: 'md', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.MD') },
            { key: 'lg', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.LG') },
            { key: '2xl', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.XL') }
        ];

        this.TitleSizes = [
            { key: 'md', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.SM') },
            { key: 'lg', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.MD') },
            { key: 'xl', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.LG') },
            { key: '2xl', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.XL') }
        ]

        this.GroupTitleAndDescription = [
            { key: 'grouped', value: this.translate.instant('GALLERY_EDITOR.GROUP.GROUPED') },
            { key: 'ungrouped', value: this.translate.instant('GALLERY_EDITOR.GROUP.UNGROUPED') },
        ]

        this.DropShadowSizes = [
            { key: 'sm', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.SM') },
            { key: 'md', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.MD') },
            { key: 'lg', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.LG') },
            { key: 'xl', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.XL') }
        ];

        this.DropShadowStyle = [
            { key: 'soft', value: this.translate.instant('GALLERY_EDITOR.SHADOW.SOFT') },
            { key: 'regular', value: this.translate.instant('GALLERY_EDITOR.SHADOW.REGULAR') },
            { key: 'hard', value: this.translate.instant('GALLERY_EDITOR.SHADOW.HARD') }
            
        ];


        // When finish load raise block-editor-loaded.
        this.hostEvents.emit({action: 'block-editor-loaded'});
        this.blockLoaded = true;
    }

    ngOnChanges(e: any): void {

    }

    private updateHostObject() {
        
        this.hostEvents.emit({
            action: 'set-configuration',
            configuration: this.configuration
        });
    }

    onGalleryFieldChange(key, event){
        const value = event && event.source && event.source.key ? event.source.key : event && event.source && event.source.value ? event.source.value :  event;

        if(key.indexOf('.') > -1){
            let keyObj = key.split('.');
            this.configuration.galleryConfig[keyObj[0]][keyObj[1]] = value;
        }
        else{
            this.configuration.galleryConfig[key] = value;
        }

        this.updateHostObject();

        if(key === 'groupTitleAndDescription' || key === 'textPosition'){
            this.VerticalAlign[1].disabled = this.configuration?.galleryConfig?.groupTitleAndDescription === 'ungrouped' || 
                                             this.configuration?.galleryConfig?.textPosition === 'separated';
            //check if the vertical align was center, if true set it automateclly to top
            if( this.configuration?.galleryConfig?.verticalAlign === 'center'){
                this.configuration.galleryConfig.verticalAlign = 'start';
            }
        }

  
    }

    private loadDefaultConfiguration() {
        this._configuration = this.getDefaultHostObject();
        this.updateHostObject();
    }

    private getDefaultCard(): ICardEditor {
        let card = new ICardEditor();
        card.id = 0;

        return card;
    }

    private getDefaultHostObject(): IGallery {
        return { galleryConfig: new IGalleryEditor(), cards: [this.getDefaultCard()] };
    }

    getSliderBackground( color){
        let alignTo = 'right';

        let col: Overlay = new Overlay();

        col.color = color;
        col.opacity = '100';

        let gradStr = this.galleryService.getRGBAcolor(col,0) +' , '+ this.galleryService.getRGBAcolor(col);
        
        return 'linear-gradient(to ' + alignTo +', ' +  gradStr +')';
    }

    addNewCardClick() {
        let card = new ICardEditor();
        card.id = (this.configuration?.cards.length);

        this.configuration?.cards.push( card);   
    }

    onCardEditClick(event){
       
        if(this.configuration?.galleryConfig?.editSlideIndex === event.id){ //close the editor
            this.configuration.galleryConfig.editSlideIndex = -1;
        }
        else{ 
            this.currentCardindex = this.configuration.galleryConfig.editSlideIndex = parseInt(event.id);
        }

        this.updateHostObject();
    }
    onCardRemoveClick(event){
        this.configuration?.cards.splice(event.id, 1);
        this.configuration?.cards.forEach(function(card, index, arr) {card.id = index; });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
         moveItemInArray(this.configuration.cards, event.previousIndex, event.currentIndex);
         for(let index = 0 ; index < this.configuration.cards.length; index++){
            this.configuration.cards[index].id = index;
         }
          this.updateHostObject();
        } 
    }

    onDragStart(event: CdkDragStart) {
        this.galleryService.changeCursorOnDragStart();
    }

    onDragEnd(event: CdkDragEnd) {
        this.galleryService.changeCursorOnDragEnd();
    }
}
