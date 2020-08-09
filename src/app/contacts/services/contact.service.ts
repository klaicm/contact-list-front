import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { contacts } from '../../shared/mock/contacts';

@Injectable()
export class ContactService {

    // private serviceContactList = new Array<Contact>();
    // private contactList = new BehaviorSubject<Array<Contact>>(contacts.sort((a, b) => a.firstName.localeCompare(b.firstName)));

    localStorageContacts: Array<Contact> = JSON.parse(localStorage.getItem('contacts'));
    // clientListSorted = this.localStorageContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    private contactList = new BehaviorSubject<Array<Contact>>(this.localStorageContacts.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)));

    tempList = this.contactList.asObservable();

    /**
     * Only for mock purposes (localStorage response). here will be implemented http request get method which returns Observable
     * @param contactId number
     */
    getAllContacts(): Array<Contact> {
        const contactList: Array<Contact> = JSON.parse(localStorage.getItem('contacts'));
        return contactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }

    /**
     * Only for mock purposes (localStorage response). here will be implemented http request get method which returns Observable
     * @param contactId number
     */
    getContactById(contactId: number): Contact {
        const contactList: Array<Contact> = JSON.parse(localStorage.getItem('contacts'));
        const contact = contactList[contactList.findIndex((a: Contact) => a.id === contactId)];

        if (contact) {
            return contact;
        }

        return null;
    }

    addNewContact(contact: Contact) {
        let newServiceContactList = new Array<Contact>();
        // this.tempList.subscribe((response: Array<Contact>) => {
        //     newServiceContactList = response;
        //     newServiceContactList.push(contact);
        //     newServiceContactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        //     this.contactList.next(newServiceContactList);
        // });

        newServiceContactList = newServiceContactList = JSON.parse(localStorage.getItem('contacts'));
        newServiceContactList.push(contact);
        newServiceContactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        localStorage.setItem('contacts', JSON.stringify(newServiceContactList));
        this.contactList.next(newServiceContactList);
    }

    removeContact(contact: Contact) {
        let newServiceContactList = new Array<Contact>();
        // this.tempList.subscribe((response: Array<Contact>) => {
        //     newServiceContactList = response;
        //     newServiceContactList.splice(newServiceContactList.findIndex((a: Contact) => a.id === contact.id), 1);
        //     newServiceContactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        //     this.contactList.next(newServiceContactList);
        // });

        newServiceContactList = JSON.parse(localStorage.getItem('contacts'));
        newServiceContactList.splice(newServiceContactList.findIndex((a: Contact) => a.id === contact.id), 1);
        newServiceContactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        localStorage.setItem('contacts', JSON.stringify(newServiceContactList));
        this.contactList.next(newServiceContactList);
    }

    editContact(contact: Contact) {
        let newServiceContactList = new Array<Contact>();
        // this.tempList.subscribe((response: Array<Contact>) => {
        //     newServiceContactList = response;
        //     newServiceContactList.splice(newServiceContactList.findIndex((a: Contact) => a.id === contact.id), 1);
        //     // here add again in list contact (first erased data, and than add new (imitates update))
        //     newServiceContactList.push(contact);
        //     newServiceContactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        //     this.contactList.next(newServiceContactList);
        // });

        newServiceContactList = newServiceContactList = JSON.parse(localStorage.getItem('contacts'));
        newServiceContactList.splice(newServiceContactList.findIndex((a: Contact) => a.id === contact.id), 1);
        // here add again in list contact (first erased data, and than add new (imitates update))
        newServiceContactList.push(contact);
        newServiceContactList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        localStorage.setItem('contacts', JSON.stringify(newServiceContactList));
        this.contactList.next(newServiceContactList);
    }
}
