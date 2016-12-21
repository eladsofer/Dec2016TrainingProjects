import {Component} from "@angular/core";

@Component({
    selector: "contact-index",
    moduleId: module.id,
    templateUrl: "./contactIndex.component.html",
    styleUrls: ["./contactIndex.component.css"]
})
export class ContactIndexComponent {
    contacts: Contact[];
    flag: boolean;
    userName: string;

    constructor() {
        this.contacts = [
            {id:1, name: "Ori"},
            {id:2, name: "Roni"},
        ];

        this.userName = "ori";

        this.flag = true;

        // setTimeout(()=> {
        //     this.contacts.push({id:3, name: "Udi"});
        // }, 1500);
    }

    remove(contact: Contact, index: number) {
        //console.log(index);
        //alert(contact.name);

        console.log(this.contacts);

        this.contacts.splice(index, 1);
    }

    save(form) {
        console.log("Valid: " + form.form.valid);

        //console.log(this.userName);
    }
}

interface Contact {
    id: number;
    name: string;
}
