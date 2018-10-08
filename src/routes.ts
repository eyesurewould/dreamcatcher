import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';

import { ClientsComponent } from './app/clients/clients.component';
import { ClientDetailComponent } from './app/client/client-detail.component';
import { ClientCreateComponent } from './app/client-create/client-create.component';
import { ProjectsComponent } from './app/projects/projects.component';
import { ProjectDetailComponent } from './app/project/project-detail.component';
import { ProjectCreateComponent } from './app/project-create/project-create.component';

import { TestComponent } from './app/test/test.component';

export const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "project/:id", 
        component: ProjectDetailComponent,
        runGuardsAndResolvers: 'paramsChange'},
    { path: "projects/:style", component: ProjectsComponent },
    { path: "clients", component: ClientsComponent},
    { path: "client/:id",
        component: ClientDetailComponent,
        runGuardsAndResolvers: 'paramsChange' },
    { path: "client-create", component: ClientCreateComponent},
    { path: "project-create/:id", 
        component: ProjectCreateComponent,
        runGuardsAndResolvers: 'paramsChange'},
    { path: "test", component: TestComponent}
]