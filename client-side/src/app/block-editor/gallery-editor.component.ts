import { TranslateService } from '@ngx-translate/core';
import { Component, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGallery, IGalleryEditor, ICardEditor } from '../gallery.model';
import { PepButton } from '@pepperi-addons/ngx-lib/button';
import { PepColorService } from '@pepperi-addons/ngx-lib';
import { GalleryService } from 'src/common/gallery.service';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PageConfiguration, PageConfigurationParameterBase } from '@pepperi-addons/papi-sdk';

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
    public TextPositionStyling: Array<PepButton> = [];
    public GroupTitleAndDescription: Array<PepButton> = [];

    constructor(private translate: TranslateService, private pepColorService: PepColorService, private galleryService: GalleryService) { }

    async ngOnInit(): Promise<void> {
        if (!this.configuration) {
            this.loadDefaultConfiguration();
        }
        const desktopTitle = await this.translate.get('SLIDESHOW.HEIGHTUNITS_REM').toPromise();

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
            /*this.VerticalAlign[1].disabled = this.configuration?.galleryConfig?.groupTitleAndDescription === 'ungrouped' || 
                                             this.configuration?.galleryConfig?.textPosition === 'separated';
            //check if the vertical align was center, if true set it automateclly to top
            if( this.configuration?.galleryConfig?.verticalAlign === 'center'){
                this.configuration.galleryConfig.verticalAlign = 'start';
            }*/
            
            /*let isDisabled = this.configuration?.galleryConfig?.textPosition == 'overlaid' && 
            this.configuration?.galleryConfig?.groupTitleAndDescription === 'ungrouped' ? true : false;
            
            this.VerticalAlign[0].disabled = this.VerticalAlign[2].disabled = isDisabled;*/
               
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

    addNewCardClick() {
        let card = new ICardEditor();
        card.id = (this.configuration?.cards.length);

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
