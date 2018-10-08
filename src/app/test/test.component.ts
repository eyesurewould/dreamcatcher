import { Component, OnInit } from '@angular/core';
import { TestPromiseService } from '../shared/test-promise.service';
import { EntryCollection, Entry } from 'contentful';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  private client: Entry<any>;
  private client2: Entry<any>;
  private clients: EntryCollection<any>;
  
  constructor(private testService: TestPromiseService) {

    testService.getClient('2gGDWAOl9O6mMqQ0YyY0gk')
      .then((entry) => {
        console.log('constructor: entry ', entry);
        this.client = entry;
      })
      .catch((err) => {
        console.error;
      });

  }

  ngOnInit() {

  }

  moreDetails() {
    this.testService.getClient('2gGDWAOl9O6mMqQ0YyY0gk')
      .then((entry) => {
        console.log('moreDetails: entry ', entry);
        this.client2 = entry;
      })
      .catch((err) => {
        console.error;
      });

  }

  moreClients() {
    this.testService.getClients('')
      .then((entries) => {
        console.log('moreClients: entries ', entries);
        this.clients = entries;
      })
      .catch((err) => {
        console.error;
      });

  }

}
