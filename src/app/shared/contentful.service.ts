import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { environment } from '../../environments/environment';

import { Client } from '../client/delete --- client';
import { Project } from '../project/delete --- project';
import { isDefined } from '@angular/compiler/src/util';

import * as contentfulMgmt from 'contentful-management';
import * as contentful from 'contentful';

@Injectable({
  providedIn: 'root'
})

export class ContentfulService {
  private space: string = environment.contentful.space;
  private accessToken: string = environment.contentful.accessToken;
  private personalToken: string = environment.contentful.personalToken;

  private url: string = ''; //a workspace for building a url to call
  private apiUrl = environment.contentful.urls.api;   //'https://api.contentful.com';
  private cdnUrl = environment.contentful.urls.cdn;   //'https://cdn.contentful.com';

  private client = new Subject<contentful.Entry<{}>>();
  private clients = new Subject<contentful.EntryCollection<{}>>();

  private project = new Subject<contentful.Entry<{}>>();
  private projects = new Subject<contentful.EntryCollection<{}>>();
  private projectsForClient = new Subject<contentful.EntryCollection<{}>>();

  constructor(protected httpClient: HttpClient) { }

  private contentfulClient = contentful.createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: this.accessToken,
    space: this.space
  })
  private contentfulMgmtClient = contentfulMgmt.createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: this.accessToken
  })

  /**
   * Make an HTTP POST call to the API endpoint using an personal token
   * and special content headers
   * 
   * @param client
   */
  public createClient(client: Client) {

    this.contentfulMgmtClient.getSpace(this.space)
      .then((space) => space.getEnvironment('<environment-id>'))
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
      .then((entry) => console.log(entry))
      .catch(console.error)

  }

  /**
    * 
   * @param id A Contentful Entry ID for an entry of content_type 'client'
   */
  public getClient(id: string): Observable<contentful.Entry<{}>> {

    this.contentfulClient.getEntry(id)
      .then((response) => {
        console.log('getClient: ', response);
        this.client.next((response));
        return this.client.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.client.asObservable(); //compiler complains if I don't have this

  }


  /**
   * 
   * @param query A searcy string
   */
  public getClients(query?: string): Observable<contentful.EntryCollection<{}>> {

    this.contentfulClient.getEntries({
      content_type: 'client',
      include: 3
    })
      .then((response) => {
        console.log('getClients: ', response);
        this.clients.next((response));
        return this.clients.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.clients.asObservable(); //compiler complains if I don't have this

  }


  /**
   * 
   * @param id A Contentful Entry ID for an entry of content_type 'ink' 
   */
  public getProject(id: string): Observable<contentful.Entry<{}>> {

    this.contentfulClient.getEntry(id)
      .then((response) => {
        console.log('getProject: ', response);
        this.project.next((response));
        return this.project.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.project.asObservable(); //compiler complains if I don't have this
  }


  /**
   * Supports a full text query, if a value is provided
   * 
   * @param query A search string
   */
  public getProjects(query?: string): Observable<contentful.EntryCollection<{}>> {

    const params = (isDefined(query) && query != '') ?
      { content_type: 'ink', include: 3 }
      : { content_type: 'ink', query: query, include: 3 };
    console.log('getProjects: params ', params);

    this.contentfulClient.getEntries(params)
      .then((response) => {
        console.log('getProjects: ', response);
        this.projects.next((response));
        return this.projects.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.projects.asObservable(); //compiler complains if I don't have this

  }


  /**
    * 
   * @param clientId A Contentful Entry ID for an entry of content_type 'client'
   */
  public getProjectsForClient(clientId: string): Observable<contentful.EntryCollection<{}>> {

    const params = { content_type: 'ink', include: 3, 'fields.clientRef.sys.id': clientId };
    console.log('getProjectsForClient: params ', params);

    this.contentfulClient.getEntries(params)
      .then((response) => {
        console.log('getProjectsForClient: ', response);
        this.projectsForClient.next((response));
        return this.projectsForClient.asObservable();
      })
      .catch((err) => {
        console.error;
      });

    return this.projectsForClient.asObservable();
  }

}
