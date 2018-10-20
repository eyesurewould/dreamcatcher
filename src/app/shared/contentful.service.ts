import { Injectable, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';

import { Client, clientOrder } from '../client/client';
import { Project, projectOrder } from '../project/project';
import { Image } from './image';

import * as contentful from 'contentful';
import * as contentfulMgmt from 'contentful-management';

import { HttpClient, HttpEventType, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ContentfulService {

  private contentfulClient: contentfulMgmt.ClientAPI;
  private contentfulMgmtClient: contentfulMgmt.ClientAPI;

  constructor(private el: ElementRef, private http: HttpClient) {

    this.contentfulClient = contentful.createClient({
      accessToken: environment.contentful.accessToken,
      space: environment.contentful.space
    })

    this.contentfulMgmtClient = contentfulMgmt.createClient({
      // This is not actually a PERSONAL token. It's for managing 
      // content in any space owned by the account, so more like
      // a master token
      accessToken: environment.contentful.personalToken
    })

  }

  /**
   * Use the Content Management SDK to create a new entry of content type "client"
   * 
   * @param client
   */
  public createClient(client: Client) {

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
        //console.log('getClient(): ' + response);
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
        entry.fields.name = { 'en-US': client.name };

        if (client.email != '') {
          entry.fields.email = { 'en-US': client.email };
        }
        if (client.phone != '') {
          entry.fields.phone = { 'en-US': client.phone };
        }

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
        return entry.publish();
      })
      .then((entry) => {
        console.log('createProject: Entry ', entry.sys.id, ' created');
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
    let envHolder: any; //environment must be retained for later use

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => {
        //save a handle to the environment object - we'll need it later
        envHolder = env;
        return env.getEntry(id);
      })
      .then((entry) => {
        //push data into a container
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

        //IN PROGRESS - working on calling the Upload service

        //here is an asset ID (not connected to an entry yet)
        // 4EJUBLSYcggCce8AkGeKqs

        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
        let fileCount: number = inputEl.files.length;
        var assetId;
        var assetRequest;

        if (fileCount > 0) { // a file was selected

          for (var i = 0; i < fileCount; i++) {
            //create a new formData instance for each loop
            let formData = new FormData();
            formData.append('file', inputEl.files.item(i));

            console.log('file name ', inputEl.files.item(i).name);
            console.log('file type ', inputEl.files.item(i).type);

            assetId = this.uploadFile(formData)

            assetRequest = {
              fields: {
                file: {
                  "en-US": {
                    contentType: inputEl.files.item(i).type,
                    fileName: inputEl.files.item(i).name,
                    uploadFrom: {
                      sys: {
                        type: "Link",
                        linkType: "Upload",
                        id: assetId
                      }
                    }
                  }
                }
              }
            }

          }

        }

        console.log('saveProject: now call update ', entry);

        return entry.update()
      })
      .then((entry) => {
        console.log('saveProject: update returned, now publish ', entry);
        return entry.publish()
      })
      .then((entry) => {
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

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => entry.unpublish())
      .then((entry) => entry.delete())
      .then(() => console.log('deleteProject; project ', id, 'deleted'))
      .catch((err) => {
        console.error;
      });
  }


  //IN PROGRESS  
  /**
   * Use the Content Management SDK to create a new asset
   * 
   * @param image
   */
  public createImage(image: Image) {  //project: Project) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        //ON HOLD - return to this after the Upload service is complete, but need 
        //to commit latest for upcoming review
        environment.createAsset({
          fields: {
            title: {
              'en-US': image.title
            },
            file: {
              'en-US': {
                contentType: 'image/jpeg',
                fileName: image.fileName,
                upload: 'https://example.com/example.jpg'
              }
            }
          }
        })
      })
      .then((asset) => {
        console.log('createImage: process it ', asset);
        return asset.process();
      })
      .then((asset) => {
        console.log('createImage: publish it ', asset);
        return asset.publish();
      })
      .then((asset) => {
        console.log('createImage: publish success ', asset);
        return asset;
      })
      .catch((err) => {
        console.error;
      });

  }


  /************************************************************************
   * Helper methods
   ************************************************************************ 
   */


  uploadFile(formData: FormData) {
    let URL = environment.contentful.urls.upload + '/spaces/' + environment.contentful.space + '/uploads';

    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.append('Authorization', 'Bearer ' + environment.contentful.accessToken);
    myHeaders = myHeaders.append('Content-Type', 'application/octet-stream');

    let myParams = new HttpParams();

    //call the angular http method
    return this.http
      .post(
        URL,
        formData,
        {
          params: myParams,
          headers: myHeaders
        }
      ).pipe(map((res: Response) => {
        res.sys.id;
      }
      )).subscribe(
        //map the success function and alert the response
        (success) => {
          console.log(success);
        },
        (error) => console.log(error))

  }

}
