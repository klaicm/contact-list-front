import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animations } from 'src/app/shared/animations/animations';
import { FormControl } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-contact-list-main',
    templateUrl: './contact-list-main.component.html',
    styleUrls: ['./contact-list-main.component.css'],
    animations: [
        Animations.enterLeaveTriggerAllContacts,
        Animations.enterLeaveTriggerFavoriteContacts
    ]
})

export class ContactListMainComponent implements OnInit {

    isAllContacts = true;
    isFavorites = false;
    searchFormControl = new FormControl();
    filteredOptionsList: Observable<string[]>;
    allContactsList = new Array<Contact>();

    constructor(private router: Router, private contactService: ContactService) { }

    ngOnInit() {
        this.contactService.tempList.subscribe(response => {
            const contactList = response;
            this.allContactsList = contactList;
        });

        this.contactService.tempList = this.searchFormControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value)));
    }

    private _filter(value: any): any[] {
        const filterValue = value;
        return this.allContactsList.filter(option =>
            (option.firstName.toLowerCase().includes(filterValue.toLowerCase())
            || option.lastName.toLowerCase().includes(filterValue.toLowerCase()))
        );
    }

    navigateToContacts(page: string) {
        if (page === 'all') {
            // this.router.navigate(['/contact-list-all']);
            this.isFavorites = false;

            setTimeout(() => {
                this.isAllContacts = true;
            }, 200);
        } else {
            // this.router.navigate(['/contact-list-favorites']);
            this.isAllContacts = false;

            setTimeout(() => {
                this.isFavorites = true;
            }, 200);

        }
    }

}
