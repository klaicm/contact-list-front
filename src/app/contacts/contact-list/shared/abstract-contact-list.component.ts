import { Contact } from '../../models/contact.model';
import { ConfirmationDialogComponent } from 'src/app/shared/dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { ContactService } from '../../services/contact.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Router } from '@angular/router';

export abstract class AbstractContactList {

    clickedFavorite = false;

    constructor(protected dialog: MatDialog, protected contactService: ContactService, protected sharedDataService: SharedDataService,
        protected router: Router) { }

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

    navigateToContactDetails(contactId: number) {
        this.router.navigate(['/contact-details', contactId]);
    }

    navigateToContactEdit(contactId: number) {
        this.router.navigate(['/contact-edit', contactId]);
    }

    navigateToContactAdd() {
        this.router.navigate(['/contact-add']);
    }
}
