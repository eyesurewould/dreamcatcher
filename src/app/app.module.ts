import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client/client-detail.component';

import { ContentfulModule } from 'angular-contentful-service';
import { ContentfulService } from './shared/contentful.service';

import { appRoutes } from '../routes';
import { ClientCreateComponent } from './client-create/client-create.component';
import { HomeComponent } from './home/home.component';
import { ProjectCreateComponent } from './project-create/project-create.component';

import { TestComponent } from './test/test.component';
import { TestPromiseService } from './shared/test-promise.service';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ClientsComponent,
    ClientDetailComponent,
    ClientCreateComponent,
    HomeComponent,
    ProjectCreateComponent,
    TestComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ContentfulModule.forRoot({
      space: 'c8b8vlhklpan', // your space ID
      accessToken: 'd9b824ae53d462d5e7b27e0f8502a380df22a9901905c305705be7bdda310e6f', // your access token
    }),
    RouterModule.forRoot(
      appRoutes, 
      {onSameUrlNavigation: 'reload'}
    )
  ],
  providers: [ 
    ContentfulService,
    TestPromiseService
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
