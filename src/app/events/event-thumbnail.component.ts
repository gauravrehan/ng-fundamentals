import { Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'event-thumbnail',
    templateUrl: './event-thumbnail.component.html',
    styles: [`
    .green {color: #003300 !important;}
    .bold {font-weight: bold;}
    .thumbnail {min-height: 210px;}
    .pad-left {margin-left: 10px;}
    .well div {color: #bbb;}
    `]
})
export class EventThumbnailComponent{
    @Input() event: any

    getStartTimeClass(){
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        return {green: isEarlyStart, bold: isEarlyStart};

        /*ngClass can work with an object like above or it can also work with
        a) string with space seperated classes

        if(isEarlyStart)
        return 'green gold'
        else return '';

        b) with an array of classes
        
        if(isEarlyStart)
        return ['green', 'bold']
        else retrun []
        */


    }

    getStartTimeStyles(): any {
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        return {'color': isEarlyStart ? '#003300' : '#bbb', 'font-weight': isEarlyStart ? 'bold' : 'normal'};
      
    }
   
}