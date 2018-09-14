import { Asset } from '../shared/asset'

export class Project {
    title: string;
    description: string;
    style: string[];
    location: string[];
    size: string;
    timeEstimate: number;
    status: string[];
    assets: Asset[];
    clientRef: string;
}

export enum projectOrder {
    title = "title",
    style = "style",
    status = "status",
    created = "created"
}