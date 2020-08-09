import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css', '../../shared/styles/contact-data.component.css',
        '../../shared/styles/edit-add.component.css'],
    animations: [
        Animations.enterLeaveTriggerFavoriteContacts
    ]
})

export class ContactEditComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    contact: Contact;
    // this will be used for loader
    isLoaded = true;

    contactDataFormGroup: FormGroup;

    constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService, private _location: Location,
         public dialog: MatDialog) {

    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            const contact: Contact = this.getContactDetails(+params['id']);
            this.contactDataFormGroup = this.createFormGroup(contact);
        });
    }

    getContactDetails(contactId: number): Contact {
        this.contactService.tempList.subscribe(response => {
            const contactList: Array<Contact> = response;
            this.contact = contactList[contactList.findIndex((a: Contact) => a.id === contactId)];
        });

        return this.contact;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    createFormGroup(contact: Contact): FormGroup {
        const contactDataFormGroup = new FormGroup({
            firstNameFormControl: new FormControl(contact.firstName, Validators.required),
            lastNameFormControl: new FormControl(contact.lastName, Validators.required),
            emailFormControl: new FormControl(contact.email, [Validators.required, Validators.email]),
            phoneNumberHomeFormControl: new FormControl(contact.phoneNumberHome, [Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.maxLength(10)]),
            phoneNumberWorkFormControl: new FormControl('', [
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(10)]),
            phoneNumberCellFormControl: new FormControl('', [
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(10)]),
            phoneNumberHusbandFormControl: new FormControl('', [
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(10)])
        });

        return contactDataFormGroup;
    }

    saveContact() {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Are you sure you want to modifiy this contact?',
                header: 'Edit'
            },
            width: '350px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                let contact = this.contact;

                // only for mock purposes
                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.lastName = this.contactDataFormGroup.get('lastNameFormControl').value;
                contact.email = this.contactDataFormGroup.get('emailFormControl').value;
                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.phoneNumberHome = this.contactDataFormGroup.get('phoneNumberHomeFormControl').value;
                contact.phoneNumberCell = this.contactDataFormGroup.get('phoneNumberCellFormControl').value;
                contact.phoneNumberWork = this.contactDataFormGroup.get('phoneNumberWorkFormControl').value;
                contact.phoneNumberHusband = this.contactDataFormGroup.get('phoneNumberHusbandFormControl').value;

                this.contactService.editContact(contact);

                // only because tslint about reassigning identifier
                contact = null;

                setTimeout(() => {
                    this._location.back();
                }, 100);
            } else {
                console.log('Canceled');
            }
        });
    }

    deleteContact(contactId: number) {
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
                let contact = new Contact();
                this.contactService.tempList.subscribe(contactsBeforeDelete => {
                    const contactList: Array<Contact> = contactsBeforeDelete;
                    contact = contactList[contactList.findIndex((a: Contact) => a.id === contactId)];

                    if (contact) {
                        this.contactService.removeContact(contact);

                        setTimeout(() => {
                            this._location.back();
                        });

                    }
                });
            } else {
                console.log('Canceled');
            }
        });
    }

    navigateBack() {
        this._location.back();
    }

}
