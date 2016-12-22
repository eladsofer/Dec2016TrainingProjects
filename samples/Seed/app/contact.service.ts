import {Contact} from "../common/contact";
import {Http} from "@angular/http";
import {Component, Injectable} from "@angular/core";

@Injectable()
export class ContactService {
    private contacts: Contact[];

    constructor(http: Http) {
    }

    getAll(): Promise<Contact[]> {
        return Promise.resolve([
            {id:1, name: "Ori"},
            {id:2, name: "Roni"},
        ]);
    }
}
