// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  contentful: {
    space: 'c8b8vlhklpan',
    accessToken: 'd9b824ae53d462d5e7b27e0f8502a380df22a9901905c305705be7bdda310e6f',
    contentTypeIds: {
      project: 'ink',
      client: 'client'
    },
    personalToken: 'CFPAT-ee9cfad0db04a6ae538573d833a097194557acd560d6835f7694c7d9a4d7ac92',
    urls: {
      api: 'https://api.contentful.com',
      cdn: 'https://cdn.contentful.com',
      upload: 'https://upload.contentful.com'
    }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
