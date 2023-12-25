import { Component } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { EventService, ISession } from "../events/shared/index";

@Component({
    selector: "nav-bar",
    templateUrl: "./navbar.component.html",
    styles: [`

    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active { color: #F97924;}
    `]
})
export class NavbarComponent{

    searchTerm: string = "";
    foundSessions: any[];

    constructor(public authService: AuthService, private eventService: EventService){

    }

    searchSessions(searchterm: string){
        this.eventService.searchSessions(searchterm).subscribe(sessions => {
            this.foundSessions = sessions;
            console.log(this.foundSessions);
        });
    }

}