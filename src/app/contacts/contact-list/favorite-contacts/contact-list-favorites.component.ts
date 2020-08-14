import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';
import { Animations } from 'src/app/shared/animations/animations';
import { SharedDataService } from '../../services/shared-data.service';
import { AbstractContactList } from '../shared/abstract-contact-list.component';
import { ContactService } from '../../services/contact.service';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-contact-list-favorites',
    templateUrl: './contact-list-favorites.component.html',
    styleUrls: ['./contact-list-favorites.component.css', '../../../shared/styles/contact-list.component.css'],
    animations: [
        Animations.enterLeaveTriggerFilter
    ]
})

export class ContactListFavoritesComponent extends AbstractContactList implements OnInit, AfterViewInit {

    favoriteContacts = new Array<Contact>();

    constructor(protected router: Router, protected dialog: MatDialog, protected contactService: ContactService,
         protected sharedDataService: SharedDataService) {
        super(dialog, contactService, sharedDataService, router);
    }

    ngOnInit() {
        this.sharedDataService.getCurrentContactList().subscribe((allContactsResponse: Array<Contact>) => {
            this.favoriteContacts = allContactsResponse.filter(a => a.isFavorite);
        });
    }

    ngAfterViewInit() {
        this.sharedDataService.filteringList.subscribe((allContactsResponse: Array<Contact>) => {
            this.favoriteContacts = allContactsResponse.filter(a => a.isFavorite);
        });
    }

}
