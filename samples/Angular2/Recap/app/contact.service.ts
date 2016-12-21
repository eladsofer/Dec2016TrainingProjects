export class ContactService {
    private contacts: Contact[];

    constructor() {
    }

    getAll(): Promise<Contact[]> {
        return Promise.resolve([
            {id:1, name: "Ori"},
            {id:2, name: "Roni"},
        ]);
    }
}

export interface Contact {
    id: number;
    name: string;
}
