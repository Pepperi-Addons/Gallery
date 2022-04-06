import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import { AddonBlockLoaderComponent } from '@pepperi-addons/ngx-composite-lib/addon-block-loader';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
    selector: 'assets-button',
    templateUrl: './assets-button.component.html',
    styleUrls: ['./assets-button.component.scss']
})

export class AssetsButtonComponent implements OnInit {
   
    @ViewChild('assetsBtnCont', { static: false }) assetsBtnCont: ElementRef;
    @ViewChild(AddonBlockLoaderComponent) addonBlockLoader: AddonBlockLoaderComponent;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    
    imageURL: string = '';
    assetsHostObject = {
        selectionType: 'single'
    }

    constructor(public translate: TranslateService, private renderer: Renderer2, private sanitizer: DomSanitizer) {

    }

    ngOnChanges(changes) { 
        if (changes) {
        }
    }

    ngOnInit() {
        //this.carIdndex = this.card.id;
    }

    onOpenAssetsDialog() {
        this.addonBlockLoader.openDialog('', false, 'full-screen', this.assetsHostObject);
    }

    onHostEvents(event: any) {
       
        this.hostEvents.emit(event);

        //const style = `url(${event.url})`;
        // sanitize the style expression
        this.imageURL = event.url;// this.sanitizer.bypassSecurityTrustStyle(event.url) as string;
        //this.renderer.setStyle(this.assetsBtnCont.nativeElement,'background-image', this.sanitizer.bypassSecurityTrustStyle(style));
        this.addonBlockLoader.closeDialog(null);
    }
}
