import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { PepColorService } from "@pepperi-addons/ngx-lib";
import { Color } from "src/app/gallery.model";


@Injectable({
    providedIn: 'root',
})
export class GalleryService {
    

    constructor(private pepColorService: PepColorService) {};

    getRGBAcolor(colObj: Color, opac = null){
        let rgba = 'rgba(255,255,255,0';
            if(colObj){
                let color = colObj.color;
                let opacity = opac != null ? opac : parseInt(colObj.opacity);

                opacity = opacity > 0 ? opacity / 100 : 0;
                //check if allready rgba
                
                let hsl = this.pepColorService.hslString2hsl(color);
                let rgb = this.pepColorService.hsl2rgb(hsl);
                
                rgba = 'rgba('+ rgb.r + ','  + rgb.g + ',' + rgb.b + ',' + opacity + ')';
        }
        return rgba;
    }

}
