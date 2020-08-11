import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Animations } from 'src/app/shared/animations/animations';
import { FormControl } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { map, startWith } from 'rxjs/operators';
import { SharedDataService } from '../services/shared-data.service';
import { ContactService } from '../services/contact.service';

@Component({
    selector: 'app-contact-list-main',
    templateUrl: './contact-list-main.component.html',
    styleUrls: ['./contact-list-main.component.css'],
    animations: [
        Animations.enterLeaveTriggerAllContacts,
        Animations.enterLeaveTriggerFavoriteContacts
    ]
})

export class ContactListMainComponent implements OnInit, AfterViewInit {

    isAllContacts = true;
    isFavorites = false;
    searchFormControl = new FormControl();
    allContactsList = new Array<Contact>();
    isLoaded = false;

    constructor(private sharedDataService: SharedDataService, private contactService: ContactService) { }

    ngOnInit() {
        this.sharedDataService.filteringList = this.searchFormControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value)));
    }

    ngAfterViewInit() {
        this.sharedDataService.getCurrentContactList().subscribe(response => {
            this.allContactsList = response;
        });
    }

    private _filter(value: any): any[] {
        const filterValue = value;
        return this.allContactsList.filter(option =>
            (option.firstName.toLowerCase().includes(filterValue.toLowerCase())
                || option.lastName.toLowerCase().includes(filterValue.toLowerCase()))
        );
    }

    get updatedList(): Array<Contact> {
        this.sharedDataService.getCurrentContactList().subscribe(response => {
            return response;
        });
        return [];
    }

    navigateToContacts(page: string) {
        if (page === 'all') {
            this.isFavorites = false;

            setTimeout(() => {
                this.isAllContacts = true;
            }, 200);
        } else {
            this.isAllContacts = false;

            setTimeout(() => {
                this.isFavorites = true;
            }, 200);

        }
    }

}
