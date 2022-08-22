import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepStyleType, PepSizeType, PepColorService} from '@pepperi-addons/ngx-lib';
import { PepDialogActionButton, PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepButton } from '@pepperi-addons/ngx-lib/button';
import { IGallery } from 'src/app/gallery.model';
import { MatDialogRef } from '@angular/material/dialog';
import { PepAddonBlockLoaderService } from '@pepperi-addons/ngx-lib/remote-loader';

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

    private _pageParameters: any = {};
    @Input()
    set pageParameters(value: any) {
        this._pageParameters = value;
    }

    public title: string;
    
    @Input() isDraggable = false;
    @Input() showActions = true;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    @Output() removeClick: EventEmitter<any> = new EventEmitter();
    @Output() editClick: EventEmitter<any> = new EventEmitter();

    dialogRef: MatDialogRef<any>;
    
    constructor(
        private translate: TranslateService,
        private pepColorService: PepColorService,
        private pepDialogService: PepDialogService,
        private viewContainerRef: ViewContainerRef,
        private addonBlockLoaderService: PepAddonBlockLoaderService) {

    }

    async ngOnInit(): Promise<void> {
        //this.title = this.configuration?.cards[this.id].titleContent;
        //this.configuration.galleryConfig.editSlideIndex = -1;
        const desktopTitle = await this.translate.get('SLIDESHOW.HEIGHTUNITS_REM').toPromise();
        
    }

    getOrdinal(n) {
        var s = ["th ", "st ", "nd ", "rd "];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
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

    private updateHostObject(updatePageConfiguration = false) {
        this.hostEvents.emit({
            action: 'set-configuration',
            configuration: this.configuration,
            updatePageConfiguration: updatePageConfiguration
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
        if(event?.url) {
            this.configuration.cards[this.id].assetURL = "'"+ encodeURI(event.url) +"'";
            this.configuration.cards[this.id].asset = event.key;

            //this.updateHostObjectField(`slides[${this.id}].image.assetURL`, encodeURI(event.url));
            //this.updateHostObjectField(`slides[${this.id}].image.asset`, event.key);

            this.updateHostObject();
        }     
    }

    openScriptPickerDialog() {
        const script = this.configuration.cards[this.id]['script'] || {};
        const fields = {};
        Object.keys(this._pageParameters).forEach(paramKey => {
            fields[paramKey] = {
                Type: 'String'
            }
        });

        script['fields'] = fields;

        this.dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
            container: this.viewContainerRef,
            name: 'ScriptPicker',
            size: 'large',
            hostObject: script,
            hostEventsCallback: (event) => { 
                if (event.action === 'script-picked') {
                    this.configuration.cards[this.id]['script'] = event.data;
                    this.updateHostObject(true);
                    this.dialogRef.close();
                } else if (event.action === 'close') {
                    this.dialogRef.close();
                }
            }
        });
    }

}
