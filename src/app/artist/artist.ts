export class Artist {

    email: string;
    firstName?: string;
    lastName?: string;
    sys: any;

}

export enum artistOrder {
    email = "email",
    firstName = "firstName",
    lastName = "lastName",
    created = "createdAt",
    updated = "updatedAt"
}