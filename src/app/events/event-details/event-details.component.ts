import { Component, OnInit } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params } from '@angular/router'
import { IEvent, ISession } from '../shared/index';

@Component({
    
    templateUrl: './event-details.component.html',
    styles: [
        `
        .comtainer {padding-left: 20px; padding-right: 20px;}
        .event-image {height: 100px;}
        a {cursor: pointer}
        `
    ]
})

export class EventDetailsComponent implements OnInit{

    event:IEvent;
    addMode: boolean;
    filterBy: string = 'all';
    sortBy: string = 'name';

    constructor (private eventService: EventService, private route: ActivatedRoute)
    {

    }

    ngOnInit(): void {
        
            this.route.params.forEach((params: Params) => {
                this.event = this.eventService.getEvent(+params['id']);
                this.addMode = false;
            });
    }

    addSession(){
        this.addMode = true;

    }

    saveNewSession(session: ISession){

        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSession()
    {
        this.addMode = false;
    }
}