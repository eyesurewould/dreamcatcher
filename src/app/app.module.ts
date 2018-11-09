import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './shared/auth.guard';
import { UserService } from './shared/user.service';

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

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//TODO: Remove this after testing
import { TestComponent } from './test/test.component';
import { TestUploadComponent } from './test/test-upload/test-upload.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserResolver } from './shared/user.resolver';


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
    TestUploadComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
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
    AuthGuard,
    UserService,
    UserResolver
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
