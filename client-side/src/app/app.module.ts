import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GalleryModule } from './block/gallery.module';

@NgModule({
    imports: [
        BrowserModule,
        GalleryModule
    ],
    declarations: [
        AppComponent

    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
