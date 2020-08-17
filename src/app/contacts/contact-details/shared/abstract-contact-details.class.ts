import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { ContactService } from '../../services/contact.service';
import { Location } from '@angular/common';

export abstract class AbstractContactDetails {

    contactDataFormGroup: FormGroup;
    phoneNumbers: FormArray;

    constructor(protected formBuilder: FormBuilder, protected dialog: MatDialog, protected contactService: ContactService,
        protected _location: Location) { }


    createContactDataFormGroup() {
        this.contactDataFormGroup = this.formBuilder.group({
            firstNameFormControl: new FormControl('', [
                Validators.required,
                Validators.maxLength(15)]),
            lastNameFormControl: new FormControl('', [
                Validators.required,
                Validators.maxLength(15)]),
            emailFormControl: new FormControl('', [Validators.required, Validators.email,
            Validators.maxLength(50)]),
            phoneNumbers: this.formBuilder.array([])
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
        if (i) {
            this.phoneNumbers.removeAt(i);
        }
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

    saveContact(isNewContact: boolean, editingContact?: Contact) {
        let message: string;
        let header: string;

        if (isNewContact) {
            message = 'Are you sure you want to add this contact?';
            header = 'Add';
        } else {
            message = 'Are you sure you want to edit this contact?';
            header = 'Edit';
        }

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: message,
                header: header
            },
            width: '350px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                let contact = new Contact();

                if (isNewContact) {
                    contact.isFavorite = false;
                    contact.profilePhoto = '../../assets/images/forrest_gump.jpg';
                    this.phoneNumbers = this.contactDataFormGroup.get('phoneNumbers') as FormArray;
                } else {
                    contact = editingContact;
                }

                contact.firstName = this.contactDataFormGroup.get('firstNameFormControl').value;
                contact.lastName = this.contactDataFormGroup.get('lastNameFormControl').value;
                contact.email = this.contactDataFormGroup.get('emailFormControl').value;

                contact.phoneNumbers = this.contactDataFormGroup.get('phoneNumbers').value;

                this.contactService.saveContact(contact).subscribe(response => {
                    if (response) {

                        setTimeout(() => {
                            this._location.back();
                        }, 100);
                    }
                }, err => {

                });

            }
        });
    }

    addPhoto() {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Not supported at this time :(',
                header: 'Upload picture'
            },
            width: '350px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {});

    }

    navigateBack() {
        this._location.back();
    }

}
