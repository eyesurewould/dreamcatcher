import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

import { Client, clientOrder } from '../client/client';
import { Project, projectOrder } from '../project/project';
import { isDefined } from '@angular/compiler/src/util';

import * as contentful from 'contentful';
import * as contentfulMgmt from 'contentful-management';


@Injectable({
  providedIn: 'root'
})

export class ContentfulService {

  private contentfulClient: contentfulMgmt.ClientAPI;
  private contentfulMgmtClient: contentfulMgmt.ClientAPI;

  private client = new Subject<contentful.Entry<{}>>();
  private clients = new Subject<contentful.EntryCollection<{}>>();

  private project = new Subject<contentful.Entry<{}>>();
  private projects = new Subject<contentful.EntryCollection<{}>>();
  private projectsForClient = new Subject<contentful.EntryCollection<{}>>();


  constructor() {

    this.contentfulClient = contentful.createClient({
      // This is the access token for reading content in this space
      accessToken: environment.contentful.accessToken,
      space: environment.contentful.space
    })

    this.contentfulMgmtClient = contentfulMgmt.createClient({
      // This is the personal token for managing content in any space owned by the account
      accessToken: environment.contentful.personalToken
    })

  }

  /**
   * Use the Content Management SDK to create a new entry of content type "client"
   * 
   * @param client
   */
  public createClient(client: Client): Promise<{}> {

    let promise = new Promise((resolve, reject) => {

      console.log('createClient: start ', this.client);
      this.contentfulMgmtClient.getSpace(environment.contentful.space)
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.createEntry('client', {
          fields: {
            name: {
              'en-US': client.name
            },
            email: {
              'en-US': client.email
            },
            phone: {
              'en-US': client.phone
            }
          }
        }))
        .then((entry) => entry.publish())
        .then((entry) => {
          //this.client.next((entry));
          console.log('createClient: Entry ', entry.sys.id, 'created');
          resolve(entry);
        })
        .catch(console.error)
    });

    return promise;

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param id A Contentful Entry ID for an entry of content_type 'client'
   */
  public getClient(id: string): Observable<contentful.Entry<{}>> {

    this.contentfulClient.getEntry(id)
      .then((response) => {
        //console.log('getClient: ', response);
        this.client.next((response));
        return this.client.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.client.asObservable(); //compiler complains if I don't have this

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param query A searcy string
   * @param order <optional> The sort order of results (an Enum in /client/client.ts)
   * @param limit <optional> The maximum number of results
   * @param skip <optional> The number of found entries to skip (for pagination)
   */
  public getClients(query?: string, order?: clientOrder, limit?: number, skip?: number): Observable<contentful.EntryCollection<{}>> {

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

    this.contentfulClient.getEntries(params)
      .then((response) => {
        //console.log('getClients: ', response);
        this.clients.next((response));
        return this.clients.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.clients.asObservable(); //compiler complains if I don't have this

  }

  /**
   * Update a client Entry
   * 
   * @param id A Contentful Entry id for an existing entry to update
   * @param client An object with details to update the entry
   */
  public saveClient(id: string, client: Client) {

    this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => {
        console.log('saveClient: set entry values', entry.fields, ' with client values ', client);

        entry.fields.name = { 'en-US': client.name };

        if (client.email != '') {
          entry.fields.email = { 'en-US': client.email };
        }
        if (client.phone != '') {
          entry.fields.phone = { 'en-US': client.phone };
        }

        console.log('saveClient: update entry values', entry.fields);
        return entry.update();
      })
      .then((entry) => entry.publish())
      .then((entry) => console.log('saveClient: Entry ', entry.sys.id, 'updated'))
      .catch(console.error)

  }

  /**
   * Use the Contentful SDK to remove a record
   * 
   * @param id A Contentful entry id.
   */
  public deleteClient(id: string) {
    console.log('deleteClient: id ', id);
  }


  /**
   * Use the Content Management SDK to create a new entry of content type "ink"
   * 
   * @param project
   */
  public createProject(project: Project): Promise<{}> {

    let promise = new Promise((resolve, reject) => {

      this.contentfulMgmtClient.getSpace(environment.contentful.space)
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.createEntry('ink', {
          fields: {
            title: {
              'en-US': project.title
            },
            status: {
              'en-US': [project.status]
            },
            style: {
              'en-US': [project.style]
            },
            description: {
              'en-US': project.description
            },
            size: {
              'en-US': project.size
            },
            location: {
              'en-US': project.location
            },
            timeEstimate: {
              'en-US': project.timeEstimate
            },
            clientRef: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: project.clientRef
                }
              }
            }
          }
        }))
        .then((entry) => entry.publish())
        .then((entry) => {
          console.log('createProject: Entry ', entry.sys.id, 'created');
          resolve(entry);
        })
        .catch(console.error)

    });

    return promise;

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param id A Contentful Entry ID for an entry of content_type 'ink' 
   */
  public getProject(id: string): Observable<contentful.Entry<{}>> {

    this.contentfulClient.getEntry(id)
      .then((response) => {
        //console.log('getProject: ', response);
        this.project.next((response));
        return this.project.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.project.asObservable(); //compiler complains if I don't have this

  }


  /**
   * Use the Content SDK to retrieve records
   * Supports a full text query, if a value is provided
   * 
   * @param query A search string
   * @param order <optional> The sort order of results (an Enum in /project/project.ts)
   * @param limit <optional> The maximum number of results
   * @param skip <optional> The number of found entries to skip (for pagination)
   */
  public getProjects(query?: string, order?: projectOrder, limit?: number, skip?: number): Observable<contentful.EntryCollection<{}>> {

    var params = {
      content_type: 'ink',
      include: 3
    };

    if (query != undefined) {
      if (query != '') {
        params['query'] = query;
      }
    }

    if (order != undefined) {
      if (order == 'createdAt') {
        params['order'] = 'sys.createdAt';
      } else if (order == 'updatedAt') {
        params['order'] = 'sys.updatedAt';
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

    console.log('getProjects: params ', params);

    this.contentfulClient.getEntries(params)
      .then((response) => {
        this.projects.next((response));
        return this.projects.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.projects.asObservable(); //compiler complains if I don't have this

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param clientId A Contentful Entry ID for an entry of content_type 'client'
   */
  public getProjectsForClient(clientId: string): Observable<contentful.EntryCollection<{}>> {

    const params = { content_type: 'ink', include: 3, 'fields.clientRef.sys.id': clientId };

    this.contentfulClient.getEntries(params)
      .then((response) => {
        //console.log('getProjectsForClient: ', response);
        this.projectsForClient.next((response));
        return this.projectsForClient.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.projectsForClient.asObservable();

  }


  /**
 * Update a project (ink) Entry
 * 
 * @param id A Contentful Entry id for an existing entry to update
 * @param project An object with details to update the entry
 */
  public saveProject(id: string, project: Project) {

    this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => {
        entry.fields.title['en-US'] = project.title;
        entry.fields.style['en-US'] = project.style;
        entry.fields.status['en-US'] = project.status;
        entry.fields.description['en-US'] = project.description;
        entry.fields.size['en-US'] = project.size;
        entry.fields.location['en-US'] = project.location;
        entry.fields.timeEstimate['en-US'] = project.timeEstimate;
        return entry.update()
      })
      .then((entry) => entry.publish())
      .then((entry) => console.log('saveProject: Entry ', entry.sys.id, 'updated'))
      .catch(console.error)

  }

  /**
   * Use the Contentful SDK to remove a record
   * 
   * @param id A Contentful entry id.
   */
  public deleteProject(id: string) {
    console.log('deleteProject: id ', id);
  }

}
