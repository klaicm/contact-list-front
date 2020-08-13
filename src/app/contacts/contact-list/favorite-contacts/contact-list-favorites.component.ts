import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { Animations } from 'src/app/shared/animations/animations';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-contact-list-favorites',
    templateUrl: './contact-list-favorites.component.html',
    styleUrls: ['./contact-list-favorites.component.css', '../../../shared/styles/contact-list.component.css'],
    animations: [
        Animations.enterLeaveTriggerFilter
    ]
})

export class ContactListFavoritesComponent implements OnInit, AfterViewInit {

    favoriteContacts = new Array<Contact>();
    clickedFavorite = false;

    constructor(private sharedDataService: SharedDataService, private router: Router, public dialog: MatDialog,
        private contactService: ContactService, private cdRef: ChangeDetectorRef) { }

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

    navigateToContactDetails(contactId: number) {
        this.router.navigate(['/contact-details', contactId]);
    }

    navigateToContactEdit(contactId: number) {
        this.router.navigate(['/contact-edit', contactId]);
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
                this.contactService.deleteContact(contact).subscribe(() => {
                    this.contactService.getAllContacts().subscribe(allContactsResponse => {
                        this.sharedDataService.updateContactList(allContactsResponse);
                    });
                });
            }
        });
    }

    editFavorites(contactId: number) {
        this.clickedFavorite = true;
        this.contactService.getContactById(contactId).subscribe((response: Contact) => {
            const contact = response;
            if (contact) {
                contact.isFavorite = !contact.isFavorite;
                this.contactService.saveContact(contact).subscribe(responseSave => {
                    if (responseSave) {
                        this.contactService.getAllContacts().subscribe(allContactsResponse => {
                            this.sharedDataService.updateContactList(allContactsResponse);
                            this.clickedFavorite = false;
                        });
                    }
                });
            }
        });
    }

    setHeartIconClass(isFavorite: boolean) {
        if (isFavorite) {
            return { 'fa': true, 'fa-heart': true, 'heart-icon': true, 'icon-interactive': true };
        } else {
            return { 'fa': true, 'fa-heart-o': true, 'heart-icon': true, 'icon-interactive': true };
        }
    }

}
