import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { environment } from '../../environments/environment';

import { Client } from '../client/client'; 

@Injectable({
  providedIn: 'root'
})

export class ContentfulService {
  private space: string = environment.contentful.space;
  private accessToken: string = environment.contentful.accessToken;
  private personalToken: string = environment.contentful.personalToken;

  private url: string = ''; //a workspace
  private apiUrl = 'https://api.contentful.com';
  private cdnUrl = 'https://cdn.contentful.com';

  client: Observable<Client>;
  clients: Observable<Client[]>;

  constructor(protected httpClient: HttpClient) { }

  /**
   * Make an HTTP POST call to the API endpoint using an personal token
   * and special content headers
   * 
   * @param client
   */
  public createClient(client: Client) {
    this.url = this.apiUrl + '/spaces/' + environment.contentful.space + '/entries/';

    const params = new HttpParams()
      .set('content_type', 'client')

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/vnd.contentful.management.v1+json');

    return this.httpClient
      .post<Client>(`${this.url}`, client, {headers, params});
  }

    /**
   * Make an HTTP GET call to the CDN endpoint using an access token
   * 
   * @param query 
   */
  public getClient(id: string) {
    this.url = this.cdnUrl + '/spaces/' + environment.contentful.space + '/entries/' + id;
    
    const params = new HttpParams()
      //.set('content_type', 'client')
      .set('include', '2')
      //.set('query', query);
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);

    this.client = this.httpClient
      .get<Client>(`${this.url}`, {headers, params});
    
    console.log('getClient: client ', this.client); 
      
    return this.client;
  }


  /**
   * Make an HTTP GET call to the CDN endpoint using an access token
   * 
   * @param query 
   */
  public getClients(query?: string) {
    this.url = this.cdnUrl + '/spaces/' + environment.contentful.space + '/entries';
    
    const params = new HttpParams()
      .set('content_type', 'client')
      .set('include', '2')
      //.set('query', query);
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken);

    this.clients = this.httpClient
      .get<Client[]>(`${this.url}`, {headers, params});
    
    console.log('getClients: clients ', this.clients); 
      
    return this.clients;
  }

}
