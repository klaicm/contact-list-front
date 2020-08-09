import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { Animations } from 'src/app/shared/animations/animations';

@Component({
    selector: 'app-contact-list-favorites',
    templateUrl: './contact-list-favorites.component.html',
    styleUrls: ['./contact-list-favorites.component.css', '../../../shared/styles/contact-list.component.css'],
    animations: [
        Animations.enterLeaveTriggerFilter
    ]
})

export class ContactListFavoritesComponent implements OnInit {

    @Input() allContacts: Array<Contact>;
    oscar = '../../assets/images/oscar_arnold.png';
    agnes = '../../assets/images/agnes_terry.jpg';
    addie = '../../assets/images/addie_hernandez.jpg';

    favoriteContacts = new Array<Contact>();

    constructor(private contactServce: ContactService, private router: Router, public dialog: MatDialog,
        private contactService: ContactService) { }

    ngOnInit() {
        this.contactServce.tempList.subscribe(response => {
            const allContacts = response;
            this.favoriteContacts = allContacts.filter(a => a.isFavorite);
            console.log(this.favoriteContacts);
        });
    }

    navigateToContactDetails(contactId: number) {
        this.router.navigate(['/contact-details', contactId]);
    }

    navigateToContactEdit(contactId: number) {
        this.router.navigate(['/contact-edit', contactId]);
    }

    deleteContact(contactId: number) {
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
                let contact = new Contact();
                this.contactService.tempList.subscribe(response => {
                    const contactList: Array<Contact> = response;
                    contact = contactList[contactList.findIndex((a: Contact) => a.id === contactId)];

                    if (contact) {
                        this.contactService.removeContact(contact);

                        this.contactService.tempList.subscribe(contactsAfterDelete => {
                            this.favoriteContacts = contactsAfterDelete;
                        });
                    }
                });
            } else {
                console.log('Canceled');
            }
        });
    }

    editFavorites(contactId: number) {
        const contact = this.contactService.getContactById(contactId);

        if (contact) {

            contact.isFavorite = !contact.isFavorite;
            this.contactService.editContact(contact);

            this.contactService.tempList.subscribe(contactsAfterDelete => {
                this.favoriteContacts = contactsAfterDelete.filter(a => a.isFavorite);
            });
        }
    }

    setHeartIconClass(isFavorite: boolean) {
        if (isFavorite) {
            return { 'fa': true, 'fa-heart': true, 'heart-icon': true, 'icon-interactive': true };
        } else {
            return { 'fa': true, 'fa-heart-o': true, 'heart-icon': true, 'icon-interactive': true };
        }
    }

}
