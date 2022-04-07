import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { AddonBlockLoaderComponent } from '@pepperi-addons/ngx-composite-lib/addon-block-loader';

@Component({
    selector: 'assets-button',
    templateUrl: './assets-button.component.html',
    styleUrls: ['./assets-button.component.scss']
})

export class AssetsButtonComponent implements OnInit {
   
    @ViewChild('assetsBtnCont', { static: false }) assetsBtnCont: ElementRef;
    @ViewChild(AddonBlockLoaderComponent) addonBlockLoader: AddonBlockLoaderComponent;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    
    @Input() imageURL: string = '';

    assetsHostObject = {
        selectionType: 'single',
        allowedAssetsTypes: 'images'
    }

    constructor(public translate: TranslateService) {

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
        this.addonBlockLoader.closeDialog(null);
    }
}
