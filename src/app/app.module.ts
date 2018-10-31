import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from '../routes';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { ContentfulService } from './shared/contentful.service';

import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';

//TODO: Remove this after testing
import { TestComponent } from './test/test.component';
import { TestUploadComponent } from './test/test-upload/test-upload.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


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
    TestUploadComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(
      appRoutes, 
      {onSameUrlNavigation: 'reload'}
    ),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ 
    ContentfulService
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
