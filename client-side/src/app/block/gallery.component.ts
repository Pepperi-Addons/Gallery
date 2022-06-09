import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IGallery, IHostObject } from '../gallery.model';
import  { GalleryService } from '../../common/gallery.service';
import { PepLayoutService } from '@pepperi-addons/ngx-lib';

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
            //if(this.configuration && this.configuration.galleryConfig.maxColumns !== value?.configuration?.galleryConfig.maxColumns){
                   this.setCardWidth();
            //}

           

    }

    private _parameters: any;

    private _configuration: IGallery;
    get configuration(): IGallery {
        return this._configuration;
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

    ngOnInit(): void {
        this.setCardWidth();
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {
   
    }

    setCardWidth (){
        const galleryWidth = this.galleryContainer.nativeElement.clientWidth;

        if(this.configuration?.galleryConfig?.maxColumns === 1){
                    this.cardWidth = '100%';
        }
        else{
            //this.cardWidth = ('calc(100% / ' + this.configuration?.galleryConfig?.maxColumns + ')' );
            this.cardWidth = ('calc(100% /' + this.configuration?.galleryConfig?.maxColumns + ')' );
        }
        // if(galleryWidth > 361 ){ //from 360 it's a mobile size / xs size
        //     this.cardWidth = ('calc((100%  - ' + (this.configuration?.galleryConfig?.gap) * (this.configuration?.galleryConfig?.maxColumns - 1) + 'rem) /' + this.configuration?.galleryConfig?.maxColumns + ')' );
        // }
        // else{ // FOR EXTRA SMALL SCREENS
        //     if(this.configuration?.galleryConfig?.maxColumns === 1){
        //         this.cardWidth = '100%';
        //     }
        //     else{
        //         this.cardWidth = ('calc((100%  - ' + (this.configuration?.galleryConfig?.gap) + 'rem) /' + 2 + ')' );
        //     }
        // }
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

    onCardClicked(event) {
        // Parse the params if exist.
        const params = this.getScriptParams(event.ScriptData);
        
        this.hostEvents.emit({
            action: 'emit-event',
            eventKey: 'RunScript',
            eventData: {
                ScriptKey: event.ScriptKey,
                ScriptParams: params
            }
        });
    }
}
