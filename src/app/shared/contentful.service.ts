import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() { 

  }
/*
  getClients(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.client
    }, query))
    .then(res => res.items);
  } */

  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.product
    }, query))
    .then(res => res.items);
  }

}


const CONFIG = {
  space: 'wl1z0pal05vy',
  accessToken: '0e3ec801b5af550c8a1257e8623b1c77ac9b3d8fcfc1b2b7494e3cb77878f92a',

  contentTypeIds: {
    product: '2PqfXUJwE8qSYKuM0U6w8M'
  }
}
/*
const CONFIG = {
  space: 'c8b8vlhklpan',
  accessToken: 'd9b824ae53d462d5e7b27e0f8502a380df22a9901905c305705be7bdda310e6f',

  contentTypeIds: {
    client: 'client',
    project: 'ink'
  }
}*/