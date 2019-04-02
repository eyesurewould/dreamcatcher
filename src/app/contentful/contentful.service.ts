import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Artist, artistOrder } from '../artist/artist';
import { Client, clientOrder } from '../client/client';
import { Project, projectOrder } from '../project/project';
import { Image } from '../util/image';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import * as contentful from 'contentful';
import * as contentfulMgmt from 'contentful-management';

import { HttpClient, HttpEventType, HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})

/**
 * This service provides a wrapper for two Contenful SDKs so the application
 * can access just one service and not care about the underlying SDKs.
 * 
 * The service has been crafted for this specific app and uses nomenclature
 * related to custom types defined in my Contentful application ("Client", 
 * "Product", and "Artist"). These should be refactored to reflect any new 
 * custom types in the content model.
 * 
 * Note: The Contentful SDKs are refered to as "client" and the custom content
 * type is also a "client". The former will always have 'contentful' in the
 * field name.
 */

export class ContentfulService {

  // Contentful SDK instances
  private contentfulClient: contentfulMgmt.ClientAPI;
  private contentfulMgmtClient: contentfulMgmt.ClientAPI;

  constructor(private http: HttpClient) {

    // Create a 'read' SDK client
    this.contentfulClient = contentful.createClient({
      accessToken: environment.contentful.accessToken,
      space: environment.contentful.space
    })

    // Create a 'CRUD' SDK client
    this.contentfulMgmtClient = contentfulMgmt.createClient({
      // This is not actually a PERSONAL token. It's for managing 
      // content in any space owned by the account, so more like
      // a master token
      accessToken: environment.contentful.personalToken
    })

  }

  /**
   * Currently, all functions are grouped by the type of content being
   * processed. This is a little short-sighted and won't scale. 
   * 
   * A better approach would be to have general case functions that
   * are called by content-type specific functions. This might result
   * in slightly more code, but less duplication. 
   */


  /**==================
   * CLIENT functions
   * ==================
   */

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
          },
          notes: {
            'en-US': client.notes
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
        if (client.notes != '') {
          entry.fields.notes = { 'en-US': client.notes };
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

      //TODO: Make permanent deletion a system-wide configuration 
      //and only archive by default (with a manual data cleanup
      //option for DevOps to control)
      .then((entry) => entry.delete())
      .then(() => console.log('deleteClient: client deleted.'))
      .catch((err) => {
        console.error;
      });

  }

  /**==================
   * PROJECT functions
   * ==================
   */

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
        console.error(err);
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
        //console.log(response);
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
        //console.log('getProjects: projects ', response);
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
        if (project.title != '') {
          entry.fields.title = { 'en-US': project.title };
        }
        if (project.style && project.style[0] != '') {
          entry.fields.style = { 'en-US': [project.style] };
        }
        if (project.status && project.status[0] != '') {
          entry.fields.status = { 'en-US': [project.status] };
        }
        if (project.description != '') {
          entry.fields.description = { 'en-US': project.description };
        }
        if (project.size != '') {
          entry.fields.size = { 'en-US': project.size };
        }
        if (project.location && project.location[0] != '') {
          entry.fields.location = { 'en-US': [project.location] };
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
        console.log('saveProject: Entry ', entry.sys.id, 'updated');
        return entry;
      })
      .catch((err) => {
        console.error(err);
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

      //TODO: Make permanent deletion a system-wide configuration 
      //and only archive by default (with a manual data cleanup
      //option for DevOps to control)
      .then((entry) => entry.delete())
      .then(() => console.log('deleteProject; project ', id, 'deleted'))
      .catch((err) => {
        console.error;
      });
  }


  /**==================
   * ARTIST functions
   * ==================
   */

     /**
   * Use the Content Management SDK to create a new entry of content type "artist"
   * 
   * @param artist
   */
  public createArtist(artist: Artist) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createEntry('artist', {
        fields: {
          email: {
            'en-US': artist.email
          },
          firstName: {
            'en-US': artist.firstName
          },
          lastName: {
            'en-US': artist.lastName
          }
        }
      }))
      .then((entry) => entry.publish())
      .then((entry) => {
        console.log('createArtist: Entry ', entry.sys.id, 'created');
        return entry
      })
      .catch((err) => {
        console.error;
      });

  }


  /**
   * Use the Content SDK to retrieve records
   * 
   * @param id A Contentful Entry ID for an entry of content_type 'artist'
   */
  public getArtist(id: string) {

    return this.contentfulClient.getEntry(id)
      .then((response) => {
        //console.log('getArtist(): ' + response);
        return response;
      })
      .catch((err) => {
        console.error;
      });

  }

  /**
   * Use the Content SDK to retrieve records
   * 
   * @param artistId A Contentful Entry ID for an entry of content_type 'artist'
   */
  public getClientsForArtist(artistId: string) {

    const params = {
      content_type: 'artist',
      include: 3,
      order: '-sys.updatedAt',
      'fields.clientRef.sys.id': artistId
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
 * Update an artist Entry
 * 
 * @param id A Contentful Entry id for an existing entry to update
 * @param artist An object with details to update the entry
 */
  public saveArtist(id: string, artist: Artist) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => {
        entry.fields.email = { 'en-US': artist.email };

        if (artist.firstName != '') {
          entry.fields.firstName = { 'en-US': artist.firstName };
        }
        if (artist.lastName != '') {
          entry.fields.lastName = { 'en-US': artist.lastName };
        }

        return entry.update();
      })
      .then((entry) => {
        return entry.publish();
      })
      .then((entry) => {
        console.log('saveArtist: Entry ', entry.sys.id, ' updated');
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
  public deleteArtist(id: string) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((env) => env.getEntry(id))
      .then((entry) => entry.unpublish())

      //TODO: Make permanent deletion a system-wide configuration 
      //and only archive by default (with a manual data cleanup
      //option for DevOps to control)
      .then((entry) => entry.delete())
      .then(() => console.log('deleteArtist: Artist deleted.'))
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


  /**
 * Use the Content Management SDK to create a new asset
 * 
 * @param image
 */
  public createAssetFromUpload(imageId: string, imageType: string, imageFileName: string) {

    return this.contentfulMgmtClient.getSpace(environment.contentful.space)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        return environment.createAsset({
          fields: {
            title: {
              'en-US': imageFileName
            },
            file: {
              'en-US': {
                contentType: imageType,
                fileName: imageFileName,
                uploadFrom: {
                  sys: {
                    type: 'Link',
                    linkType: 'Upload',
                    id: imageId
                  }
                }
              }
            }
          }
        })
      })
      .then((asset) => {
        console.log('createAssetFromUpload: process it ', asset);
        asset.processForLocale('en-US')
          .then((asset) => {
            console.log('createAssetFromUpload: returned from the call to process the asset', asset);
            console.log('createAssetFromUpload: url to the asset', asset.fields.file['en-US'].url);
          });
      })
      .then((asset) => {
        console.log('createAssetFromUpload: publish it ', asset);
        asset.publish();
      })
      .then((asset) => {
        console.log('createAssetFromUpload: publish success ', asset);
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

  /**
   * Receives an input field with potentially multiple files. Each
   * selected file is uploaded to Contenful and the image id is assigned 
   * to a new Asset object.
   * The set of Asset ids (not image ids) is returned
   * 
   * @param files 
   * @returns ids
   */
  //public upload(files: Set<File>): { [key: string]: Observable<number> } {
  public upload(files: FileList): { [key: string]: Observable<number> } {

    // this will be the our resulting map
    let status;

    Array.from(files).forEach(file => {
      console.log('upload: ready to upload ', file.name);
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.uploadFile(formData)
        .then((id) => {
          if (id != null) {

            this.createAssetFromUpload(id, file.type, file.name)
              .then((assetId) => {
                console.log('upload: assetId ', assetId);
                //status.append({ 'id': assetId });
                //console.log('upload: status object so far...', status);
              })
          } else {
            console.log('upload: no id returned');
          }
        })

    });

    // return the map of progress.observables
    return status;
  }

  uploadFile(formData: FormData): Promise<string> {
    let URL = environment.contentful.urls.upload + '/spaces/' + environment.contentful.space + '/uploads';
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Authorization': 'Bearer ' + environment.contentful.personalToken
    });

    var sys;
    var id = null;

    console.log('uploadFile: start file upload');

    //call the angular http method
    return this.http.post(
      URL,
      formData,
      {
        headers: httpHeaders,
        responseType: 'json'
      }).pipe(
        map((res: Response) => {
          // need to extract an ID value, but we don't have an Class for the response
          let resultJson = JSON.stringify(res);
          let result = JSON.parse(resultJson);
          if (result.sys != null) {
            sys = result.sys;
            if (result.sys.id != null) {
              id = result.sys.id;
            }
          }

          console.log('uploadFile: file uploaded: ', id);
          return id;
        })).toPromise()

  }

}

