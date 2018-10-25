export class Client {

    name: string;
    email?: string;
    phone?: string;
    notes?: string;
    socialHandle?: string;
    socialType?: string[];
    sys: any;
}

export enum clientOrder {
    name = "name",
    email = "email",
    phone = "phone",
    created = "createdAt",
    updated = "updatedAt"
}