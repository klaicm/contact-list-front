import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
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
    phoneNumbers: FormArray;

    constructor(private contactService: ContactService, private _location: Location, public dialog: MatDialog,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.contactDataFormGroup = this.formBuilder.group({
            firstNameFormControl: new FormControl('', Validators.required),
            lastNameFormControl: new FormControl('', Validators.required),
            emailFormControl: new FormControl('', [Validators.required, Validators.email]),
            phoneNumbers: this.formBuilder.array([this.createPhoneNumber()])
        });
    }

    createPhoneNumber(): FormGroup {
        return this.formBuilder.group({
            phoneNumber: new FormControl('', [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(10)]),
            phoneDescription: new FormControl('', [
                Validators.required,
                Validators.maxLength(10)])
        });
    }

    addPhoneNumber() {
        this.phoneNumbers = this.contactDataFormGroup.get('phoneNumbers') as FormArray;
        this.phoneNumbers.push(this.createPhoneNumber());
    }

    removeNumber(i: number) {
        this.phoneNumbers.removeAt(i);
    }

    addPhoto() {

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
                const contact = new Contact();

                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.lastName = this.contactDataFormGroup.get('lastNameFormControl').value;
                contact.email = this.contactDataFormGroup.get('emailFormControl').value;
                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.isFavorite = false;
                contact.profilePhoto = '../../assets/images/forrest_gump.jpg';

                contact.phoneNumbers = '';
                this.phoneNumbers.controls.forEach((a) => {
                    if (a.get('phoneNumber').value) {
                        contact.phoneNumbers = contact.phoneNumbers + '#' + a.get('phoneNumber').value + '$'
                            + a.get('phoneDescription').value;
                    }
                });
                if (contact.phoneNumbers !== '') {
                    contact.phoneNumbers = contact.phoneNumbers + '#';
                }

                this.contactService.saveContact(contact).subscribe(response => {
                    if (response) {
                        // notification bar or success snackbar
                    }
                });

                setTimeout(() => {
                    this._location.back();
                }, 100);

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
