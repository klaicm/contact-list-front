import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { Animations } from 'src/app/shared/animations/animations';
import { Location } from '@angular/common';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css', '../../shared/styles/contact-data.component.css'],
    animations: [
        Animations.enterLeaveTriggerFavoriteContacts
    ]
})

export class ContactDetailsComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    contact: Contact;
    // this will be used for loader
    isLoaded = true;

    constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService, private router: Router,
        private _location: Location) { }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.getContactDetails(+params['id']);
        });
    }

    getContactDetails(contactId: number): void {
        this.contactService.tempList.subscribe(response => {
            const contactList: Array<Contact> = response;
            this.contact = contactList[contactList.findIndex((a: Contact) => a.id === contactId)];

            console.log(this.contact);
        });
    }

    navigateToContactEdit(contactId: number) {
        this.router.navigate(['/contact-edit', contactId]);
    }

    navigateBack() {
        this._location.back();
    }

    setHeartIconClass(isFavorite: boolean) {
        if (isFavorite) {
            return { 'fa': true, 'fa-heart': true, 'heart-icon': true, 'icon-interactive': true };
        } else {
            return { 'fa': true, 'fa-heart-o': true, 'heart-icon': true, 'icon-interactive': true };
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
