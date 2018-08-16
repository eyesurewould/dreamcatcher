import { Injectable } from '@angular/core';

@Injectable()
 
export class ClientService {

    visibleClients = [];
    getClients() {
        return this.visibleClients = CLIENTS.slice(0);
    }

    getClient(id: number) {
        return CLIENTS.slice(0).find(client => client.id == id);
    }

}

const CLIENTS = [
    {
        "id": 0,
        "name": "unassigned",
        "email": "",
        "phone": "",
        "styles": [""],
        "photo": "",
        "handles": []
    },
    {
        "id": 10,
        "name": "Keylan",
        "email": "missyjahntattoos@gmail.com",
        "phone": "",
        "styles": ["neo-traditional","watercolor"],
        "photo": "assets/img/Missy at work.jpeg",
        "handle": []
    },
    {
        "id": 20,
        "name": "Ian",
        "email": "ian.r.sherwood@gmail.com",
        "phone": "407-927-7650",
        "styles": ["islander","neo-traditional","pop"],
        "photo": "assets/img/MyBackside.jpg",
        "handle": ["@eyesurewould"]
    },
    {
        "id": 13,
        "name": "Ashlii",
        "email": "",
        "phone": "",
        "styles": ["goth"],
        "photo": "assets/img/Sheeba at the Vet.jpg",
        "handle": []
    },
    {
        "id": 19,
        "name": "Sam",
        "email": "",
        "phone": "",
        "styles": ["watercolor"],
        "photo": "assets/img/Murphy 004.jpg",
        "handle": []
    },
    {
        "id": 11,
        "name": "Trish",
        "email": "",
        "phone": "",
        "styles": ["watercolor"],
        "photo": "assets/img/trish_rose.jpg",
        "handle": []
    },
    {
        "id": 12,
        "name": "Gareth",
        "email": "",
        "phone": "",
        "styles": ["traditional"],
        "photo": "assets/img/Sea Horse.jpg",
        "handle": []
    },
    {
        "id": 15,
        "name": "Kat",
        "email": "",
        "phone": "",
        "styles": ["goth","pop"],
        "photo": "assets/img/creepy little guy.jpeg",
        "handle": []
    }
];