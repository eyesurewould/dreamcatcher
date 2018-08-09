import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ImageService } from './shared/image.service';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image/image-detail.component';
import { ImageFilterPipe } from './shared/image-filter.pipe';

import { ClientService } from './shared/client.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { ClientFilterPipe } from './shared/client-filter.pipe';

import { appRoutes } from '../routes';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    ImageDetailComponent,
    ImageFilterPipe,
    ClientsComponent,
    ClientDetailComponent,
    ClientFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ ImageService, ImageFilterPipe, ClientService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
