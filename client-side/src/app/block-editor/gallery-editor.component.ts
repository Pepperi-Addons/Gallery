import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IGalleryEditor, IHostObject, ICardEditor, Overlay } from '../gallery.model';
import { PepButton } from '@pepperi-addons/ngx-lib/button';
import { PepColorService } from '@pepperi-addons/ngx-lib';
import { GalleryService } from 'src/common/gallery.service';

@Component({
    selector: 'gallery-editor',
    templateUrl: './gallery-editor.component.html',
    styleUrls: ['./gallery-editor.component.scss']
})
export class GalleryEditorComponent implements OnInit {
    // @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    set hostObject(value: IHostObject) {
        if (value && value.configuration) {
            this._configuration = value.configuration
        } else {
            // TODO - NEED TO ADD DEFAULT SLIDE
            this.loadDefaultConfiguration();
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
    public PepSizes: Array<PepButton> = [];
    public GroupTitleAndDescription: Array<PepButton> = [];

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
            { key: 'center', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.MIDDLE'), disabled: this.configuration.galleryConfig.groupTitleAndDescription === 'grouped' },
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

        this.PepSizes = [
            { key: 'sm', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.SM') },
            { key: 'md', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.MD') },
            { key: 'lg', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.LG') },
            { key: 'xl', value: this.translate.instant('GALLERY_EDITOR.GROUP_SIZE.XL') }
        ]

        this.GroupTitleAndDescription = [
            { key: 'grouped', value: this.translate.instant('GALLERY_EDITOR.GROUP.GROUPED') },
            { key: 'ungrouped', value: this.translate.instant('GALLERY_EDITOR.GROUP.UNGROUPED') },
        ]


        // When finish load raise block-editor-loaded.
        this.hostEvents.emit({action: 'block-editor-loaded'});
    }

    ngOnChanges(e: any): void {
        debugger;
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

        if(key === 'groupTitleAndDescription'){
            this.VerticalAlign[1].disabled = this.configuration.galleryConfig.groupTitleAndDescription === 'grouped';
            //check if the vertical align was center, if true set it automateclly to top
            if( this.configuration.galleryConfig.verticalAlign === 'center'){
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
        //a.id = 0;

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
}
