import {Component, Input} from "@angular/core";
import {ContactService, Contact} from "./contact.service";

@Component({
    selector: "contact-index",
    moduleId: module.id,
    templateUrl: "./contactIndex.component.html",
    styleUrls: ["./contactIndex.component.css"]
})
export class ContactIndexComponent {
    @Input() contacts: Contact[];

    constructor() {
    }
}
