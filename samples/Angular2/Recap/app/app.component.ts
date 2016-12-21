import {Component} from "@angular/core";
import {Contact, ContactService} from "./contact.service";

@Component({
    selector: "my-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    contacts: Contact[];
    contacts2: Contact[];

    constructor(private contactService: ContactService) {
    }

    ngOnInit() {
        this.contactService.getAll().then(contacts => {
            this.contacts = contacts;
            this.contacts2 = contacts.concat([
                {id:3, name: "Udi"}
            ]);
        }).catch(err => {
        });
    }
}

