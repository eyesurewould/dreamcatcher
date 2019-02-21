# Dreamcatcher

Inspiration collection app for artists working active commission projects.

Dreamcatcher is a simple tool for artists to track images about works they are creating for clients. These can be planned, in progress, or completed works and typically the artist would upload images related to the work. For example, if the artist completed sketches prior to starting the work, those could be uploaded. Similarly, once the work was complete a final image could be uploaded.

This is not a CRM but instead is focused on image capture because artists create and receive images from many channels (camera, sms, email, social networks) and need to collect them for easy retrieval. 

Future features:
Link to external images (dropbox, github, social networks, etc)
Firebase authentication (isolate content by artist)
Implement a Store (to better handle state for multi-device situations)

# Structure

The view began as a simple Angular 7 web app (not a PWA or single page). The controller is also in Angular 7. The model is in Contentful (a headless CMSaaS). Currently, the Contentful SDKs are leveraged in a Service, but need to be refactored to Express (or GraphQL) so the details are in the back-end for security purposes.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). 
Note that some tests are stubbed out but none are complete (this project was not drive through
an SDLC, but 'grew' without plans or tests).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Current e2e test is minimal (only passes one test).
