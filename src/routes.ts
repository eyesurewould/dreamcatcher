import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';

import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { AuthGuard } from './app/shared/auth.guard';
import { UserResolver } from './app/shared/user.resolver';

import { ClientsComponent } from './app/clients/clients.component';
import { ClientDetailComponent } from './app/client/client-detail.component';
import { ClientCreateComponent } from './app/client-create/client-create.component';
import { ProjectsComponent } from './app/projects/projects.component';
import { ProjectDetailComponent } from './app/project/project-detail.component';
import { ProjectCreateComponent } from './app/project-create/project-create.component';

import { TestComponent } from './app/test/test.component';
import { TestUploadComponent } from './app/test/test-upload/test-upload.component';

export const appRoutes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
    { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
    { path: "home", component: HomeComponent, resolve: { data: UserResolver } },
    { path: "projects", component: ProjectsComponent, resolve: { data: UserResolver } },
    { path: "projects/:query", 
        component: ProjectsComponent,
        runGuardsAndResolvers: 'paramsChange'},    
    { path: "project/:id", 
        component: ProjectDetailComponent,
        runGuardsAndResolvers: 'paramsChange'},
    { path: "clients", component: ClientsComponent},
    { path: "clients/:query", 
        component: ClientsComponent,
        runGuardsAndResolvers: 'paramsChange'},
    { path: "client/:id",
        component: ClientDetailComponent,
        runGuardsAndResolvers: 'paramsChange' },
    { path: "client-create", component: ClientCreateComponent},
    { path: "project-create/:id", 
        component: ProjectCreateComponent,
        runGuardsAndResolvers: 'paramsChange'},
    { path: "test", component: TestComponent},
    { path: "test-upload", component: TestUploadComponent}
]