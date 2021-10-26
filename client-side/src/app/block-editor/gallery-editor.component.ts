import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'gallery-editor',
    templateUrl: './gallery-editor.component.html',
    styleUrls: ['./gallery-editor.component.css']
})
export class GalleryEditorComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService) { }

    ngOnInit(): void {
        // When finish load raise block-editor-loaded.
        this.hostEvents.emit({action: 'block-editor-loaded'});
    }

    ngOnChanges(e: any): void {
        
    }
}
