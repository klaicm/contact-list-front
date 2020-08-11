import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { Animations } from 'src/app/shared/animations/animations';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-contact-list-all',
    templateUrl: './contact-list-all.component.html',
    styleUrls: ['./contact-list-all.component.css', '../../../shared/styles/contact-list.component.css'],
    animations: [
        Animations.enterLeaveTriggerFilter
    ]
})

export class ContactListAllComponent implements OnInit, AfterViewInit {

    allContacts = new Array<Contact>();
    clickedFavorite = false;

    constructor(private router: Router, public dialog: MatDialog,
        private contactService: ContactService, private sharedDataService: SharedDataService, private cdf: ChangeDetectorRef) { }

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

        this.cdf.detectChanges();
    }

    navigateToContactDetails(contactId: number) {
        this.router.navigate(['/contact-details', contactId]);
    }

    navigateToContactEdit(contactId: number) {
        this.router.navigate(['/contact-edit', contactId]);
    }

    navigateToContactAdd() {
        this.router.navigate(['/contact-add']);
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
                        this.contactService.getAllContacts().subscribe((allContactsResponse: Array<Contact>) => {
                            this.sharedDataService.updateContactList(allContactsResponse);
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
