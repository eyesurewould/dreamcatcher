import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

import { Client } from '../client/client';
import { Project } from '../project/project';
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
  public createClient(client: Client) {
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
          },
          socialHandle: {
            'en-US': client.socialHandle
          },
          socialType: {
            'en-US': [client.socialType]
          }
        }
      }))
      .then((entry) => entry.publish())
      .then((entry) => console.log('saveClient: Entry ', entry.sys.id, 'created'))
      .catch(console.error)

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
   */
  public getClients(query?: string): Observable<contentful.EntryCollection<{}>> {

    this.contentfulClient.getEntries({
      content_type: 'client',
      include: 3
    })
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

  public saveClient(id: string, client: Client) {

    this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => {
        entry.fields.name['en-US'] = client.name;
        entry.fields.email['en-US'] = client.email;
        entry.fields.phone['en-US'] = client.phone;
        entry.fields.socialHandle['en-US'] = client.socialHandle;
        entry.fields.socialType['en-US'] = client.socialType;
        return entry.update()
      })
      .then((entry) => entry.publish())
      .then((entry) => console.log('saveClient: Entry ', entry.sys.id, 'updated'))
      .catch(console.error)

  }


  /**
   * Use the Content Management SDK to create a new entry of content type "ink"
   * 
   * @param project
   */
  public createProject(project: Project) {

    this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createEntry('ink', {
        fields: {
          title: {
            'en-US': project.title
          },
          description: {
            'en-US': project.description
          },
          location: {
            'en-US': project.location
          },
          size: {
            'en-US': project.size
          },
          style: {
            'en-US': [project.style]
          }
        }
      }))
      .then((entry) => console.log(entry))
      .catch(console.error)

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
   */
  public getProjects(query?: string): Observable<contentful.EntryCollection<{}>> {

    const params = (isDefined(query) && query != '') ?
      { content_type: 'ink', include: 3 }
      : { content_type: 'ink', query: query, include: 3 };

    this.contentfulClient.getEntries(params)
      .then((response) => {
        //console.log('getProjects: ', response);
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

}
