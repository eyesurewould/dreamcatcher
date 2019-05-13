import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';

import { ArtistsComponent } from './app/artists/artists.component';
import { ArtistDetailComponent } from './app/artist/artist-detail.component';
import { ArtistCreateComponent } from './app/artist-create/artist-create.component';

import { ClientsComponent } from './app/clients/clients.component';
import { ClientDetailComponent } from './app/client/client-detail.component';
import { ClientCreateComponent } from './app/client-create/client-create.component';

import { ProjectsComponent } from './app/projects/projects.component';
import { ProjectDetailComponent } from './app/project/project-detail.component';
import { ProjectCreateComponent } from './app/project-create/project-create.component';

import { AuthGuardService } from './app/auth/auth-guard.service';

export const appRoutes: Routes = [
    { path: "login", 
        component: LoginComponent },
    { path: "register", 
        component: RegisterComponent },
    { path: "", 
        redirectTo: "home", 
        pathMatch: 'full' },
    { path: "home", 
        component: HomeComponent,
        canActivate: [AuthGuardService] },

    { path: "artists", 
        component: ArtistsComponent,
        canActivate: [AuthGuardService]},
    { path: "artists/:query", 
        component: ArtistsComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'paramsChange'},
    { path: "artist/:id",
        component: ArtistDetailComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'paramsChange' },
    { path: "artist-create", 
        component: ArtistCreateComponent,
        canActivate: [AuthGuardService]},

    { path: "clients", 
        component: ClientsComponent,
        canActivate: [AuthGuardService]},
    { path: "clients/:query", 
        component: ClientsComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'paramsChange'},
    { path: "client/:id",
        component: ClientDetailComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'paramsChange' },
    { path: "client-create", 
        component: ClientCreateComponent,
        canActivate: [AuthGuardService]},

    { path: "projects", 
        component: ProjectsComponent,
        canActivate: [AuthGuardService] },
    { path: "projects/:query", 
        component: ProjectsComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'paramsChange'},    
    { path: "project/:id", 
        component: ProjectDetailComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'paramsChange'},
    { path: "project-create/:id", 
        component: ProjectCreateComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'paramsChange'},
        
]