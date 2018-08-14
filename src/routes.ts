import { Routes } from '@angular/router';
import { ProjectsComponent } from './app/Projects/Projects.component';
import { ProjectDetailComponent } from './app/project/project-detail.component';
import { ClientsComponent } from './app/clients/clients.component';
import { ClientDetailComponent } from './app/client/client-detail.component';
import { TestListComponent } from './app/test-list/test-list.component';

export const appRoutes: Routes = [
    { path: "projects", component: ProjectsComponent },
    { path: "project/:id", component: ProjectDetailComponent },
    { path: "projects/:style", component: ProjectsComponent },
    { path: "clients", component: ClientsComponent},
    { path: "client/:id", component: ClientDetailComponent },
    { path: "", redirectTo: "/gallery", pathMatch: 'full' },
    { path: 'test',  component: TestListComponent }
]