import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css', '../../shared/styles/contact-data.component.css',
        '../../shared/styles/edit-add.component.css', '../../shared/styles/contact-mobile.component.css'],
    animations: [
        Animations.enterLeaveTriggerFavoriteContacts,
        Animations.dropErrMsg
    ]
})

export class ContactEditComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    contact: Contact;
    // this will be used for loader
    isLoaded = false;

    contactDataFormGroup: FormGroup;
    phoneNumbers: FormArray;

    constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService, private _location: Location,
        public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) {

        this.contactDataFormGroup = this.formBuilder.group({
            firstNameFormControl: new FormControl('', Validators.required),
            lastNameFormControl: new FormControl('', Validators.required),
            emailFormControl: new FormControl('', [Validators.required, Validators.email]),
            phoneNumbers: this.formBuilder.array([])
        });

    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.getContactDetails(+params['id']);
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

    setExistingPhoneNumber(phoneNumber: String, phoneDescription: String) {
        return this.formBuilder.group({
            phoneNumber: new FormControl(phoneNumber, [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(10)
            ]),
            phoneDescription: new FormControl(phoneDescription, [
                Validators.required,
                Validators.maxLength(10)
            ])
        });
    }

    addPhoto() {

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

        let allPhoneNumbers = contact.phoneNumbers;

        while (allPhoneNumbers.length > 1) {
            const phoneNumber = allPhoneNumbers.substring(allPhoneNumbers.indexOf('#') + 1,
                allPhoneNumbers.indexOf('$'));
            allPhoneNumbers = allPhoneNumbers.substring(allPhoneNumbers.indexOf('$'));
            const phoneDescription = allPhoneNumbers.substring(allPhoneNumbers.indexOf('$') + 1,
                allPhoneNumbers.indexOf('#'));

            this.phoneNumbers.push(this.setExistingPhoneNumber(phoneNumber, phoneDescription));

            allPhoneNumbers = allPhoneNumbers.substring(allPhoneNumbers.indexOf('#'));

        }
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
                const contact = this.contact;

                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.lastName = this.contactDataFormGroup.get('lastNameFormControl').value;
                contact.email = this.contactDataFormGroup.get('emailFormControl').value;

                contact.phoneNumbers = '';
                this.phoneNumbers.controls.forEach((a) => {
                    if (a.get('phoneNumber').value) {
                        contact.phoneNumbers = contact.phoneNumbers + '#' + a.get('phoneNumber').value + '$'
                            + a.get('phoneDescription').value;
                    }
                });
                contact.phoneNumbers = contact.phoneNumbers + '#';

                this.contactService.saveContact(contact).subscribe(response => {
                    if (response) {
                        this._location.back();
                    }
                });
            }
        });
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

    navigateBack() {
        this._location.back();
    }

}
