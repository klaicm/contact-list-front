import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable()
export class SharedDataService {

    private contactList = new BehaviorSubject<Array<Contact>>([]);

    tempList = this.contactList.asObservable();

    filteringList: Observable<any>;

    getCurrentContactList(): Observable<any> {
        return this.contactList.asObservable();
    }

    updateContactList(contactList: Array<Contact>) {
        contactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        this.contactList.next(contactList);
    }
}
