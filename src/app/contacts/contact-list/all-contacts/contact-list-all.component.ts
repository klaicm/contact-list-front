import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { Animations } from 'src/app/shared/animations/animations';

@Component({
    selector: 'app-contact-list-all',
    templateUrl: './contact-list-all.component.html',
    styleUrls: ['./contact-list-all.component.css', '../../../shared/styles/contact-list.component.css'],
    animations: [
        Animations.enterLeaveTriggerFilter
    ]
})

export class ContactListAllComponent implements OnInit {

    Oscar = '../../assets/images/oscar_arnold.png';
    agnes = '../../assets/images/agnes_terry.jpg';
    Addie = '../../assets/images/addie_hernandez.jpg';
    ann = '../../assets/images/ann_schneider.jpg';
    isiah = '../../assets/images/isiah_mcguire.jpg';

    allContacts = new Array<Contact>();
    clickedFavorite = false;

    constructor(private router: Router, public dialog: MatDialog,
        private contactService: ContactService) { }

    ngOnInit() {
        this.contactService.tempList.subscribe(response => {
            this.allContacts = response;
        });

        // here goes subscribe to getAllContacts method (when returns observable)
        // this.allContacts = this.contactService.getAllContacts();
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
                const contact = this.contactService.getContactById(contactId);

                if (contact) {
                    this.contactService.removeContact(contact);

                    this.contactService.tempList.subscribe(contactsAfterDelete => {
                        this.allContacts = contactsAfterDelete;
                    });
                }
            }
        });
    }

    editFavorites(contactId: number) {
        this.clickedFavorite = true;
        const contact = this.contactService.getContactById(contactId);

        if (contact) {

            contact.isFavorite = !contact.isFavorite;
            this.contactService.editContact(contact);

            this.contactService.tempList.subscribe(contactsAfterEdit => {
                this.allContacts = contactsAfterEdit;
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
