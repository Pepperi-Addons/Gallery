import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'gallary',
    templateUrl: './gallary.component.html',
    styleUrls: ['./gallary.component.css']
})
export class GallaryComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService) { }

    ngOnInit(): void {
        // When finish load raise block-loaded.
        this.hostEvents.emit({action: 'block-loaded'});
    }

    ngOnChanges(e: any): void {

    }
}
