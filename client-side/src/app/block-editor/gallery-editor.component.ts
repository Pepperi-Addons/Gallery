import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IGalleryEditor, ICardEditor } from '../gallery.model';
import { PepButton } from '@pepperi-addons/ngx-lib/button';
import { PepColorService } from '@pepperi-addons/ngx-lib';
import  { GalleryService } from '../../common/gallery.service';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray} from '@angular/cdk/drag-drop';
import { PageConfiguration } from '@pepperi-addons/papi-sdk';
import { createReadStream } from 'fs';

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
    set hostObject(value: any) {
        if (value && value.configuration && Object.keys(value.configuration).length) {
                this._configuration = value.configuration;
            if(value.configurationSource && Object.keys(value.configuration).length > 0){
                this.configurationSource = value.configurationSource;
            }
        } else {
            // TODO - NEED TO ADD DEFAULT CARD
            if(this.blockLoaded){
                this.loadDefaultConfiguration();
            }
        }

        this._pageParameters = value?.pageParameters || {};
        this._pageConfiguration = value?.pageConfiguration || this.defaultPageConfiguration;
    }


    public configurationSource: IGallery;

    private _configuration: IGallery;
    get configuration(): IGallery {
        return this._configuration;
    }

    // All the page parameters to set in page configuration when needed (for ScriptPicker addon usage).
    private _pageParameters: any;
    get pageParameters(): any {
        return this._pageParameters;
    }

    private defaultPageConfiguration: PageConfiguration = { "Parameters": [] };
    private _pageConfiguration: PageConfiguration = this.defaultPageConfiguration;
    
    public textColor: Array<PepButton> = [];
    public verticalAlign: Array<PepButton> = [];
    public TextPositionStyling: Array<PepButton> = [];
    public GroupTitleAndDescription: Array<PepButton> = [];

    constructor(private translate: TranslateService, private pepColorService: PepColorService, private galleryService: GalleryService) { }

    async ngOnInit(): Promise<void> {

         const desktopTitle = await this.translate.get('SLIDESHOW.HEIGHTUNITS_REM').toPromise();

        if (!this.configuration) {
            this.loadDefaultConfiguration();
        }
       
        this.textColor = [
            { key: 'system-primary', value:this.translate.instant('GALLERY_EDITOR.TEXT_COLOR.SYSTEM'), callback: (event: any) => this.onGalleryFieldChange('cardTextColor',event) },
            { key: 'invert', value:this.translate.instant('GALLERY_EDITOR.TEXT_COLOR.INVERT'), callback: (event: any) => this.onGalleryFieldChange('cardTextColor',event) }
        ]

        this.TextPositionStyling =  [
            { key: 'overlaid', value: this.translate.instant('GALLERY_EDITOR.TEXT_POSITION.OVERLAID'), callback: (event: any) => this.onGalleryFieldChange('textPosition',event) },
            { key: 'separated', value: this.translate.instant('GALLERY_EDITOR.TEXT_POSITION.SEPARATED'), callback: (event: any) => this.onGalleryFieldChange('textPosition',event) }
        ];

        this.GroupTitleAndDescription = [
            { key: 'grouped', value: this.translate.instant('GALLERY_EDITOR.GROUP.GROUPED'), callback: (event: any) => this.onGalleryFieldChange('groupTitleAndDescription',event) },
            { key: 'ungrouped', value: this.translate.instant('GALLERY_EDITOR.GROUP.UNGROUPED'), callback: (event: any) => this.onGalleryFieldChange('groupTitleAndDescription',event) }
        ]

        this.verticalAlign = [
            { key: 'start', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.TOP'), callback: (event: any) => this.onGalleryFieldChange('verticalAlign',event) },
            { key: 'middle', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.MIDDLE'), callback: (event: any) => this.onGalleryFieldChange('verticalAlign',event) },
            { key: 'end', value: this.translate.instant('GALLERY_EDITOR.VERTICAL_ALIGN.BOTTOM'), callback: (event: any) => this.onGalleryFieldChange('verticalAlign',event) }
        ]
        this.blockLoaded = true;
    }

    ngOnChanges(e: any): void {

    }
    
    public onHostObjectChange(event) {
        if(event && event.action) {
            if (event.action === 'set-configuration') {
                this._configuration = event.configuration;
                this.updateHostObject();

                // Update page configuration only if updatePageConfiguration
                if (event.updatePageConfiguration) {
                    this.updatePageConfigurationObject();
                }
            }
        }
    }

    private updateHostObject() {
        
        this.hostEvents.emit({
            action: 'set-configuration',
            configuration: this.configuration
        });
    }

    private updateHostObjectField(fieldKey: string, value: any) {
        this.hostEvents.emit({
            action: 'set-configuration-field',
            key: fieldKey, 
            value: value
        });
    }

    private getPageConfigurationParametersNames(): Array<string> {
        const parameters = new Set<string>();

        // Go for all cards scripts and add parameters to page configuration if Source is dynamic.
        for (let index = 0; index < this._configuration.cards.length; index++) {
            const card = this._configuration.cards[index];
            
            if (card?.script?.runScriptData) {
                Object.keys(card.script.runScriptData?.ScriptData).forEach(paramKey => {
                    const param = card.script.runScriptData.ScriptData[paramKey];
        
                    if (!parameters.has(param.Value) && param.Source === 'dynamic') {
                        parameters.add(param.Value);
                    }
                });
            }
        }

        // Return the parameters as array.
        return [...parameters];
    }

    private updatePageConfigurationObject() {
        const params = this.getPageConfigurationParametersNames();
        this._pageConfiguration = this.defaultPageConfiguration;

        // Add the parameter to page configuration.
        for (let paramIndex = 0; paramIndex < params.length; paramIndex++) {
            const param = params[paramIndex];
            
            this._pageConfiguration.Parameters.push({
                Key: param,
                Type: 'String',
                Consume: true,
                Produce: false
            });
        }

        this.hostEvents.emit({
            action: 'set-page-configuration',
            pageConfiguration: this._pageConfiguration
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
  
        this.updateHostObjectField(`galleryConfig.${key}`, value);

        if(key === 'groupTitleAndDescription' || key === 'textPosition'){
            if(this.configuration?.galleryConfig?.textPosition === 'separated'){
                if(this.configuration.galleryConfig.groupTitleAndDescription ==='ungrouped'){ //disable Vertical Position (all potions)
                    this.verticalAlign[0].disabled = true;
                    this.verticalAlign[1].disabled = true;
                    this.verticalAlign[2].disabled = true;
                }
                else{ // disable Vertical Position > Middle (Top & Bottom are still available
                    this.verticalAlign[0].disabled = false;
                    this.verticalAlign[1].disabled = true;
                    this.verticalAlign[2].disabled = false;
                }
            }
            else{ // Overlaid
                    this.verticalAlign[0].disabled = false;
                    this.verticalAlign[1].disabled = false;
                    this.verticalAlign[2].disabled = false;
            }      
        }
    }

    private loadDefaultConfiguration() {
        this._configuration = this.getDefaultHostObject();
        this.updateHostObject();
    }

    private getDefaultCards(numOfCards: number = 0): Array<ICardEditor> {
        let cards: Array<ICardEditor> = [];
       
        for(var i=0; i < numOfCards; i++){
            let card = new ICardEditor();
            card.id = i;
            
            

            card.title = this.getOrdinal(i+1) + this.translate.instant('GALLERY_EDITOR.ITEM');
            card.description = this.translate.instant('GALLERY_EDITOR.AWESOMETEXTFORTHE') + ' ' + this.getOrdinal(i+1) + this.translate.instant('GALLERY_EDITOR.ITEM');
            cards.push(card);
        }

        return cards;
    }

    getOrdinal(n) {
        var s = ["th ", "st ", "nd ", "rd "];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    private getDefaultHostObject(): IGallery {
        return { galleryConfig: new IGalleryEditor(), cards: this.getDefaultCards(2) };
    }

    addNewCardClick() {
        let card = new ICardEditor();
        card.id = (this.configuration?.cards.length);
        card.title = this.getOrdinal(card.id+1) + this.translate.instant('GALLERY_EDITOR.ITEM');
        card.description = this.translate.instant('GALLERY_EDITOR.AWESOMETEXTFORTHE') + ' ' + this.getOrdinal(card.id+1) + this.translate.instant('GALLERY_EDITOR.ITEM');
        
        this.configuration?.cards.push( card); 
        this.updateHostObject();  
    }

    onCardEditClick(event){
       
        if(this.configuration?.galleryConfig?.editSlideIndex === event.id){ //close the editor
            this.configuration.galleryConfig.editSlideIndex = -1;
        }
        else{ 
            this.currentCardindex = this.configuration.galleryConfig.editSlideIndex = parseInt(event.id);
        }
        this.updateHostObjectField(`galleryConfig.editSlideIndex`, this.configuration.galleryConfig.editSlideIndex);
        //this.cdr.detectChanges();
        //this.updateHostObject();
    }
    onCardRemoveClick(event){
        this.configuration?.cards.splice(event.id, 1);
        this.configuration?.cards.forEach(function(card, index, arr) {card.id = index; });
        this.updateHostObject();
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
