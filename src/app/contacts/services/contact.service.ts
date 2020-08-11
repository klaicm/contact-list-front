import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactService {

    private static GET_ALL_CONTACTS_URL = environment.url + '/allContacts';
    private static GET_CONTACT_URL = environment.url + '/contact';
    private static SAVE_CONTACT = environment.url + '/saveContact';
    private static DELETE_CONTACT = environment.url + '/deleteContact';

    constructor(private http: HttpClient) {}

    getAllContacts(): Observable<any> {
        return this.http.get(ContactService.GET_ALL_CONTACTS_URL);
    }

    getContactById(contactId: number): Observable<any> {
        return this.http.get(`${ContactService.GET_CONTACT_URL}/${contactId}`);
    }

    saveContact(contact: Contact): Observable<any> {
        return this.http.post(ContactService.SAVE_CONTACT, contact);
    }

    deleteContact(contact: Contact): Observable<any> {
        return this.http.post(ContactService.DELETE_CONTACT, contact);
    }
}
