import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
import { ContentfulService } from './shared/contentful.service';

import { AppComponent } from './app.component';
import { appRoutes } from '../routes';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailComponent } from './artist/artist-detail.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ArtistsComponent,
    ArtistDetailComponent,
    ArtistCreateComponent,
    ClientsComponent,
    ClientDetailComponent,
    ClientCreateComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectCreateComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
   AlertModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { onSameUrlNavigation: 'reload' }
    ),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ContentfulService,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
