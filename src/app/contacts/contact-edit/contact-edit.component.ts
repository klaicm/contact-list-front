import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
    isLoaded = false;

    contactDataFormGroup: FormGroup;

    constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService, private _location: Location,
        public dialog: MatDialog, private router: Router) {

        this.contactDataFormGroup = new FormGroup({
            firstNameFormControl: new FormControl('', Validators.required),
            lastNameFormControl: new FormControl('', Validators.required),
            emailFormControl: new FormControl('', [Validators.required, Validators.email]),
            phoneNumberHomeFormControl: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'),
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
        this.contactDataFormGroup.get('phoneNumberHomeFormControl').setValue(contact.phoneNumberHome);
        this.contactDataFormGroup.get('phoneNumberWorkFormControl').setValue(contact.phoneNumberHome);
        this.contactDataFormGroup.get('phoneNumberCellFormControl').setValue(contact.phoneNumberHome);
        this.contactDataFormGroup.get('phoneNumberHusbandFormControl').setValue(contact.phoneNumberHome);
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
                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.phoneNumberHome = this.contactDataFormGroup.get('phoneNumberHomeFormControl').value;
                contact.phoneNumberCell = this.contactDataFormGroup.get('phoneNumberCellFormControl').value;
                contact.phoneNumberWork = this.contactDataFormGroup.get('phoneNumberWorkFormControl').value;
                contact.phoneNumberHusband = this.contactDataFormGroup.get('phoneNumberHusbandFormControl').value;

                this.contactService.saveContact(contact).subscribe(response => {
                    if (response) {
                        this._location.back();
                    }
                });
            } else {
                console.log('Canceled');
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
