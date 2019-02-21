import { Image } from '../util/image'

export class Project {
    title: string;
    description: string;
    style: string[];
    status: string[];
    location: string[];
    size: string;
    timeEstimate: number;
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