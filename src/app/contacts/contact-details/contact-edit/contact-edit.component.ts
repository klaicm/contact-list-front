import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { AbstractContactDetails } from '../shared/abstract-contact-details.class';
import { PhoneNumber } from '../../models/phone-number.model';

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css', '../../../shared/styles/contact-data.component.css',
        '../../../shared/styles/edit-add.component.css', '../../../shared/styles/contact-mobile.component.css',
        '../../../shared/styles/util.component.css'],
    animations: [
        Animations.enterLeaveTriggerFavoriteContacts,
        Animations.dropErrMsg
    ]
})

export class ContactEditComponent extends AbstractContactDetails implements OnInit, OnDestroy {

    private sub: Subscription;
    contact: Contact;
    // this will be used for loader
    isLoaded = false;

    contactDataFormGroup: FormGroup;
    phoneNumbers: FormArray;

    constructor(private activatedRoute: ActivatedRoute, protected contactService: ContactService, protected _location: Location,
        protected dialog: MatDialog, private router: Router, protected formBuilder: FormBuilder) {

        super(formBuilder, dialog, contactService, _location);
        this.createContactDataFormGroup();

    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.getContactDetails(+params['id']);
        });
    }

    getContactDetails(contactId: number) {
        let contact = new Contact();
        this.contactService.getContactById(contactId).subscribe((response: Contact) => {
            this.isLoaded = true;
            contact = response;
            this.createFormGroup(contact);
            // only for purposes of template rendering for picture
            this.contact = contact;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    createFormGroup(contact: Contact) {

        this.contactDataFormGroup.get('firstNameFormControl').setValue(contact.firstName);
        this.contactDataFormGroup.get('lastNameFormControl').setValue(contact.lastName);
        this.contactDataFormGroup.get('emailFormControl').setValue(contact.email);

        this.phoneNumbers = this.contactDataFormGroup.get('phoneNumbers') as FormArray;

        const allPhoneNumbers: Array<PhoneNumber> = contact.phoneNumbers;

        allPhoneNumbers.forEach(a => this.phoneNumbers.push(this.setExistingPhoneNumber(a.phoneNumber, a.phoneDescription)));
    }

    deleteContact(contact: Contact) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Are you sure you want to delete this contact?',
                header: 'Delete'
            },
            width: '350px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.contactService.deleteContact(contact).subscribe(response => {
                    setTimeout(() => {
                        this.router.navigate(['/']);
                    }, 100);
                });
            }
        });
    }

}
