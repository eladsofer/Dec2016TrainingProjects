import {Component, Input} from "@angular/core";
import {ContactService} from "./contact.service";
import {Contact} from "../common/contact";

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
