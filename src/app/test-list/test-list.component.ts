import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../shared/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  private products: Entry<any>[] = [];

  constructor( private contentfulService: ContentfulService ) { }

  ngOnInit() {
    this.contentfulService.getProducts()
    .then(products => this.products = products)

    console.log(this.products[0]);
    console.log(this.products[1]);
  }

}
