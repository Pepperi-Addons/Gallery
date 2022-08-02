import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
// import { GalleryModule } from './block/gallery.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { PepAddonService } from '@pepperi-addons/ngx-lib';
import { config } from './addon.config';
import { GalleryComponent, GalleryModule } from './block';
import { GalleryEditorComponent, GalleryEditorModule } from './block-editor';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        GalleryModule,
        GalleryEditorModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (addonService: PepAddonService) => 
                    PepAddonService.createMultiTranslateLoader(config.AddonUUID, addonService, ['ngx-lib', 'ngx-composite-lib']),
                deps: [PepAddonService]
            }
        }),
        RouterModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [
        // AppComponent
    ]
})
export class AppModule implements DoBootstrap {
    constructor(
        private injector: Injector,
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }

    ngDoBootstrap() {
        // const ce = createCustomElement(AppComponent, {injector: this.injector});
        // customElements.define('gallery', ce);
    
        customElements.define('gallery-element', createCustomElement(GalleryComponent, {injector: this.injector}));
        customElements.define('gallery-editor-element', createCustomElement(GalleryEditorComponent, {injector: this.injector}));
    }
}
