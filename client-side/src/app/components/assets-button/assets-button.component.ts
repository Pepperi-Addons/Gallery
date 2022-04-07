import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from "@angular/core";
import { AddonBlockLoaderService } from '@pepperi-addons/ngx-composite-lib/addon-block-loader';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'assets-button',
    templateUrl: './assets-button.component.html',
    styleUrls: ['./assets-button.component.scss']
})

export class AssetsButtonComponent implements OnInit {
   
    @ViewChild('assetsBtnCont', { static: false }) assetsBtnCont: ElementRef;
    // @ViewChild('addonLoaderContainer', { read: ViewContainerRef }) addonLoaderContainer: ViewContainerRef;
    
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    
    @Input() imageURL: string = '';

    dialogRef: MatDialogRef<any>;

    assetsHostObject = {
        selectionType: 'single',
        allowedAssetsTypes: 'images',
        inDialog: true
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        public translate: TranslateService,
        private addonBlockLoaderService: AddonBlockLoaderService) {

    }

    ngOnChanges(changes) { 
        if (changes) {
        }
    }

    ngOnInit() {
        //this.carIdndex = this.card.id;
    }

    onOpenAssetsDialog() {
        this.dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
            container: this.viewContainerRef,
            blockType: 'assets-manager',
            hostObject: this.assetsHostObject,
            hostEventsCallback: this.onHostEvents
        });
    }

    onHostEvents(event: any) {
        this.hostEvents.emit(event);

        if (this.dialogRef) {
            this.dialogRef.close(null);
        }
    }
}
