import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulAssetService {
  private client = createClient({
    space: environment.contentful.space,
    accessToken: environment.contentful.accessToken
  });

  constructor() { }

  getAssets(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: environment.contentful.contentTypeIds.project
    }, query))
    .then(res => res.items);
  }

}
