import { Component, OnChanges, Input } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { ImageFilterPipe } from '../shared/image-filter.pipe';

@Component ({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnChanges {
    title = 'Recent Photos';
    @Input() filterBy?: string = 'all';
    visibleImages: any[] = [];

    constructor (private imageService: ImageService ) {
        this.visibleImages = this.imageService.getImages();
    }

    ngOnChanges() {
        this.visibleImages = this.imageService.getImages();
    }
}