import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ProjectService } from './shared/project.service';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { ProjectFilterPipe } from './shared/project-filter.pipe';

import { ClientService } from './shared/client.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { ClientFilterPipe } from './shared/client-filter.pipe';

import { ContentfulService } from './shared/contentful.service';

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    ProjectService, 
    ProjectFilterPipe, 
    ClientService, 
    ClientFilterPipe,
    ContentfulService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
