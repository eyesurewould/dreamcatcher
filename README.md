# Dreamcatcher

Inspiration collection app for artists working active commission projects.

Dreamcatcher is a simple tool for artists to track images about works they are creating for clients. These can be planned, in progress, or completed works and typically the artist would upload images related to the work. For example, if the artist completed sketches prior to starting the work, those could be uploaded. Similarly, once the work was complete a final image could be uploaded.

Future features:
Link to external images
Firebase authentication
NGRX for state

# Structure

The view is a simple Angular 7 web app (not a PWA or single page) and the controller is also in Angular 7. The model is in Contentful (a headless CMSaaS).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Note that many tests are stubbed out but not complete.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Current e2e test is minimal (only passes one test).
