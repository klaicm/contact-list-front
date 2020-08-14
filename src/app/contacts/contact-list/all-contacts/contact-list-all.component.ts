import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { Animations } from 'src/app/shared/animations/animations';
import { SharedDataService } from '../../services/shared-data.service';
import { AbstractContactList } from '../shared/abstract-contact-list.component';

@Component({
    selector: 'app-contact-list-all',
    templateUrl: './contact-list-all.component.html',
    styleUrls: ['./contact-list-all.component.css', '../../../shared/styles/contact-list.component.css'],
    animations: [
        Animations.enterLeaveTriggerFilter
    ]
})

export class ContactListAllComponent extends AbstractContactList implements OnInit, AfterViewInit {

    allContacts = new Array<Contact>();

    constructor(protected router: Router, protected dialog: MatDialog, protected contactService: ContactService,
        protected sharedDataService: SharedDataService, private cdf: ChangeDetectorRef) {
        super(dialog, contactService, sharedDataService, router);
    }

    ngOnInit() {
        this.contactService.getAllContacts().subscribe((response: Array<Contact>) => {
            if (response) {
                this.sharedDataService.updateContactList(response);
                this.sharedDataService.getCurrentContactList().subscribe(allContactsResponse => {
                    this.allContacts = allContactsResponse;
                });
            }
        });
    }

    ngAfterViewInit() {

        this.sharedDataService.filteringList.subscribe(response => {
            this.allContacts = response;
        });
        this.clickedFavorite = false;

        this.cdf.detectChanges();
    }

}
