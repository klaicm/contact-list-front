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
    isLoaded = false;
    phoneNumbersMap = new Map<String, String>();

    constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService, private router: Router,
        private _location: Location) { }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.getContactDetails(+params['id']);
        });
    }

    getContactDetails(contactId: number): void {
        this.contactService.getContactById(contactId).subscribe((response: Contact) => {
            this.isLoaded = true;
            this.contact = response;

            let allPhoneNumbers = this.contact.phoneNumbers;

            while (allPhoneNumbers.length > 1) {
                const phoneNumber = allPhoneNumbers.substring(allPhoneNumbers.indexOf('#') + 1,
                    allPhoneNumbers.indexOf('$'));
                allPhoneNumbers = allPhoneNumbers.substring(allPhoneNumbers.indexOf('$'));
                const phoneDescription = allPhoneNumbers.substring(allPhoneNumbers.indexOf('$') + 1,
                    allPhoneNumbers.indexOf('#'));

                this.phoneNumbersMap.set(phoneDescription.toLocaleUpperCase(), phoneNumber);

                allPhoneNumbers = allPhoneNumbers.substring(allPhoneNumbers.indexOf('#'));

            }
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

    changeIsFavorite() {
        this.contact.isFavorite = !this.contact.isFavorite;
        this.contactService.saveContact(this.contact).subscribe(() => { });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
