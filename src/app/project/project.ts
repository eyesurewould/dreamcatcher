import { Image } from '../shared/image'

export class Project {
    title: string;
    description: string;
    style: string[];
    location: string[];
    size: string;
    timeEstimate: number;
    status: string[];
    assets: FileList;
    clientRef: string;
}

export enum projectOrder {
    title = "title",
    style = "style",
    status = "status",
    created = "createdAt",
    updated = "updatedAt"
}