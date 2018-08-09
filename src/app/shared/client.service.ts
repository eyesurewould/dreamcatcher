import { Injectable } from '@angular/core';

@Injectable()
 
export class ClientService {

    visibleClients = [];
    getClients() {
        return this.visibleClients = CLIENTS.slice(0);
    }

    getClient(id: string) {
        return CLIENTS.slice(0).find(client => client.clientId == id);
    }

}

const CLIENTS = [
    {
        "clientId": "1",
        "name": "Missy",
        "email": "missyjahntattoos@gmail.com",
        "phone": "",
        "styles": ["neo-traditional","watercolor"],
        "photo": "assets/img/Missy at work.jpeg"
    },
    {
        "clientId": "2",
        "name": "Leia",
        "email": "",
        "phone": "",
        "styles": ["islander"],
        "photo": "assets/img/Leia 001.jpg"
    }
];