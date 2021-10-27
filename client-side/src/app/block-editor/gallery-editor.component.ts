import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IGalleryEditor, IHostObject, IImageEditor } from '../gallery.model';

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

    constructor(private translate: TranslateService) { }

    async ngOnInit(): Promise<void> {
        if (!this.configuration) {
            this.loadDefaultConfiguration();
        }
        const desktopTitle = await this.translate.get('SLIDESHOW.HEIGHTUNITS_REM').toPromise();

        // this.buttonColor = [
        //     { key: 'system-primary', value:this.translate.instant('SLIDE_EDITOR.BUTTON_COLOR.SYSTEM') },
        //     { key: 'invert', value:this.translate.instant('SLIDE_EDITOR.BUTTON_COLOR.INVERTED') },
        //     { key: 'user-primary', value:this.translate.instant('SLIDE_EDITOR.BUTTON_COLOR.USER') },
        // ]


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
        debugger;
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
