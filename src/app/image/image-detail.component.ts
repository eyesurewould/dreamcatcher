import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'image-detail',
    templateUrl: './image-detail.component.html',
    styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

    image: any;
    //any means "we expect some object but don't know the kind"

    constructor(private imageService: ImageService, private route: ActivatedRoute) {
        //Activated Route means "what did the user click on?"
    }

    ngOnInit() {
        this.image = this.imageService.getImage(
            //+ converts to a number (not sure why)
            //snapshot means "route when the page loaded"
            +this.route.snapshot.params['id']
        );
    }
}