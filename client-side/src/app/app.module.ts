import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GallaryModule } from './block/gallary.module';

@NgModule({
    imports: [
        BrowserModule,
        GallaryModule
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
