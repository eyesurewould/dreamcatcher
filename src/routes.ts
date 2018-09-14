import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { ProjectsComponent } from './app/projects/projects.component';
import { ProjectDetailComponent } from './app/project/project-detail.component';
import { ClientsComponent } from './app/clients/clients.component';
import { ClientDetailComponent } from './app/client/client-detail.component';
import { ClientCreateComponent } from './app/client-create/client-create.component';

export const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "projects", component: ProjectsComponent },
    { 
        path: "project/:id", 
        component: ProjectDetailComponent,
        runGuardsAndResolvers: 'paramsChange'
    },
    { path: "projects/:style", component: ProjectsComponent },
    { path: "clients", component: ClientsComponent},
    { 
        path: "client/:id",
        component: ClientDetailComponent,
        runGuardsAndResolvers: 'paramsChange' 
    },
    { path: "client-create", component: ClientCreateComponent}
]