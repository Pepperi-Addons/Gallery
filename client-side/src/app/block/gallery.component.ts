import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IGallery, IHostObject } from '../gallery.model';
import  { GalleryService } from '../../common/gallery.service';
import { PepLayoutService } from '@pepperi-addons/ngx-lib';
import { CLIENT_ACTION_ON_GALLERY_CARD_CLICKED, CLIENT_ACTION_ON_GALLERY_LOAD } from 'shared';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
    
    @Input()
    set hostObject(value: IHostObject) {
        this._configuration = value?.configuration;
        this._parameters = value?.parameters || {};
            //check if MaxColumns has been changed , and calc the cards width;
            //if(this.configuration && this.configuration.galleryConfig.Gallery.MaxColumns !== value?.configuration?.galleryConfig.Gallery.MaxColumns){
                   this.setCardWidth();
            //}
    }

    private _parameters: any;

    private _configuration: IGallery;
    get configuration(): IGallery {
        return this._configuration;
    }
    set configuration(conf: IGallery){
        this._configuration = conf;
    }

    public cardWidth: string;

    @ViewChild('galleryContainer', { static: true }) galleryContainer: ElementRef;
    
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService, 
                private galleryService: GalleryService, 
                private layoutService: PepLayoutService ) { }

    @HostListener('window:resize')
    public onWindowResize() {
        this.setCardWidth();
    }

    async ngOnInit(): Promise<void> {
        this.configuration = await this.onGalleryLoad();
        this.setCardWidth();
    }

    ngOnChanges(e: any): void {
   
    }
    
    setCardWidth(){
        const gap = this.configuration?.galleryConfig?.Gallery?.Gap || 'none';
        const maxColumns = this.configuration?.galleryConfig?.Gallery?.MaxColumns || 1;
        const spacing = gap == 'none' ? '0px' : '(var(--pep-spacing-'+ gap +') * '+ (maxColumns - 1) +')';

        this.cardWidth = 'calc((100%  - 2px - '+ spacing +' ) / '+ maxColumns +' )';
    }

    counter(i: number) {
        return new Array(i);
    }

    private getScriptParams(scriptData: any) {
        const res = {};
        
        if (scriptData) {
            // Go for all the script data and parse the params.
            Object.keys(scriptData).forEach(paramKey => {
                const scriptDataParam = scriptData[paramKey];
                
                // If the param source is dynamic get the value from the _parameters with the param value as key, else it's a simple param.
                if (scriptDataParam.Source === 'dynamic') {
                    res[paramKey] = this._parameters[scriptDataParam.Value] || '';
                } else { // if (scriptDataParam.Source === 'static')
                    res[paramKey] = scriptDataParam.Value;
                }
            });
        }

        return res;
    }

    onGalleryLoad(){
        try{
        
            const eventData = {
                detail: {
                    eventKey: CLIENT_ACTION_ON_GALLERY_LOAD,
                    eventData: { gallery: this.configuration },
                    completion: (res: any) => {
                            if (res) {
                                debugger;
                            } else {
                                // Show default error.
                                debugger;
                            }
                        }
                }
            };

            const customEvent = new CustomEvent('emit-event', eventData);
            window.dispatchEvent(customEvent);
        }
        catch(err){

        }

        return this.configuration;
    }
    onCardClicked(event) {

        
        // Parse the params if exist.
        // const params = this.getScriptParams(event.ScriptData);
        
        // this.hostEvents.emit({
        //     action: 'emit-event',
        //     eventKey: 'RunScript',
        //     eventData: {
        //         ScriptKey: event.ScriptKey,
        //         ScriptParams: params
        //     }
        // });

        try{
            const eventData = {
                detail: {
                    eventKey: CLIENT_ACTION_ON_GALLERY_CARD_CLICKED,
                    eventData: { script: event.ScriptData },
                    completion: (res: any) => {
                            if (res) {
                                debugger;
                            } else {
                                // Show default error.
                                debugger;
                            }
                        }
                }
            };

            const customEvent = new CustomEvent('emit-event', eventData);
            window.dispatchEvent(customEvent);
        }
        catch(err){

        }
    }
}
