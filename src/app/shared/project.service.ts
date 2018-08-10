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
        "name": "Sleeve (cover up) - Sea Horse / Oar Fish / Coral",
        "date": "",
        "image": ["assets/img/Sea Horse.jpg","assets/img/oar_fish.jpg","assets/img/gareth_cover.jpg","assets/img/gareth_sleeve_oarfish001.jpg","assets/img/gareth_sleeve_source003.jpg"],
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
    },
    {
        "id": 12,
        "style": "pop",
        "name": "Rainbow Whale",
        "date": "",
        "image": ["assets/img/rainbow_whale.jpg"],
        "artistId": 0,
        "clientId": 0
    },
    {
        "id": 13,
        "style": "goth",
        "name": "Witch",
        "date": "",
        "image": ["assets/img/witch_arm.jpg","assets/img/witch_arm_starting.jpg"],
        "artistId": 100,
        "clientId": 13
    },
    {
        "id": 14,
        "style": "goth",
        "name": "Thre Sisters",
        "date": "",
        "image": ["assets/img/three_sisters.jpg","assets/img/three_sisters_starting.jpg"],
        "artistId": 100,
        "clientId": 13
    },
    {
        "id": 15,
        "style": "pop",
        "name": "Gator / Bird / Panther",
        "date": "",
        "image": ["assets/img/gator 001.jpg","assets/img/gator 002.jpg","assets/img/gator 003.jpg"],
        "artistId": 100,
        "clientId": 20
    },
    {
        "id": 16,
        "style": "goth",
        "name": "Skelly Cat",
        "date": "",
        "image": ["assets/img/skelly_cat.jpg"],
        "artistId": 100,
        "clientId": 13
    },
    {
        "id": 17,
        "style": "japanese",
        "name": "Dragon - foot cover up (welsh / japanese / norse)",
        "date": "",
        "image": ["assets/img/emma_foot_cover.jpg","assets/img/emma_foot_source002.jpg","assets/img/emma_foot_source001.jpg"],
        "artistId": 100,
        "clientId": 14
    },
    {
        "id": 18,
        "style": "pop",
        "name": "Creepy cartoon guy with heart",
        "date": "",
        "image": ["assets/img/creepy little guy.jpg"],
        "artistId": 100,
        "clientId": 15
    },
    {
        "id": 19,
        "style": "pop",
        "name": "Three Brothers",
        "date": "",
        "image": ["assets/img/three_brothers.jpg"],
        "artistId": 100,
        "clientId": 15
    },
    {
        "id": 20,
        "style": "pop",
        "name": "Love My Life",
        "date": "",
        "image": ["assets/img/sharon_source001.jpg","assets/img/sharon_source002.jpg","assets/img/sharon_source003.jpg"],
        "artistId": 100,
        "clientId": 16
    }
];