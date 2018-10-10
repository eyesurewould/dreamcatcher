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

  //private clients: contentful.EntryCollection<any>;

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

    console.log('createClient: start ', client);
    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
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
        console.log('createClient: Entry ', entry.sys.id, 'created');
        return entry
      })
      .catch((err) => {
        console.error;
      });

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param id A Contentful Entry ID for an entry of content_type 'client'
   */
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


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param query A searcy string
   * @param order <optional> The sort order of results (an Enum in /client/client.ts)
   * @param limit <optional> The maximum number of results
   * @param skip <optional> The number of found entries to skip (for pagination)
   */
  public getClients(query?: string, order?: clientOrder, limit?: number, skip?: number) {

    var params = {
      content_type: 'client',
      include: 3
    };

    if (query != undefined) {
      if (query != '') {
        params['query'] = query;
      }
    }

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

    //console.log('getClients: params ' params);
    return this.contentfulClient.getEntries(params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error;
      });

  }

  /**
   * Update a client Entry
   * 
   * @param id A Contentful Entry id for an existing entry to update
   * @param client An object with details to update the entry
   */
  public saveClient(id: string, client: Client) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
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
      .then((entry) => {
        return entry.publish();
      })
      .then((entry) => {
        console.log('saveClient: Entry ', entry.sys.id, ' updated');
        return entry
      })
      .catch((err) => {
        console.error;
      });

  }

  /**
   * Use the Contentful SDK to remove a record
   * 
   * @param id A Contentful entry id.
   */
  public deleteClient(id: string) {
    console.log('deleteClient: id ', id);

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => entry.unpublish())
      .then((entry) => entry.delete())
      .then(() => console.log('deleteClient: client deleted.'))
      .catch((err) => {
        console.error;
      });

  }


  /**
   * Use the Content Management SDK to create a new entry of content type "ink"
   * 
   * @param project
   */
  public createProject(project: Project) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        console.log('createProject: got env - about to create an entry for ', project.title);
        return environment.createEntry('ink', {
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
        })
      })
      .then((entry) => {
        //console.log('createProject: publish it ', entry);
        return entry.publish();
      })
      .then((entry) => {
        //console.log('createProject: publish success ', entry);
        return entry;
      })
      .catch((err) => {
        console.error;
      });

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param id A Contentful Entry ID for an entry of content_type 'ink' 
   */
  public getProject(id: string) {
    return this.contentfulClient.getEntry(id)
      .then((response) => {
        console.log('getProject: ', response);
        return response;
      })
      .catch((err) => {
        console.error;
      });

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
  public getProjects(query?: string, order?: projectOrder, limit?: number, skip?: number) {

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

    return this.contentfulClient.getEntries(params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error;
      });

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param clientId A Contentful Entry ID for an entry of content_type 'client'
   */
  public getProjectsForClient(clientId: string) {

    const params = { 
      content_type: 'ink', 
      include: 3, 
      order: '-sys.updatedAt', 
      'fields.clientRef.sys.id': clientId 
    };

    return this.contentfulClient.getEntries(params)
      .then((response) => {
        console.log('getProjectsForClient(): ', response);
        return response;
      })
      .catch((err) => {
        console.error;
      });

  }


  /**
 * Update a project (ink) Entry
 * 
 * @param id A Contentful Entry id for an existing entry to update
 * @param project An object with details to update the entry
 */
  public saveProject(id: string, project: Project) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => {
        console.log('saveProject: retrieved entry to update ', entry);
        console.log('saveProject: load the data from project ', project);

        entry.fields.title = { 'en-US': project.title };

        if (project.style[0] != '') {
          entry.fields.style = { 'en-US': project.style };
        }
        if (project.status[0] != '') {
          entry.fields.status = { 'en-US': project.status };
        }
        if (project.description != '') {
          entry.fields.description = { 'en-US': project.description };
        }
        if (project.size != '') {
          entry.fields.size = { 'en-US': project.size };
        }
        if (project.location[0] != '') {
          entry.fields.location = { 'en-US': project.location };
        }
        if (project.timeEstimate != null) {
          entry.fields.timeEstimate = { 'en-US': project.timeEstimate };
        }

        console.log('saveProject: now call update ', entry);

        return entry.update()
      })
      .then((entry) => {
        console.log('saveProject: update returned, now publish ', entry);
        return entry.publish()
      })
      .then((entry) => {
        console.log('saveProject: publish returned, now exit ', entry);
        console.log('saveProject: Entry ', entry.sys.id, 'updated');
        return entry;
      })
      .catch((err) => {
        console.error;
      })

  }

  /**
   * Use the Contentful SDK to remove a record
   * 
   * @param id A Contentful entry id.
   */
  public deleteProject(id: string) {
    console.log('deleteProject: id ', id);

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => entry.unpublish())
      .then((entry) => entry.delete())
      .then(() => console.log('deleteProject; project deleted.'))
      .catch((err) => {
        console.error;
      });
  }

}
