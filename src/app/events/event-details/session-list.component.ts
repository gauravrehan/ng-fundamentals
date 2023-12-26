import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'
import { VoterService } from './voter.service'
import { AuthService } from '../../user/auth.service'


@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges{
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[] = [];

    constructor(private voterService: VoterService, private authService: AuthService)
    {

    }

    ngOnChanges(){
        
        if(this.sessions){
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(this.sortByNameAsc) : this.visibleSessions.sort(this.sortByVotesDesc);
        }
    }

    toggleVote(session : ISession){
        if(this.userHasVoted(session)) {
        this.voterService.deleteVoter(session, this.authService.currentUser.userName );
        }
        else{
            this.voterService.addVoter(session, this.authService.currentUser.userName);
        }
        if(this.sortBy === 'votees')
        {
            this.visibleSessions.sort(this.sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
    }

    filterSessions(filter){
        if(filter === 'all'){
            //create a cloned copy of the array
            this.visibleSessions = this.sessions.slice(0);
        }
        else
         {
             this.visibleSessions = this.sessions.filter(session => {return session.level.toLocaleLowerCase() === filter});
         }
    }

    sortByNameAsc(s1: ISession, s2: ISession){
        if(s1.name > s2.name) return 1
        else if(s1.name === s2.name) return 0
        else return -1
        }
        
        sortByVotesDesc(s1: ISession, s2: ISession){
            return s2.voters.length - s1.voters.length
        }
}

