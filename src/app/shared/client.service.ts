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
        "id": 10,
        "name": "Keylan",
        "email": "missyjahntattoos@gmail.com",
        "phone": "",
        "styles": ["neo-traditional","watercolor"],
        "photo": "assets/img/Missy at work.jpeg"
    },
    {
        "id": 20,
        "name": "Ian",
        "email": "ian.r.sherwood@gmail.com",
        "phone": "",
        "styles": ["islander"],
        "photo": "assets/img/MyBackside.jpg"
    },
    {
        "id": 13,
        "name": "Ashlii",
        "email": "",
        "phone": "",
        "styles": ["goth"],
        "photo": "assets/img/Sheeba at the Vet.jpg"
    },
    {
        "id": 19,
        "name": "Sam",
        "email": "",
        "phone": "",
        "styles": ["watercolor"],
        "photo": "assets/img/Murphy 004.jpg"
    },
    {
        "id": 11,
        "name": "Trish",
        "email": "",
        "phone": "",
        "styles": ["watercolor"],
        "photo": ""
    },
    {
        "id": 12,
        "name": "Gareth",
        "email": "",
        "phone": "",
        "styles": ["traditional"],
        "photo": "assets/img/Sea Horse.jpg"
    }
];