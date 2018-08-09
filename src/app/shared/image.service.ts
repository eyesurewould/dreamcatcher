import { Injectable } from '@angular/core';

@Injectable()
 
export class ImageService {

    visibleImages = [];
    getImages() {
        return this.visibleImages = IMAGES.slice(0);
    }

    getImage(id: number) {
        return IMAGES.slice(0).find(image => image.id == id);
    }

}

const IMAGES = [
    {
        "id": 1,
        "category": "leia",
        "caption": "up close",
        "url": "assets/img/Leia 001.jpg"
    },
    {
        "id": 2,
        "category": "leia",
        "caption": "upside down",
        "url": "assets/img/Leia 004.jpg"
    },
    {
        "id": 3,
        "category": "leia",
        "caption": "looking pensive",
        "url": "assets/img/Leia 006.jpg"
    },
    {
        "id": 4,
        "category": "leia",
        "caption": "upside down",
        "url": "assets/img/Leia 004.jpg"
    },
    {
        "id": 5,
        "category": "murphy",
        "caption": "just chillin'",
        "url": "assets/img/Murphy 001.jpg"
    },
    {
        "id": 6,
        "category": "murphy",
        "caption": "murph and sheeba",
        "url": "assets/img/Murphy 002.jpg"
    },
    {
        "id": 7,
        "category": "murphy",
        "caption": "murphy in the flowers",
        "url": "assets/img/Murphy 004.jpg"
    },
    {
        "id": 8,
        "category": "murphy",
        "caption": "young murphy",
        "url": "assets/img/Young Murphy.jpg"
    },
    {
        "id": 9,
        "category": "sheeba",
        "caption": "down on the rug getting scratches",
        "url": "assets/img/Sheeba 001.jpg"
    },
    {
        "id": 10,
        "category": "sheeba",
        "caption": "at the vet",
        "url": "assets/img/Sheeba at the Vet.jpg"
    },
    {
        "id": 11,
        "category": "sheeba",
        "caption": "smiling for the camera",
        "url": "assets/img/Smiling Sheeba.jpg"
    },
    {
        "id": 12,
        "category": "zeb",
        "caption": "what's that?",
        "url": "assets/img/Zebbie 001.jpg"
    },
    {
        "id": 13,
        "category": "zeb",
        "caption": "who's a good boy?",
        "url": "assets/img/Zebbie 002.jpg"
    },
    {
        "id": 14,
        "category": "zeb",
        "caption": "gangsta elf",
        "url": "assets/img/Zebbie 003.jpg"
    }
];