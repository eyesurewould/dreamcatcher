import { Component, OnChanges, Input } from '@angular/core';
import { ClientService } from '../shared/client.service';
import { ClientFilterPipe } from '../shared/client-filter.pipe';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnChanges {

  @Input() filterBy?: string = 'all';
  visibleClients: any[] = [];

  constructor( private clientService: ClientService ) { 
    this.visibleClients = this.clientService.getClients();
  }

  ngOnChanges() {
    this.visibleClients = this.clientService.getClients();
  }
}
