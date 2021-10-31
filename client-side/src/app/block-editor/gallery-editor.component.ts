import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IGalleryEditor, IHostObject, IImageEditor } from '../gallery.model';
import { PepButton } from '@pepperi-addons/ngx-lib/button';

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

    constructor(private translate: TranslateService) { }

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
            { key: 'center', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.MIDDLE') },
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
            { key: 'ungrouped', value: this.translate.instant('GALLERY_EDITOR.GROUPUNGROUPED') },
        ]


        // When finish load raise block-editor-loaded.
        this.hostEvents.emit({action: 'block-editor-loaded'});
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
    }

    private loadDefaultConfiguration() {
        this._configuration = this.getDefaultHostObject();
        //this.updateHostObject();
    }

    private getDefaultImage(): IImageEditor {
        let image = new IImageEditor();
        //a.id = 0;

        return image;
    }

    private getDefaultHostObject(): IGallery {
        return { galleryConfig: new IGalleryEditor(), images: [this.getDefaultImage()] };
    }
}
