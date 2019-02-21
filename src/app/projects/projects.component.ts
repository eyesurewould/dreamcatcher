import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntryCollection } from 'contentful';
import { ContentfulService } from '../contentful/contentful.service';
import { projectOrder } from '../project/project';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnChanges, OnInit {

    public limit = 10;
    public skip = 0;
    public total;
    public nowShowing = '';
    public query = '';
    public errorMessage = '';

    public projects: EntryCollection<any>;

    constructor(private cs: ContentfulService, private route: ActivatedRoute, private router: Router) {
        route.params.subscribe(params => {
            if (params['query'] != undefined) {
                this.query = params['query'];
            }
        });

    }

    load() {
        this.getPage();

    }

    nextPage() {
        this.skip = this.skip + this.limit;
        this.getPage();

    }

    prevPage() {
        this.skip = this.skip - this.limit;
        this.getPage();

    }

    ngOnInit() {
        this.load();

    }

    ngOnChanges() {
        this.load();

    }

    /** 
   * Pagination method - get a subset of records 
   * from Contentful via the ContentfulService
   */
    getPage() {
        this.cs.getProjects(this.query, projectOrder.updated, this.limit, this.skip)
            .then((entries) => {
                this.projects = entries;
                this.total = entries.total;

                //everything else here is just prepping the message about
                //the search results and total number of results
                if (entries.total == 0) {
                    this.nowShowing = 'no matches found'
                } else {
                    let currentPageMax = this.skip + this.limit;
                    this.nowShowing = 'showing ' + (this.skip + 1) + '-' +
                        (currentPageMax < entries.total ? currentPageMax : entries.total) +
                        ' of ' + entries.total;
                }
                if (this.query != '') {
                    this.nowShowing += ' for \'' + this.query + '\'';
                }

            })
            .catch((err) => {
                this.errorMessage = 'A problem occurred while retrieving data. Please retry later.'
                console.error;
            });

    }

    /**
    * We capture key strokes in the input field. Enter triggers the search
    * @param event 
    */
    onSearchKeydown(event) {
        if (event.key === "Enter") {
            this.skip = 0;
            this.query = event.srcElement.value;
            this.load();
            this.router.navigate(['/projects', this.query]);
        }
    }

}