import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEditorComponent } from './card-editor.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { PepSliderModule} from '@pepperi-addons/ngx-lib/slider';
import { PepFileService, PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { MatDialogModule } from '@angular/material/dialog';
import { PepColorModule } from '@pepperi-addons/ngx-lib/color';
import { PepGroupButtonsModule } from '@pepperi-addons/ngx-lib/group-buttons';
import { PepImageModule } from '@pepperi-addons/ngx-lib/image';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { AssetsButtonModule } from '../assets-button/assets-button.module';
import { config } from '../../addon.config';

@NgModule({
    declarations: [CardEditorComponent],
    imports: [
        CommonModule,
        DragDropModule,
        PepButtonModule,
        PepMenuModule,
        PepTextboxModule,
        PepCheckboxModule,
        PepSliderModule,
        PepNgxLibModule,
        PepSelectModule,
        MatDialogModule,
        //PepPageLayoutModule,
        PepGroupButtonsModule,
        PepColorModule,
        PepImageModule,
        PepTextareaModule,
        AssetsButtonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (addonService: PepAddonService) => 
                    PepAddonService.createMultiTranslateLoader(config.AddonUUID, addonService, ['ngx-lib', 'ngx-composite-lib']),
                deps: [PepAddonService]
            }, isolate: false
        }),
    ],
    exports: [CardEditorComponent]
})
export class CardEditorModule { }
