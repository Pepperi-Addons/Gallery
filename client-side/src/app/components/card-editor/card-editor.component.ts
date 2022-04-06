import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepStyleType, PepSizeType, PepColorService} from '@pepperi-addons/ngx-lib';
import { PepDialogActionButton, PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepButton } from '@pepperi-addons/ngx-lib/button';
import { IGallery } from 'src/app/gallery.model';

interface groupButtonArray {
    key: string; 
    value: string;
}

@Component({
    selector: 'card-editor',
    templateUrl: './card-editor.component.html',
    styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {

    @Input() configuration: IGallery;
    @Input() id: string;
    
    public title: string;
    
    @Input() isDraggable = false;
    @Input() showActions = true;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    @Output() removeClick: EventEmitter<any> = new EventEmitter();
    @Output() editClick: EventEmitter<any> = new EventEmitter();

    constructor(
        private translate: TranslateService,
        private pepColorService: PepColorService,
        private pepDialogService: PepDialogService
    ) { 

    }

    async ngOnInit(): Promise<void> {
        this.title = this.configuration?.cards[this.id].titleContent;
        //this.configuration.galleryConfig.editSlideIndex = -1;
        const desktopTitle = await this.translate.get('SLIDESHOW.HEIGHTUNITS_REM').toPromise();
        
    }

    onRemoveClick() {
        this.removeClick.emit({id: this.id});
    }

    onEditClick() {
        this.editClick.emit({id: this.id});
    }

    onCardFieldChange(key, event){
        const value = key.indexOf('image') > -1 && key.indexOf('src') > -1 ? event.fileStr :  event && event.source && event.source.key ? event.source.key : event && event.source && event.source.value ? event.source.value :  event;
  
        if(key.indexOf('.') > -1){
            let keyObj = key.split('.');
            this.configuration.cards[this.id][keyObj[0]][keyObj[1]] = value;
        }
        else{
            this.configuration.cards[this.id][key] = value;
        }

        this.updateHostObject();
    }

    private updateHostObject() {
        
        this.hostEvents.emit({
            action: 'set-configuration',
            configuration: this.configuration
        });
    }

    onSlideshowFieldChange(key, event){
        if(event && event.source && event.source.key){
            this.configuration.galleryConfig[key] = event.source.key;
        }
        else{
            this.configuration.galleryConfig[key] = event;
        }

        this.updateHostObject();
    }

    onHostEvents(event: any) {
        this.configuration.cards[this.id]['imageURL'] = event.url;
        this.updateHostObject();
    }

}
