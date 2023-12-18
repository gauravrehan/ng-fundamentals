import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  CreateSessionComponent,
  SessionListComponent,
  EventService,
  EventRouteActivator,
  EventListResolver,
  DurationPipe
} from './events/index'

import  { CollapsibleWellComponent } from './common/collapsible-well.component'

import { EventsAppComponent } from './events-app.component';
import { NavbarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { appRoutes } from './routes';
import { Error404Component } from './error/404.component';
import { AuthService } from './user/auth.service';


let toastr:Toastr = window['toastr'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    NavbarComponent,
    Error404Component,
    DurationPipe
  ],
  providers: [
    EventService,
    EventRouteActivator,
    EventListResolver,
    AuthService,
    //below is the long hand of specifying the providers for say AuthService. Notice useClass
    //{provide: AuthService, useClass: AuthService}

    //below is the way to correctly wrap a globally imported varaible like toastr using Authentication_Token. Notice useValue.
    {provide : TOASTR_TOKEN, useValue: toastr },

    //third way of using dependency injection is making use of useExisting (quite seldom used):
    //{provide: MinimalLogger, useExisting: Logger}

    //Forth way of using dependency injection is to make use of useFactory (must complex)
    //{provide: Logger, useFactory: Logger}

    
    {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}
    
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
  if(component.isDirty)
  return window.confirm('You have not saved this event, do you really want to cancel?')
  return true;
}