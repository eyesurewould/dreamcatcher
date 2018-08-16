import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client/client-detail.component';

import { ContentfulModule } from 'angular-contentful-service';

import { appRoutes } from '../routes';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ClientsComponent,
    ClientDetailComponent
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
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
