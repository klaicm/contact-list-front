import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';

@Component({
    selector: 'app-contact-add',
    templateUrl: './contact-add.component.html',
    styleUrls: ['./contact-add.component.css', '../../shared/styles/contact-data.component.css',
        '../../shared/styles/edit-add.component.css'],
    animations: [
        Animations.enterLeaveTriggerFavoriteContacts,
        Animations.dropErrMsg
    ]
})

export class ContactAddComponent implements OnInit {

    contactList = new Array<Contact>();
    // this will be used for loader
    isLoaded = true;

    contactDataFormGroup: FormGroup;

    constructor(private contactService: ContactService, private _location: Location, public dialog: MatDialog) {

    }

    ngOnInit() {

        this.getContactList();

        this.contactDataFormGroup = this.createFormGroup();

    }

    /**
     * This method is only for mock purposes to get shared list in which new contact will be added
     */
    getContactList() {
        this.contactService.tempList.subscribe(response => {
            this.contactList = response;
        });
    }

    createFormGroup(): FormGroup {
        const contactDataFormGroup = new FormGroup({
            firstNameFormControl: new FormControl('', Validators.required),
            lastNameFormControl: new FormControl('', Validators.required),
            emailFormControl: new FormControl('', [Validators.required, Validators.email]),
            phoneNumberHomeFormControl: new FormControl('', [Validators.required,
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
                message: 'Are you sure you want to add this contact?',
                header: 'Add'
            },
            width: '350px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                let contact = new Contact();

                // only for mock purposes
                contact.id = this.getNextContactId();

                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.lastName = this.contactDataFormGroup.get('lastNameFormControl').value;
                contact.email = this.contactDataFormGroup.get('emailFormControl').value;
                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.phoneNumberHome = this.contactDataFormGroup.get('phoneNumberHomeFormControl').value;
                contact.phoneNumberCell = this.contactDataFormGroup.get('phoneNumberCellFormControl').value;
                contact.phoneNumberWork = this.contactDataFormGroup.get('phoneNumberWorkFormControl').value;
                contact.phoneNumberHusband = this.contactDataFormGroup.get('phoneNumberHusbandFormControl').value;
                contact.isFavorite = false;
                contact.profilePhoto = '';

                this.contactService.addNewContact(contact);

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

    getNextContactId(): number {
        this.contactList.sort((a, b) => (a.id > b.id) ? 1 : -1);
        const contact = this.contactList[this.contactList.length - 1];
        const maxId = contact.id;
        return maxId + 1;
    }

    navigateBack() {
        this._location.back();
    }

}
