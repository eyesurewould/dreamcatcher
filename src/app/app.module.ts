import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ProjectService } from './shared/project.service';
import { ProjectsComponent } from './Projects/Projects.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { ProjectFilterPipe } from './shared/project-filter.pipe';

import { ClientService } from './shared/client.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { ClientFilterPipe } from './shared/client-filter.pipe';

import { ContentfulModule } from 'angular-contentful-service';

import { ContentfulProjectService } from './shared/contentful-project.service';
import { ContentfulClientService } from './shared/contentful-client.service';

import { appRoutes } from '../routes';
import { TestListComponent } from './test-list/test-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectFilterPipe,
    ClientsComponent,
    ClientDetailComponent,
    ClientFilterPipe,
    TestListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ContentfulModule.forRoot({
      space: 'c8b8vlhklpan', // your space ID
      accessToken: 'd9b824ae53d462d5e7b27e0f8502a380df22a9901905c305705be7bdda310e6f', // your access token
    }),
  ],
  providers: [ 
    ProjectService, 
    ProjectFilterPipe, 
    ClientService, 
    ClientFilterPipe,
    ContentfulProjectService,
    ContentfulClientService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
