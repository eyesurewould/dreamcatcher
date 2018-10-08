import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as contentful from 'contentful';
import * as contentfulMgmt from 'contentful-management';

import { clientOrder } from '../client/client';

@Injectable({
  providedIn: 'root'
})
export class TestPromiseService {

  private contentfulClient: contentfulMgmt.ClientAPI;
  //private contentfulMgmtClient: contentfulMgmt.ClientAPI;

  constructor() {
    this.contentfulClient = contentful.createClient({
      // This is the access token for reading content in this space
      accessToken: environment.contentful.accessToken,
      space: environment.contentful.space
    })

    //this.contentfulMgmtClient = contentfulMgmt.createClient({
      // This is the personal token for managing content in any space owned by the account
    //  accessToken: environment.contentful.personalToken
    //})
  }

  public getClient(id: string) {
    return this.contentfulClient.getEntry(id)
      .then((response) => {
        console.log('getClient(): ' + response);
        return response;
      })
      .catch((err) => {
        console.error;
      });
  }

  public getClients(query?: string, order?: clientOrder, limit?: number, skip?: number) {

    var params = {
      content_type: 'client',
      include: 3
    };

    if (order != undefined) {
      if (order == 'createdAt') {
        params['order'] = '-sys.createdAt';
      } else if (order == 'updatedAt') {
        params['order'] = '-sys.updatedAt';
      } else {
        params['order'] = 'fields.' + order;
      }
    }

    if (limit != undefined) {
      params['limit'] = limit;
    }
    if (skip != undefined) {
      params['skip'] = skip;
    }

    return this.contentfulClient.getEntries(params)
      .then((response) => {
        console.log('getClients: clients ', response);
        return response;
      })
      .catch((err) => {
        console.error;
      });

    /*WORKS!!
    return this.contentfulClient.getEntry(id)
      .then((response) => {
        console.log('getClient(): ' + response);
        return response;
      })
      .catch((err) => {
        console.error;
      });
      */

  }

}
