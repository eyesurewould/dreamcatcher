import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../shared/client.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../shared/project.service';


@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

    client: any;

    visibleProjects: any;

    constructor( private clientService: ClientService, private projectService: ProjectService, private route: ActivatedRoute ) {
        //Activated Route means "what did the user click on?"
    }

    ngOnInit() {
        
        this.client = this.clientService.getClient(
            //snapshot means "route when the page loaded"
            this.route.snapshot.params['id']
        );

        this.visibleProjects = this.projectService.getClientProjects(
            this.route.snapshot.params['id']
        );

    }

}
