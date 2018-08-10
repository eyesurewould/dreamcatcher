import { Injectable } from '@angular/core';

@Injectable()

export class ProjectService {

    visibleProjects = [];
    getProjects() {
        return this.visibleProjects = PROJECTS.slice(0);
    }

    getProject(id: number) {
        return PROJECTS.slice(0).find(project => project.id == id);
    }

    getClientProjects(id: number) {
        //return this.visibleProjects = PROJECTS.slice(0).filter(function(item) {
        //    return item.clientId === id;
        //  });
        //
        console.log(id);
        this.visibleProjects = PROJECTS.slice(0).filter(project => project.clientId == id);
        console.log(this.visibleProjects);
        return this.visibleProjects;
    }

    getArtistProjects(id: number) {
        return PROJECTS.slice(0).find(project => project.artistId == id);
    }

}

const PROJECTS = [
    {
        "id": 1,
        "style": "japanese",
        "name": "up close",
        "date": "",
        "image": ["assets/img/Leia 001.jpg"],
        "artistId": 103,
        "clientId": 20
    },
    {
        "id": 2,
        "style": "neo-traditional",
        "name": "reindeer",
        "date": "",
        "image": ["assets/img/Leia 004.jpg"],
        "artistId": 103,
        "clientId": 20
    },
    {
        "id": 3,
        "style": "neo-traditional",
        "name": "dog with flowers",
        "date": "",
        "image": ["assets/img/Murphy 004.jpg", "assets/img/Young Murphy.jpg"],
        "artistId": 103,
        "clientId": 20
    },
    {
        "id": 4,
        "style": "neo-traditional",
        "name": "Sea Horse",
        "date": "",
        "image": ["assets/img/Sea Horse.jpg"],
        "artistId": 100,
        "clientId": 12
    },
    {
        "id": 5,
        "style": "neo-traditional",
        "name": "Oar Fish (or paddle fish?)",
        "date": "",
        "image": ["assets/img/oar_fish.jpg"],
        "artistId": 100,
        "clientId": 12
    },
    {
        "id": 6,
        "style": "watercolor",
        "name": "Juniper Flower",
        "date": "",
        "image": ["assets/img/Juniper.jpg"],
        "artistId": 100,
        "clientId": 19
    },
    {
        "id": 7,
        "style": "goth",
        "name": "bats",
        "date": "",
        "image": ["assets/img/bats.jpg"],
        "artistId": 100,
        "clientId": 13
    },
    {
        "id": 8,
        "style": "goth",
        "name": "Three Sisters - Hecate",
        "date": "",
        "image": ["assets/img/sisters.jpg"],
        "artistId": 100,
        "clientId": 13
    },
    {
        "id": 9,
        "style": "pop",
        "name": "Robots Attack!",
        "date": "",
        "image": ["assets/img/robots.jpg"],
        "artistId": 100,
        "clientId": 20
    },
    {
        "id": 11,
        "style": "pop",
        "name": "Lil' Cap",
        "date": "",
        "image": ["assets/img/lil Cap.jpg"],
        "artistId": 101,
        "clientId": 0
    }
];