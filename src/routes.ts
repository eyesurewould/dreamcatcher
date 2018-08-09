import { Routes } from '@angular/router';
import { GalleryComponent } from './app/gallery/gallery.component';
import { ImageDetailComponent } from './app/image/image-detail.component';
import { ClientsComponent } from './app/clients/clients.component';
import { ClientDetailComponent } from './app/client/client-detail.component';

export const appRoutes: Routes = [
    { path: "gallery", component: GalleryComponent },
    { path: "image/:id", component: ImageDetailComponent },
    { path: "clients", component: ClientsComponent},
    { path: "client/:id", component: ClientDetailComponent },
    { path: "", redirectTo: "/gallery", pathMatch: 'full' }
]