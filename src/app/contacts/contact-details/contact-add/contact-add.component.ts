import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { AbstractContactDetails } from '../shared/abstract-contact-details.class';

@Component({
    selector: 'app-contact-add',
    templateUrl: './contact-add.component.html',
    styleUrls: ['./contact-add.component.css', '../../../shared/styles/contact-data.component.css',
        '../../../shared/styles/edit-add.component.css', '../../../shared/styles/util.component.css'],
    animations: [
        Animations.enterLeaveTriggerFavoriteContacts,
        Animations.dropErrMsg
    ]
})

export class ContactAddComponent extends AbstractContactDetails implements OnInit {

    contactList = new Array<Contact>();
    // this will be used for loader
    isLoaded = true;

    constructor(protected contactService: ContactService, protected _location: Location, protected dialog: MatDialog,
        protected formBuilder: FormBuilder) {
            super(formBuilder, dialog, contactService, _location);
         }

    ngOnInit() {
        this.createContactDataFormGroup();
    }

    addPhoto() {

    }

}
