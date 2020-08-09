import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListAllComponent } from './contacts/contact-list/all-contacts/contact-list-all.component';
import { ContactListFavoritesComponent } from './contacts/contact-list/favorite-contacts/contact-list-favorites.component';
import { Routes } from '@angular/router';
import { ContactListMainComponent } from './contacts/contact-list/contact-list-main.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';

/**
 * Main app router and routes
 * @type {Routes}
 */
export const routing: Routes = [
    { path: '', component: ContactListMainComponent },
    { path: 'contact-details/:id', component: ContactDetailsComponent },
    { path: 'contact-list-all', component: ContactListAllComponent },
    { path: 'contact-list-favorites', component: ContactListFavoritesComponent },
    { path: 'contact-edit/:id', component: ContactEditComponent },
    { path: 'contact-add', component: ContactAddComponent }
];
